import { makeWASocket, makeInMemoryStore, useMultiFileAuthState, makeCacheableSignalKeyStore, jidNormalizedUser, PHONENUMBER_MCC } from '@whiskeysockets/baileys';
import pino from 'pino';
import chalk from 'chalk';

export class BaileysConnection {
    constructor(options) {
        this.authPath = options.authPath; // Ruta para guardar los archivos de sesión.
        this.printQRInTerminal = options.printQRInTerminal; // Define si se muestra QR o se usa código de pareo.
        this.browser = options.browser; // Configuración del navegador a simular.
        this.version = options.version; // Versión de Baileys a utilizar.
        this.logger = options.logger || pino({ level: 'silent' });
        this.rl = options.rl; // Instancia de readline para interacciones (si fueran necesarias aquí).
        this.phoneNumber = options.phoneNumber; // Número para el código de pareo, si se proporciona.

        // Almacén en memoria para guardar datos de chats, mensajes, etc.
        this.store = makeInMemoryStore({ logger: this.logger.child({ level: 'silent', stream: 'store' }) });
    }

    // Establece la conexión con WhatsApp.
    async connect() {
        // Carga la sesión desde archivos o crea una nueva.
        const { state, saveCreds } = await useMultiFileAuthState(this.authPath);

        // Crea el socket principal de Baileys con la configuración proporcionada.
        this.kim = makeWASocket({
            printQRInTerminal: this.printQRInTerminal,
            logger: this.logger,
            auth: {
                creds: state.creds, // Credenciales de la sesión.
                keys: makeCacheableSignalKeyStore(state.keys, this.logger) // Manejo de claves de señalización.
            },
            browser: this.browser,
            version: this.version,
            generateHighQualityLinkPreview: true,
            // Función para obtener mensajes, utilizada internamente por Baileys.
            getMessage: async (key) => {
                let jid = jidNormalizedUser(key.remoteJid);
                let msg = await this.store.loadMessage(jid, key.id);
                return msg?.message || undefined;
            }
        });

        this.store?.bind(this.kim.ev); // Vincula el store a los eventos del socket para mantenerlo actualizado.

        // Lógica para solicitar y mostrar el código de pareo si no se usa QR y no hay sesión.
        if (!this.printQRInTerminal && !this.kim.authState.creds.registered) {
            if (!this.phoneNumber) {
                console.error(chalk.red("Número de teléfono no proporcionado para el código de pareo."));
                throw new Error("Número de teléfono no proporcionado para el código de pareo.");
            }

            const cleanedPhoneNumber = this.phoneNumber.replace(/[^0-9]/g, '');
            if (!Object.keys(PHONENUMBER_MCC).some(v => cleanedPhoneNumber.startsWith(v))) {
                 console.log(chalk.bgBlack(chalk.bold.redBright(`\n🍓 (≡^∇^≡) El número de WhatsApp (${this.phoneNumber}) no parece válido o no incluye un código de país reconocido.\n`)));
                 throw new Error("Número de teléfono inválido para código de pareo.");
            }

            try {
                console.log(chalk.yellow("Solicitando código de pareo para el número:"), chalk.blue(this.phoneNumber));
                let codeBot = await this.kim.requestPairingCode(this.phoneNumber); // Solicita el código a WhatsApp.
                codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot; // Formatea el código.
                console.log(chalk.bold.white(chalk.bgMagenta(`(●'▽ '●)ゝ 🩷 Tu código de vinculación es 🩷 : `)), chalk.bold.white(chalk.white(codeBot)));
                console.log(chalk.yellow("Ingresa este código en tu WhatsApp: Dispositivos Vinculados > Vincular con número de teléfono."));
            } catch (error) {
                console.error(chalk.red('Error al solicitar el código de emparejamiento:'), error);
                throw error;
            }
        }

        // Guarda las credenciales actualizadas automáticamente.
        this.kim.ev.on('creds.update', saveCreds);

        return { // Retorna el socket y el store para ser usados por el resto de la aplicación.
            kim: this.kim,
            store: this.store
        };
    }
}
