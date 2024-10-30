import makeWASocket, { makeInMemoryStore, useMultiFileAuthState, makeCacheableSignalKeyStore } from '@whiskeysockets/baileys';
import pino from 'pino';

export class BaileysConnection {
  constructor(options) {
    this.authPath = options.authPath;
    this.printQRInTerminal = options.printQRInTerminal;
    this.browser = options.browser;
    this.version = options.version;

    this.logger = pino({ level: 'silent' });
    this.store = makeInMemoryStore({ logger: this.logger.child({ level: 'silent', stream: 'store' }) });
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
        let jid = jidNormalizedUser(key.remoteJid);
        let msg = await this.store.loadMessage(jid, key.id);
        return (msg?.message || "").replace(/(?:Closing stale open|Closing open session)/g, "");
      }
    });

    this.kim.ev.on('creds.update', saveCreds);

    return {
      kim: this.kim,
      store: this.store
    };
  }
}
