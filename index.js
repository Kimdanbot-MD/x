import { fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import { BaileysConnection } from './Kim/core/BaileysConnection.js';
import { EventHandler } from './Kim/core/EventHandler.js';
import { ConnectionHandler } from './Kim/core/ConnectionHandler.js';
import { AuthHandler } from './Kim/core/AuthHandler.js';
import readline from "readline";
import pino from 'pino';
import fs from 'fs'; // Para verificar la existencia del archivo de sesión.
import chalk from 'chalk';

// Única instancia de readline para interacciones con el usuario en la consola.
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const logger = pino({ level: 'info' }); // Logger para la aplicación.

// Función principal que orquesta el inicio del bot.
const start = async () => {
    try {
        const authHandler = new AuthHandler(rl); // Manejador para obtener las preferencias de autenticación del usuario.
        const opcion = await authHandler.obtenerOpcionConexion(); // '1' para QR, '2' para código.

        let phoneNumberForPairing = null;
        // Determina si se usará QR basado en la opción del usuario o un argumento de línea de comandos.
        const useQR = opcion === '1' || process.argv.includes("qr");

        if (!useQR) {
            const authFileExists = fs.existsSync('./auth/creds.json');
            // Si no se usa QR, se solicita el número de teléfono para el código de pareo.
            phoneNumberForPairing = await authHandler.obtenerNumeroTelefonoParaCodigo(authFileExists);
        }

        const { version } = await fetchLatestBaileysVersion(); // Última versión de Baileys.

        // Configura e instancia el manejador de la conexión Baileys.
        const baileysConnection = new BaileysConnection({
            authPath: 'auth', // Ruta para guardar/cargar la sesión.
            printQRInTerminal: useQR, // Indica a Baileys cómo autenticarse.
            browser: useQR ? ['KimdanBot-MD', 'Safari', '1.0.0'] : ["Ubuntu", "Edge", "20.0.04"],
            version: version,
            logger: logger,
            rl: rl, // Se pasa 'rl' por si BaileysConnection necesitara interacciones futuras (aunque ahora las maneja AuthHandler).
            phoneNumber: phoneNumberForPairing // Número para el código de pareo, si aplica.
        });

        // Establece la conexión y obtiene el socket (kim) y el store.
        const { kim, store } = await baileysConnection.connect();

        if (!kim) { // Falló la conexión crítica.
            console.log(chalk.red("No se pudo establecer la conexión con WhatsApp. Terminando."));
            if (!rl.closed) rl.close();
            return;
        }

        // Instancia los manejadores para eventos de conexión y mensajes.
        // Se pasa 'start' para permitir que los manejadores reinicien el bot si es necesario.
        const eventHandler = new EventHandler(kim, store, start);
        const connectionHandler = new ConnectionHandler(kim, store, start);

        // Delega el manejo de eventos específicos a sus respectivos manejadores.
        kim.ev.on('connection.update', connectionHandler.onConnectionUpdate);
        kim.ev.on('messages.upsert', eventHandler.onMessageUpsert);
        kim.ev.on('messages.update', eventHandler.onMessagesUpdate);
        kim.ev.on('group-participants.update', eventHandler.onGroupParticipantsUpdate);

        console.log(chalk.green("Bot iniciado y escuchando eventos..."));

    } catch (error) {
        console.error(chalk.red('Error fatal al iniciar el bot:'), error);
        if (!rl.closed) {
            rl.close(); // Cierra readline en caso de error fatal.
        }
    }
};

// Maneja la interrupción del proceso (Ctrl+C) para cerrar readline limpiamente.
process.on('SIGINT', () => {
    console.log(chalk.yellow("\nCerrando bot..."));
    if (!rl.closed) {
        rl.close();
    }
    process.exit(0);
});

start();
