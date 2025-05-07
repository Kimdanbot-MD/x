// index.js
import { fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import { BaileysConnection } from './Kim/core/BaileysConnection.js';
import { EventHandler } from './Kim/core/EventHandler.js';
import { ConnectionHandler } from './Kim/core/ConnectionHandler.js';
import { AuthHandler } from './Kim/core/AuthHandler.js';
import readline from "readline";
import pino from 'pino';
import fs from 'fs';
import chalk from 'chalk';
import util from 'util';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const logger = pino({ level: 'info' });

// Manejador global para excepciones no capturadas en el proceso.
process.on('uncaughtException', (err) => {
    console.error(chalk.redBright('[INDEX] FATAL: Excepción no capturada:'), err);
    const ownerJidForUncaught = global.owner && global.owner.length > 0 && global.owner[0].length > 0
        ? global.owner[0][0] + '@s.whatsapp.net'
        : null;
    if (global.kim) { // Intenta notificar al owner si 'kim' (socket) está disponible globalmente.
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
    process.exit(1); // Termina el proceso para evitar un estado inconsistente.
});

// Manejador global para promesas rechazadas no manejadas.
process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.redBright('[INDEX] FATAL: Promesa rechazada no manejada:'), reason);
  process.exit(1);
});

// Función principal asíncrona que orquesta el inicio y la lógica del bot.
const start = async () => {
    try {
        const authHandler = new AuthHandler(rl); // Manejador para obtener la opción de autenticación.
        const opcion = await authHandler.obtenerOpcionConexion(); // '1' para QR, '2' para código.

        let phoneNumberForPairing = null;
        const useQR = opcion === '1' || process.argv.includes("qr"); // Determina si se usará QR.

        if (!useQR) { // Si no es QR, se necesita número para código de pareo.
            const authFileExists = fs.existsSync('./auth/creds.json');
            phoneNumberForPairing = await authHandler.obtenerNumeroTelefonoParaCodigo(authFileExists);
        }

        const { version } = await fetchLatestBaileysVersion();

        global.kim = null; // Inicializa global.kim para posible notificación en uncaughtException.

        // Configura e instancia el manejador principal de la conexión con Baileys.
        const baileysConnection = new BaileysConnection({
            authPath: 'auth', // Ruta para guardar/cargar la sesión.
            printQRInTerminal: useQR,
            browser: useQR ? ['KimdanBot-MD', 'Safari', '1.0.0'] : ["Ubuntu", "Edge", "20.0.04"],
            version: version,
            logger: logger,
            rl: rl, // Interfaz readline, por si BaileysConnection necesita interactuar.
            phoneNumber: phoneNumberForPairing // Número para el código de pareo.
        });

        const { kim: connectedKim, store } = await baileysConnection.connect();
        
        if (!connectedKim) {
            console.log(chalk.red("No se pudo establecer la conexión con WhatsApp. Terminando."));
            if (!rl.closed) rl.close();
            return;
        }
        global.kim = connectedKim; // Asigna la instancia de socket conectada a global.kim.

        // Instancia los manejadores de eventos y conexión.
        // Se pasa 'start' para permitir que los manejadores reinicien el bot si es necesario.
        const eventHandler = new EventHandler(global.kim, store, start);
        const connectionHandler = new ConnectionHandler(global.kim, store, start);

        // Vincula los eventos de Baileys a los métodos de los manejadores correspondientes.
        global.kim.ev.on('connection.update', connectionHandler.onConnectionUpdate);
        global.kim.ev.on('messages.upsert', eventHandler.onMessageUpsert);
        global.kim.ev.on('messages.update', eventHandler.onMessagesUpdate);
        global.kim.ev.on('group-participants.update', eventHandler.onGroupParticipantsUpdate);

        console.log(chalk.green("Bot iniciado y escuchando eventos..."));

    } catch (error) { // Captura errores críticos durante la función 'start'.
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

// Maneja la señal de interrupción (Ctrl+C) para un cierre más limpio.
process.on('SIGINT', () => {
    console.log(chalk.yellow("\nCerrando bot..."));
    if (global.kim && global.kim.ws && !global.kim.ws.isClosed) {
        console.log("Cerrando conexión de WhatsApp...");
        // global.kim.end(new Error('Cierre por SIGINT')); // Podrías cerrar la conexión explícitamente.
    }
    if (!rl.closed) {
        rl.close();
    }
    process.exit(0);
});

start();
