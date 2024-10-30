import { fetchLatestBaileysVersion } from "@whiskeysockets/baileys";
import { config } from './src/utils/config.js';
import { BaileysConnection } from './src/core/BaileysConnection.js';
import { EventHandler } from './src/core/EventHandler.js';
import { ConnectionHandler } from './src/handlers/connectionHandler.js'
import { AuthHandler } from './src/handlers/authHandler.js';
import readline from "readline";
import chalk from "chalk";
import fs from "fs";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

const start = async () => {
  try {
    // Obtener la opción de conexión del usuario
    const authHandler = new AuthHandler();
    const opcion = await authHandler.obtenerOpcionConexion();

    // Inicializar la conexión con Baileys
    const baileysConnection = new BaileysConnection({
      authPath: 'auth',
      printQRInTerminal: opcion === '1',
      browser: opcion === '1' ? ['KimdanBot-MD', 'Safari', '1.0.0'] : ["Ubuntu", "Edge", "20.0.04"],
      version: (await fetchLatestBaileysVersion()).version,
    });

    const { kim, store } = baileysConnection;
    const eventHandler = new EventHandler(kim, store);
    const connectionHandler = new ConnectionHandler(kim, store, start);

    // Registrar los eventos
    kim.ev.on('connection.update', connectionHandler.onConnectionUpdate);
    kim.ev.on('messages.upsert', eventHandler.onMessageUpsert);
    kim.ev.on('messages.update', eventHandler.onMessagesUpdate);
    kim.ev.on('group-participants.update', eventHandler.onGroupParticipantsUpdate);

    store?.bind(kim.ev);
    kim.ev.on('creds.update', saveCreds);

  } catch (error) {
    console.error('Error al iniciar el bot:', error);
  }
};
start();
