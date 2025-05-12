import {
    makeWASocket,
    makeInMemoryStore,
    useMultiFileAuthState,
    makeCacheableSignalKeyStore,
    jidNormalizedUser,
} from '@whiskeysockets/baileys';
import pino from 'pino';
import chalk from 'chalk';
import PhoneNumber from 'awesome-phonenumber';
import readline from 'readline';

export class BaileysConnection {
    constructor(options) {
        this.authPath = options.authPath;
        this.printQRInTerminal = options.printQRInTerminal;
        this.browser = options.browser;
        this.version = options.version;
        this.logger = options.logger || pino({ level: 'silent' });
        this.rl = options.rl;
        this.passedPhoneNumber = options.phoneNumber;

        this.store = makeInMemoryStore({ logger: this.logger.child({ level: 'silent', stream: 'store' }) });
    }

    async askQuestion(query) {
        const rlInterface = this.rl || readline.createInterface({ input: process.stdin, output: process.stdout });
        const promise = new Promise((resolve) => rlInterface.question(query, resolve));
        
        if (!this.rl) {
            promise.finally(() => rlInterface.close());
        }
        return promise;
    }

    async connect() {
        const { state, saveCreds } = await useMultiFileAuthState(this.authPath);

        this.kim = makeWASocket({
            printQRInTerminal: this.printQRInTerminal,
            logger: this.logger,
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, this.logger)
            },
            browser: this.browser,
            version: this.version,
            generateHighQualityLinkPreview: true,
            getMessage: async (key) => {
                const jid = jidNormalizedUser(key.remoteJid);
                const msg = await this.store.loadMessage(jid, key.id);
                return msg?.message || undefined;
            }
        });

        this.store?.bind(this.kim.ev);

        if (!this.printQRInTerminal && !this.kim.authState.creds.registered) {
            let phoneNumberToUse = this.passedPhoneNumber;

            if (!phoneNumberToUse) {
                console.log(chalk.yellow("No se proporcionó un número de teléfono para el código de pareo."));
                phoneNumberToUse = await this.askQuestion(chalk.bgBlack(chalk.bold.greenBright(`\n  (≡^∇^≡) Por favor, introduce tu número de WhatsApp completo (con código de país).\n\n${chalk.bold.yellowBright("🫐  Por ejemplo (〃∀〃)ゞ🫐\n    ➥ +5211234567890")}\n${chalk.bold.magentaBright('---> ')}`)));
            }
            
            if (!phoneNumberToUse || typeof phoneNumberToUse !== 'string' || phoneNumberToUse.trim() === '') {
                 console.error(chalk.red("Número de teléfono no ingresado o inválido. No se puede solicitar código de pareo."));
                 throw new Error("Número de teléfono no ingresado o inválido para el código de pareo.");
            }

            const pn = new PhoneNumber(phoneNumberToUse.trim());
            if (!pn.isValid()) {
                console.log(chalk.bgBlack(chalk.bold.redBright(`\n🍓 (≡^∇^≡) El número de WhatsApp "${phoneNumberToUse}" no parece ser válido.\nPor favor, asegúrate de incluir el código de país (ej: +521...). Intenta de nuevo.\n`)));
                throw new Error("Número de teléfono inválido según la validación.");
            }
            
            const numeroValidoE164 = pn.getNumber('e164'); 

            try {
                console.log(chalk.yellow("Solicitando código de pareo para el número validado:"), chalk.blue(numeroValidoE164));
                let codeBot = await this.kim.requestPairingCode(numeroValidoE164);
                codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;
                console.log(chalk.bold.white(chalk.bgMagenta(`(●'▽ '●)ゝ 🩷 Tu código de vinculación es 🩷 : `)), chalk.bold.white(chalk.white(codeBot)));
                console.log(chalk.yellow("Ingresa este código en tu WhatsApp en la sección 'Dispositivos Vinculados' > 'Vincular con número de teléfono'."));
            } catch (error) {
                console.error(chalk.red('Error al solicitar el código de emparejamiento:'), error.message || error);
                if (error.output?.payload?.reason === 'too_many_attempts') {
                     console.error(chalk.red("Has intentado solicitar el código demasiadas veces. Espera un momento y vuelve a intentarlo."));
                }
                throw error;
            }
        }

        this.kim.ev.on('creds.update', saveCreds);

        return {
            kim: this.kim,
            store: this.store
        };
    }
}
