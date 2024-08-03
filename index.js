import "./settings.js"
import { PHONENUMBER_MCC, fetchLatestBaileysVersion, DisconnectReason, makeWASocket, makeInMemoryStore, useMultiFileAuthState, makeCacheableSignalKeyStore } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";
import pino from "pino";
import chalk from "chalk";
import fs from "fs";
import readline from "readline";
import NodeCache from 'node-cache'
import cfonts from 'cfonts'

const methodCodeQR = process.argv.includes("qr")
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const methodCode = !!phoneNumber || process.argv.includes("code")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

const color = (text, color) => {
return !color ? chalk.green(text) : color.startsWith('#') ? chalk.hex(color)(text) : chalk.keyword(color)(text)
}

const { state, saveCreds } = await useMultiFileAuthState('auth');
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }) })

let opcion
if (methodCodeQR) opcion = '1'

if (!methodCodeQR && !methodCode && !fs.existsSync(`./auth/creds.json`)) {
do {
let lineM = '★∻∹⋰⋰ ☆∻∹⋰⋰ ★∻∹⋰⋰ ☆∻∹⋰⋰★∻∹⋰⋰ ☆∻∹⋰⋰'
let linen = '✄ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈'
opcion = await question(`\n\n${lineM}\n
     ${chalk.blue.bgBlue.bold.cyan('🪷  mᥱ́𝗍᥆ძ᥆ ძᥱ ᥎іᥒᥴᥙᥣᥲᥴі᥆ᥒ 🪷 ')}\n
${lineM}\n
  ${chalk.blueBright('🎀 ꒷︶꒥‧˚૮꒰۵•▴•۵꒱ა‧˚꒷︶꒥🎀')}\n
${chalk.blueBright(linen)}\n   
${chalk.green.bgMagenta.bold.yellow('🌟  һ᥆ᥣᥲ, һᥱrm᥆s᥊, ¿ᥴ᥆m᥆ 𝗊ᥙіᥱrᥱs ᥴ᥆ᥒᥱᥴ𝗍ᥲr𝗍ᥱ? 🌟 ')}\n
${chalk.bold.redBright('🍓  ▷ ᥱᥣᥱᥴᥴі᥆ᥒ ➊ :')} ${chalk.greenBright('ᥙsᥲ ᥙᥒ ᥴ᥆ძіg᥆ 🆀 🆁 .')}
${chalk.bold.redBright('🧸  ▷ ᥱᥣᥱᥴᥴі᥆ᥒ ➋ :')} ${chalk.greenBright('ᥙsᥲ ᥙᥒ ᥴ᥆ძіg᥆ ძᥱ 8 ძіgі𝗍᥆s.')}\n
${chalk.blueBright(linen)}\n   
${chalk.italic.magenta('🍄 ¿𝗊ᥙᥱ́ ᥱᥣᥱᥴᥴі᥆ᥒ ᥱᥣᥱgіs𝗍ᥱ? ⍴᥆r𝖿іs ᥱsᥴrіᑲᥱ')}
${chalk.italic.magenta('s᥆ᥣ᥆ ᥱᥣ ᥒᥙ́mᥱr᥆ ძᥱ ᥣᥲ ᥱᥣᥱᥴᥴі᥆ᥒ. 🍄')}\n
${chalk.bold.magentaBright('---> ')}`)

if (!/^[1-2]$/.test(opcion)) {
console.log(chalk.bold.cyanBright(`🌻  һᥱᥡᥡᥡᥡ 🌻  ٩(๑꒦ິȏ꒦ິ๑)۶ \n\n${chalk.bold.redBright(`🌸  ᥒ᥆ sᥱ ⍴ᥱrmі𝗍ᥱᥒ mᥲ́s ᥒᥙmᥱr᥆s᥆s ᥲ⍴ᥲr𝗍ᥱ ძᥱ ${chalk.bold.greenBright("➊")} ᥆ ${chalk.bold.greenBright("➋")} 🌸\n🌼  𝗍ᥲm⍴᥆ᥴ᥆ ᥣᥱ𝗍rᥲs ᥒі sіmᑲ᥆ᥣ᥆s ᥱs⍴ᥱᥴіᥲᥣᥱs. (╥﹏╥) 🌼`)}\n\n${chalk.bold.yellowBright("🪻  ♡ ´･ღ ･`♡ 𝗍і⍴ 🪻 : 🌺  ᥴ᥆⍴іᥲ 𝗍ᥙ ᥒᥙ́mᥱr᥆ ძᥱsძᥱ ᥣᥲ ᥲ⍴⍴\n ძᥱ ᥕһᥲ𝗍sᥲ⍴⍴ ᥡ ⍴ᥱgᥲᥣ᥆ ᥱᥒ ᥣᥲ ᥴ᥆ᥒs᥆ᥣᥲ. 🌺")}`))
}
} while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./authFolder/creds.json`))
}

const start = async() => {

const kim = makeWASocket({
    printQRInTerminal: opcion == '1' ? true : false,
    logger: pino({ level: 'silent' }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'}))
    },
    browser: opcion == '1' ? ['KimdanBot-MD', 'Safari', '1.0.0'] : ["Ubuntu", "Edge", "20.0.04"],
    version: (await fetchLatestBaileysVersion()).version,
    generateHighQualityLinkPreview: true,
    getMessage: async (key) => {
        let jid = jidNormalizedUser(key.remoteJid)
        let msg = await store.loadMessage(jid, key.id)
        return (msg?.message || "").replace(/(?:Closing stale open|Closing open session)/g, "")
    },
    msgRetryCounterCache: new NodeCache(), //para mensaje de reintento, "mensaje en espera"
})

kim.isInit = false

if (!fs.existsSync(`./auth/creds.json`)) 
if (opcion === '2' && !kim.authState.creds.registered) {  
let addNumber
if (!!phoneNumber) {
addNumber = phoneNumber.replace(/[^0-9]/g, '')
if (!Object.keys(PHONENUMBER_MCC).some(v => addNumber.startsWith(v))) {
console.log(chalk.bgBlack(chalk.bold.redBright(`\n🍓  (≡^∇^≡) іᥒ𝗍r᥆ძᥙzᥴᥲ sᥙ ᥒᥙ́mᥱr᥆ ძᥱ ᥕһᥲ𝗍sᥲ⍴⍴, rᥱᥴᥙᥱrძᥲ ᥱm⍴ᥱzᥲr ᥴ᥆ᥒ ᥱᥣ ᥴ᥆ძіg᥆ ძᥱᥣ ⍴ᥲіs. 🍓\n\n${chalk.bold.yellowBright("🫐  ⍴᥆r ᥱȷᥱm⍴ᥣ᥆ (〃∀〃)ゞ🫐\n  ➥ +57 316 1407118")}\n`))) 
process.exit(0)
}} else {
while (true) {
addNumber = await question(chalk.bgBlack(chalk.bold.greenBright(`\n🍓  (≡^∇^≡) ⍴᥆r𝖿іs іᥒ𝗍r᥆ძᥙzᥴᥲ sᥙ ᥒᥙ́mᥱr᥆ ძᥱ ᥕһᥲ𝗍sᥲ⍴⍴. 🍓\n\n${chalk.bold.yellowBright("🫐  ⍴᥆r ᥱȷᥱm⍴ᥣ᥆ (〃∀〃)ゞ🫐\n    ➥ +57 316 1407118")}\n`))) 
addNumber = addNumber.replace(/[^0-9]/g, '')

if (addNumber.match(/^\d+$/) && Object.keys(PHONENUMBER_MCC).some(v => addNumber.startsWith(v))) {
break 
} else {
console.log(chalk.bold.redBright("🍨  ⍴᥆r𝖿ᥲs rᥱᥴᥙᥱrძᥲ іᥒ𝗍r᥆ძᥙᥴіr ᥱᥣ ᥴ᥆ძіg᥆ ძᥱᥣ ⍴ᥲіs. (◞ ᜊ ◟ㆀ) 🍨"))
}}
rl.close()  
} 

setTimeout(async () => {
let codeBot = await kim.requestPairingCode(addNumber)
codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
console.log(chalk.bold.white(chalk.bgMagenta(`(●'▽ '●)ゝ 🩷  ᥴ᥆ძіg᥆ ძᥱ ᥎іᥒᥴᥙᥣᥲᥴі᥆ᥒ 🩷 : `)), chalk.bold.white(chalk.white(codeBot)))
}, 2000)
}

async function getMessage(key) {
  if (store) {
    const msg = await store.loadMessage(key.remoteJid, key.id);
    return msg?.message }
  return { conversation: '𝐊𝐢𝐦𝐃𝐚𝐧𝐁𝐨𝐭-𝐌𝐃' }}
kim.ev.on('messages.upsert', async (chatUpdate) => {
  try {
    chatUpdate.messages.forEach(async (mek) => {
      try {
        mek = chatUpdate.messages[0];
        if (!mek.message) return;
        mek.message = mek.message.ephemeralMessage?.message || mek.message;
        if (mek.key && mek.key.remoteJid === 'status@broadcast') return;
        if (!kim.public && !mek.key.fromMe && chatUpdate.type === 'notify') return;
        if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
        if (mek.key.id.startsWith('FatihArridho_')) return;
        global.numBot = kim.user.id.split(":")[0] + "@s.whatsapp.net";
        global.numBot2 = kim.user.id;
        const m = smsg(kim, mek);
        require("./kim")(kim, m, chatUpdate, mek, store);
      } catch (e) {
        console.error(e)
      }}
      } catch (err) {
    console.error(err)
  }});

kim.ev.on('messages.update', async (chatUpdate) => {
  for (const { key, update } of chatUpdate) {
    if (update.pollUpdates && key.fromMe) {
      const pollCreation = await getMessage(key);
      if (pollCreation) {
        const pollUpdate = await getAggregateVotesInPollMessage({ message: pollCreation, pollUpdates: update.pollUpdates });
        const winningOption = pollUpdate.find(v => v.voters.length !== 0)?.name;
        if (!winningOption) return;
        const command = prefix + winningOption;
        kim.appenTextMessage(command, chatUpdate)}}}});

store?.bind(kim.ev);
	
kim.ev.on('creds.update', saveCreds)
	
kim.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect, qr, isNewLogin } = update;

if (isNewLogin) kim.isInit = true
if (connection == 'connecting') {
console.log('iniciando...')

cfonts.say('KimdanBot-MD', { font: 'chrome', align: 'center', gradient: ['red', 'magenta']});
cfonts.say(`BOT EN DESARROLLO`, { font: 'console', align: 'center', gradient: ['red', 'magenta']});
	
} else if (connection == 'close') {
let reason = new Boom(lastDisconnect?.error)?.output?.statuscode
if (reason == DisconnectReason.connectionClose) {
console.log(`Se cerro la conexion conectando de nuevo`);
start();
}
} else if (opcion == '1' && qr) {
console.log(color('[SYS]', '#009FFF'),
color(`\nescanea el codigo qr`, '#f12711'))
} else if (connection == 'open') console.log('Kim es online.');
})
}

start();
