import { Boom } from "@hapi/boom";
import { DisconnectReason, delay } from "@whiskeysockets/baileys"; 
import cfonts from 'cfonts';

export class ConnectionHandler {
    constructor(kim, store, start) {
        this.kim = kim;
        this.store = store;
        this.start = start;
        this.reconnecting = false; // Flag para evitar reconexiones múltiples
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
                this.reconnecting = false; // Reinicia el flag de reconexión
                break;
            default:
                console.log('Estado de conexión desconocido:', connection, update); // Incluye 'update' para más info
        }
    };

    mostrarMensajeConectando() {
        console.log('Iniciando conexión...');
        cfonts.say('KimdanBot-MD', { font: 'chrome', align: 'center', gradient: ['red', 'magenta'] });
        cfonts.say(`BOT EN DESARROLLO`, { font: 'console', align: 'center', gradient: ['red', 'magenta'] });
    }

    manejarCierreConexion(lastDisconnect) {
        const statusCode = new Boom(lastDisconnect?.error)?.output?.statusCode;
        console.log("Código de estado de cierre:", statusCode); // Imprime el código de estado

        if (statusCode === DisconnectReason.connectionClosed) {
            console.log('Conexión cerrada. Reconectando...');
            if (!this.reconnecting) { // Evita múltiples reconexiones simultáneas
                this.reconnecting = true;
                this.reconectar();
            }
        } else if (statusCode === DisconnectReason.loggedOut) {
            console.log('Sesión cerrada. Reinicie por favor.');
            process.exit();
        } else if (statusCode === 409) { // Conflicto: el número ya está registrado
          console.log("El número ya está registrado o el código es incorrecto.");
        } else {
            this.manejarErrorConexion(lastDisconnect?.error); // Usa optional chaining
        }
    }

    async reconectar() {
        console.log("Intentando reconexión...");
        await delay(5000); // Espera 5 segundos antes de reconectar
        try {
            await this.start(); // Intenta reiniciar la conexión
            this.reconnecting = false; // Restablece el flag si la reconexión es exitosa
        } catch (error) {
            console.error("Error durante la reconexión:", error);
            this.reconnecting = false; // Restablece el flag incluso si falla la reconexión
            this.reconectar(); // Reintenta la reconexión
        }
    }


    manejarErrorConexion(error) {
        console.error('Conexión cerrada inesperadamente:', error);
        if (!this.reconnecting) {
            this.reconnecting = true;
            this.reconectar();
        }
    }
}
