import { fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import { BaileysConnection } from './Kim/core/BaileysConnection.js';
import { EventHandler } from './Kim/core/EventHandler.js';
import { ConnectionHandler } from './Kim/core/ConnectionHandler.js';
import { AuthHandler } from './Kim/core/AuthHandler.js';
import { serializeKim } from './Kim/utils/functions.js'; // <--- AÑADIDO: Importa serializeKim
import readline from "readline";
import pino from 'pino';
import fs from 'fs';
import chalk from 'chalk';
import util from 'util';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const logger = pino({ level: 'info' });

process.on('uncaughtException', (err) => {
    console.error(chalk.redBright('[INDEX] FATAL: Excepción no capturada:'), err);
    const ownerJidForUncaught = global.owner && global.owner.length > 0 && global.owner[0].length > 0
        ? global.owner[0][0] + '@s.whatsapp.net'
        : null;
    if (global.kim) {
        if (ownerJidForUncaught) {
            try {
                global.kim.sendMessage(ownerJidForUncaught, {
                    text: `🔥 EXCEPCIÓN NO CAPTURADA EN EL BOT 🔥:\n\n${util.format(err)}`
                });
                console.log("[INDEX] Intento de notificación de uncaughtException enviado al owner.");
            } catch (notificationError) {
                console.error('[INDEX] Error al intentar notificar al owner sobre uncaughtException:', notificationError);
            }
        }
    }
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.redBright('[INDEX] FATAL: Promesa rechazada no manejada:'), reason);
  process.exit(1);
});

const start = async () => {
    try {
        const authHandler = new AuthHandler(rl);
        const opcion = await authHandler.obtenerOpcionConexion();

        let phoneNumberForPairing = null;
        const useQR = opcion === '1' || process.argv.includes("qr");

        if (!useQR) {
            const authFileExists = fs.existsSync('./auth/creds.json');
            phoneNumberForPairing = await authHandler.obtenerNumeroTelefonoParaCodigo(authFileExists);
        }

        const { version } = await fetchLatestBaileysVersion();

        global.kim = null;

        const baileysConnection = new BaileysConnection({
            authPath: 'auth',
            printQRInTerminal: useQR,
            browser: useQR ? ['KimdanBot-MD', 'Safari', '1.0.0'] : ["Ubuntu", "Edge", "20.0.04"],
            version: version,
            logger: logger,
            rl: rl,
            phoneNumber: phoneNumberForPairing
        });

        // Obtener 'kim' y 'store' de la conexión
        const { kim: connectedKim, store: mainStore } = await baileysConnection.connect();
        
        if (!connectedKim) {
            console.log(chalk.red("No se pudo establecer la conexión con WhatsApp. Terminando."));
            if (!rl.closed) rl.close();
            return;
        }
        global.kim = connectedKim;

        serializeKim(global.kim, mainStore);
        
        const eventHandler = new EventHandler(global.kim, mainStore, start);
        const connectionHandler = new ConnectionHandler(global.kim, mainStore, start);

        global.kim.ev.on('connection.update', connectionHandler.onConnectionUpdate);
        global.kim.ev.on('messages.upsert', eventHandler.onMessageUpsert);
        global.kim.ev.on('messages.update', eventHandler.onMessagesUpdate);
        global.kim.ev.on('group-participants.update', eventHandler.onGroupParticipantsUpdate);

        console.log(chalk.green("Bot iniciado y escuchando eventos..."));

    } catch (error) {
        console.error(chalk.red('Error fatal al iniciar el bot (dentro de start):'), error);
        if (global.kim && global.owner && global.owner.length > 0 && global.owner[0].length > 0) {
             const ownerJid = global.owner[0][0] + '@s.whatsapp.net';
             try {
                await global.kim.sendMessage(ownerJid, { text: `Error fatal iniciando el bot: ${error.message}` });
             } catch (e) { console.error("Error notificando error de inicio", e); }
        }
        if (!rl.closed) {
            rl.close();
        }
        process.exit(1);
    }
};

process.on('SIGINT', () => {
    console.log(chalk.yellow("\nCerrando bot..."));
    if (global.kim && global.kim.ws && !global.kim.ws.isClosed) {
        console.log("Cerrando conexión de WhatsApp...");
    }
    if (!rl.closed) {
        rl.close();
    }
    process.exit(0);
});

start();
