import { Boom } from "@hapi/boom"; 
import { DisconnectReason } from "@whiskeysockets/baileys";
import cfonts from 'cfonts';

export class ConnectionHandler {
  constructor(kim, store, start) {
    this.kim = kim;
    this.store = store;
    this.start = start;
  }

  onConnectionUpdate = async (update) => {
    const { connection, lastDisconnect } = update;

    switch (connection) {
      case 'connecting':
        this.mostrarMensajeConectando();
        break;
      case 'close':
        this.manejarCierreConexion(lastDisconnect);
        break;
      case 'open':
        console.log('Conexión abierta.');
        break;
      default:
        console.log('Estado de conexión desconocido:', connection);
    }
  };

  mostrarMensajeConectando() {
    console.log('Iniciando conexión...');
    cfonts.say('KimdanBot-MD', { font: 'chrome', align: 'center', gradient: ['red', 'magenta'] });
    cfonts.say(`BOT EN DESARROLLO`, { font: 'console', align: 'center', gradient: ['red', 'magenta'] });
  }

  manejarCierreConexion(lastDisconnect) {
    const statusCode = new Boom(lastDisconnect?.error)?.output.statusCode;
    switch (statusCode) {
      case DisconnectReason.connectionClosed:
        console.log('Conexión cerrada. Reconectando...');
        this.start();
        break;
      case DisconnectReason.loggedOut:
        console.log('Sesión cerrada. Reinicie porfavor.');
        process.exit();
        break;
      default:
        this.manejarErrorConexion(lastDisconnect.error);
    }
  }

  manejarErrorConexion(error) {
    console.error('Conexión cerrada inesperadamente:', error);
    this.start();
  }
}
