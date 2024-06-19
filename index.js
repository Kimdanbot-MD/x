import { DisconnectReason, makeWASocket, makeInMemoryStore, useMultiFileAuthState, makeCacheableSignalKeyStore, Browsers } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import pino from "pino";

const { state, saveCreds } = await useMultiFileAuthState('auth');
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) })

const start = async() => {
    let kim = await makeWASocket({
        logger: pino({ level: "silent" }),
        browser: Browsers.ubuntu('Chrome'),
        printQRInTerminal: true,
        auth: {
		    creds: state.creds,
		    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "silent" })),
		}
    })
    
    store?.bind(kim.ev);
    
    kim.ev.on("creds.update", saveCreds)
    kim.ev.on("connection.update", async({ connection, lastDisconnect}) => {
        if (connection == "close") {
            let reason = new Boom(lastDisconnect?.error)?.output?.statuscode
            if (reason == DisconnectReason.connectionClose) { 
                console.log(`Se cerro la conexion conectando de nuevo`);
                start();
            }
        }
        if (connection == "open") {
			console.log(`Kim es online.`);
		};
    })
}

start()