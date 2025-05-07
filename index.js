import { fetchLatestBaileysVersion, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { BaileysConnection } from './Kim/core/BaileysConnection.js';
import { EventHandler } from './Kim/core/EventHandler.js';
import { ConnectionHandler } from './Kim/core/ConnectionHandler.js';
import { AuthHandler } from './Kim/core/AuthHandler.js';
import readline from "readline";

// Permite forzar la conexión mediante código QR si se pasa el argumento "qr" al script.
const methodCodeQR = process.argv.includes("qr");

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

// Función principal asíncrona que configura e inicia el bot.
const start = async () => {
    try {
        const authHandler = new AuthHandler(rl);
        // 'opcion' determina el método de conexión elegido por el usuario (ej: QR o código de pareo).
        const opcion = await authHandler.obtenerOpcionConexion();

        // Carga o inicializa la sesión de autenticación desde la carpeta 'auth'.
        // 'state' contiene los datos de la sesión y 'saveCreds' es la función para persistir cambios.
        const { state, saveCreds } = await useMultiFileAuthState('auth');

        // 'useQR' será verdadero si la opción es para QR o si se forzó mediante argumento de línea de comandos.
        const useQR = opcion == '1' || methodCodeQR;

        const { version } = await fetchLatestBaileysVersion();

        // Configura y crea la instancia principal para la conexión con Baileys.
        const baileysConnection = new BaileysConnection({
            authState: state, // Proporciona el estado de autenticación para reanudar o iniciar sesión.
            printQRInTerminal: useQR,
            // Define la identidad del navegador simulado, diferente si es QR o código de pareo.
            browser: useQR ? ['KimdanBot-MD', 'Safari', '1.0.0'] : ["Ubuntu", "Edge", "20.0.04"],
            version: version,
            opcion: opcion, // Se pasa la opción para que BaileysConnection maneje lógicas específicas (ej. pedir número para código).
        });

        // Inicia la conexión. Se pasa 'rl' por si se necesita interacción para el código de pareo.
        const { kim, store } = await baileysConnection.connect(rl);

        // Inicializa los manejadores de eventos, pasando la función 'start' para permitir reinicios programáticos.
        const eventHandler = new EventHandler(kim, store, start);
        const connectionHandler = new ConnectionHandler(kim, store, start);

        kim.ev.on('connection.update', connectionHandler.onConnectionUpdate);
        kim.ev.on('messages.upsert', eventHandler.onMessageUpsert);
        kim.ev.on('messages.update', eventHandler.onMessagesUpdate);
        kim.ev.on('group-participants.update', eventHandler.onGroupParticipantsUpdate);

        store?.bind(kim.ev);

        // Asegura que cualquier cambio en las credenciales de la sesión se guarde en disco.
        kim.ev.on('creds.update', saveCreds);

        console.log("Bot iniciado y escuchando eventos...");

    } catch (error) {
        console.error('Error al iniciar el bot:', error);
    }
};

start();
