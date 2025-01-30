import { fetchLatestBaileysVersion, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { BaileysConnection } from './Kim/core/BaileysConnection.js';
import { EventHandler } from './Kim/core/EventHandler.js';
import { ConnectionHandler } from './Kim/core/connectionHandler.js'
import { AuthHandler } from './Kim/core/authHandler.js';
import readline from "readline";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

const start = async () => {
  try {
    const authHandler = new AuthHandler();
    const opcion = await authHandler.obtenerOpcionConexion();

    const baileysConnection = new BaileysConnection({
      authPath: 'auth',
      printQRInTerminal: opcion === '1',
      browser: opcion === '1' ? ['KimdanBot-MD', 'Safari', '1.0.0'] : ["Ubuntu", "Edge", "20.0.04"],
      version: (await fetchLatestBaileysVersion()).version,
    });

    const { kim, store } = await baileysConnection.connect();
    const { saveCreds } = await useMultiFileAuthState('auth');
    const eventHandler = new EventHandler(kim, store, start);
    const connectionHandler = new ConnectionHandler(kim, store, start);

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
