require("./settings")
require("./imagenes")
const { default: makeWASocket, makeInMemoryStore, useMultiFileAuthState, DisconnectReason, proto , jidNormalizedUser,WAMessageStubType, generateForwardMessageContent, prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID, downloadContentFromMessage, msgRetryCounterMap, makeCacheableSignalKeyStore, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const pino = require('pino')
const { Boom } = require('@hapi/boom')   
const yargs = require('yargs/yargs')   
const fs = require('fs')   
const FileType = import('file-type')   
const chalk = require('chalk')   
const path = require('path')   
const qrcode = require('qrcode')   
const NodeCache = require('node-cache')
const util = require('util')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./libs/fuctions')   
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'storeV2' }) })   
const crm1 = 'SmFkaWJvdCBoZWNobyBwb3IgQHNraWR5ODkgcGFyYSBza2lkIGJvdCB5IGdhdGFwbHVz'
const crm2 = Buffer.from(crm1, 'base64')
const crm3 = crm2.toString('utf-8')
if (global.listJadibot instanceof Array) console.log()   
else global.listJadibot = []   

const jadibot = async (conn, m, command) => {
const { sendImage, sendMessage, decodeJid, getName } = conn
if (!global.db.data.settings[conn.user.jid].jadibot) return m.reply(`*⚠️ Este comando fue desabilitado por el creador*`)
if (conn.user.jid !== global.numBot) return m.reply(`*⚠️ Este comando solo puede ser usado en un Bot principa*\n\n👉🏻 https://api.whatsapp.com/send/?phone=${global.numBot.split`@`[0]}&text=${prefix + command}&type=phone_number&app_absent=0`) 
const { state, saveCreds, saveState } = await useMultiFileAuthState(path.join(__dirname, `./jadibts/${m.sender.split("@")[0]}`), pino({ level: "silent" }));   
try {
async function KimBot() {
console.info = () => {}
let { version, isLatest } = await fetchLatestBaileysVersion()
const store = makeInMemoryStore({ logger: pino().child({ level: "silent", stream: "store" }), })
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()

const JadibotSettings = {
printQRInTerminal: true,
logger: pino({ level: 'silent' }),
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache,
version,
syncFullHistory: true,
browser: ['SubKimdanBot','Safari','1.0.0'],
defaultQueryTimeoutMs: undefined,
getMessage: async (key) => {
if (store) {
const msg = store.loadMessage(key.remoteJid, key.id)
return msg.message && undefined
} return {
conversation: 'kimdan',
}}}
    
const conn = makeWASocket(JadibotSettings)
conn.isBotInit = false
let sock = conn
    
sock.ev.on('messages.upsert', async chatUpdate => {   
try {   
chatUpdate.messages.forEach(async (mek) => {   
try {   
if (!mek.message) return   
mek.message = (Object.keys(mek.message)[0] === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message   
if (mek.key && mek.key.remoteJid === 'status@broadcast') return   
if (!chatUpdate.type === 'notify') return   
m = smsg(conn, mek)   
require("./kim")(conn, m, chatUpdate, mek)   
} catch (e) {   
console.log(e)   
}})
} catch (err) {   
console.log(err)   
}})   
    
let countQR = 0
let chatQR
sock.ev.on('connection.update', async (up) => {     
if (countQR > 3) return; 
const { lastDisconnect, connection, isNewLogin } = up; 
if (connection == 'connecting') return
if (connection) { 
if (connection != 'connecting')  
console.log('Connectando...')
}
if (isNewLogin) conn.isBotInit = false
if (up.qr) { 
countQR++;
if (countQR > 3) {
await m.reply(`*Código QR no escaneado, inténtalo de nuevo más tarde.*`, m.sender)    
await sendMessage(m.sender, { delete: chatQR.key })
sleep(5000)
sock.ev.removeAllListeners()
} else {
try {
const sendQR = await sendImage(m.sender, 
await qrcode.toDataURL(up.qr, { scale: 8 }), '*Escanea este QR para convertirte en Sub Bot*', m); 
if (chatQR) {
await sendMessage(m.sender, { delete: chatQR.key })
}
chatQR = sendQR
} catch (error) {
m.reply(util.format(error))
}}}
    
if (connection == "open") {   
let usuario = await conn.user.jid
global.listJadibot.push(sock)   
await m.reply(`*Conectado con exito*\n\n× USUARIO: ${sock.user.name}\n× ID : ${command}\n\n*NOTA:* el bot se puede reiniciar si deja de recibir comandos use #jadibot para volver a conectarte`)    
if (isNewLogin) {
function getCodegroup(link) {
const regex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{22})/;
const match = link.match(regex);
return match ? match[1] : null;
}
const groupCode = getCodegroup(nn);
}
}
if (connection === 'close') {
let reason = new Boom(lastDisconnect?.error)?.output.statusCode
const errorMessages = {
[DisconnectReason.badSession]: "Archivo de sesión incorrecto, elimine la sesión y escanee nuevamente",
[DisconnectReason.connectionClosed]: "Conexión cerrada, reconectando....",
[DisconnectReason.connectionLost]: "Conexión cerrada, reconectando....",
[DisconnectReason.connectionReplaced]: "Conexión reemplazada, otra nueva sesión abierta, cierre la sesión actual primero",
[DisconnectReason.loggedOut]: "Dispositivo desconectado, escanee nuevamente y ejecute....",
[DisconnectReason.restartRequired]: "Reiniciar requerido, reiniciar....",
[DisconnectReason.timedOut]: "CONEXIÓN PERDIDA, CONECTANDO....",
};

if (reason in errorMessages) {
console.log(errorMessages[reason]);
if (reason === DisconnectReason.badSession || reason === DisconnectReason.connectionReplaced || reason === DisconnectReason.loggedOut) {
sock.logout()
var ur = global.listJadibot.indexOf(sock) 
if (ur < 0) return
delete global.listJadibot(ur)
global.listJadibot.splice(ur, 1)
} else {
KimBot();
}} else {
sock.end(`\n┏━━━◉━━━━⬤━━━⪩『 🛑  ${vs} 🛑   』⪨━━━⬤━━━━◉━━━┉┉\n${lenguaje['smsConexioncerrar']()}\n┃${reason}|${connection}\n┗━━━◉━━━━⬤━━━⪩『 🛑  ${vs} 🛑   』⪨━━━⬤━━━━◉━━━┉┉\n`);
var u = global.listJadibot.indexOf(sock) 
if (u < 0) return
delete global.listJadibot(u)
global.listJadibot.splice(u, 1)
}}})

//anticall
sock.ev.on('call', async (fuckedcall) => { 
sock.user.jid = sock.user.id.split(":")[0] + "@s.whatsapp.net" // jid in user?
let anticall = global.db.data.settings[numBot].anticall
if (!anticall) return 
console.log(fuckedcall)
for (let fucker of fuckedcall) {
if (fucker.isGroup == false) {
if (fucker.status == "offer") {
let call = await sock.sendTextWithMentions(fucker.from, `${lenguaje['smscall']()}\n🫐 @${fucker.from.split('@')[0]} ${lenguaje['smscall2']()}`)
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;👑 ⍴ɾ᥆⍴іᥱ𝗍ᥲɾі᥆ 👑;;;\nFN:🍓 ⍴ɾ᥆⍴іᥱ𝗍ᥲɾі᥆ 🍓\nORG:🍒 ⍴ɾ᥆⍴іᥱ𝗍ᥲɾі᥆ 🍒\nTITLE:\nitem1.TEL;waid=573161407118:+57 316 1407118\nitem1.X-ABLabel:🍒 ⍴ɾ᥆⍴іᥱ𝗍ᥲɾі᥆ 🍒\nX-WA-BIZ-DESCRIPTION:⍴᥆ɾ𝖿ᥲ᥎᥆ɾ s᥆ᥣ᥆ ᥱsᥴɾіᑲіɾ ⍴ᥲɾᥲ ᥴ᥆sᥲs s᥆ᑲɾᥱ ᥱᥣ ᑲ᥆𝗍.\nX-WA-BIZ-NAME:᥆ᥕᥒᥱɾ 👑\nEND:VCARD`
sock.sendMessage(fucker.from, { contacts: { displayName: '🍓 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🍓', contacts: [{ vcard }] }}, {quoted: call, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
await sleep(8000)
await sock.updateBlockStatus(fucker.from, "block")
}}}})

//detect
sock.ev.on("groups.update", async (json) => {
console.log(color(json, '#009FFF'))
//console.log(json)
const res = json[0];
const detect = global.db.data.chats[res.id]
if (!detect) return
if (res.announce == true) {
await sleep(2000)
try {
ppgroup = await sock.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png'
}
// grupo cerrado
sock.sendMessage(res.id, {text: lenguaje['smsAvisos2'](),  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,  
isForwarded: true,
remoteJid: anu.id,
mentionedJid:[m.sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"containsAutoReply": false,
"renderLargerThumbnail": false,  
"title": lenguaje['smsAvisos'](), 
"mediaType": 1,   
"thumbnailUrl": ftkim,  
"mediaUrl": redes,  
"sourceUrl": canales
}}})
} else if (res.announce == false) {
await sleep(2000)
try {
ppgroup = await sock.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png'
}
//grupo abierto
sock.sendMessage(res.id, {   
text: lenguaje['smsAvisos3'](),  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,
isForwarded: true,
remoteJid: anu.id,   
mentionedJid:[m.sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"containsAutoReply": false,
"renderLargerThumbnail": false,  
"title": lenguaje['smsAvisos4'](),   
"mediaType": 1,   
"thumbnailUrl": ftkim,  
"mediaUrl": redes,  
"sourceUrl": canales
}}})
} else if (res.restrict == true) {
await sleep(2000)
try {
ppgroup = await sock.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png'
}
//solo admin pueden editar los ajustes
sock.sendMessage(res.id, {text: lenguaje['smsAvisos6'](),
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,
isForwarded: true,
remoteJid: anu.id,   
mentionedJid:[m.sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"containsAutoReply": false,
"renderLargerThumbnail": false,  
"title": lenguaje['smsAvisos5'](),
"body": wm, 
"mediaType": 1,   
"thumbnailUrl": ftkim,  
"mediaUrl": redes,  
"sourceUrl": canales
}}})
} else if (res.restrict == false) {
await sleep(2000)
try {
ppgroup = await sock.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png'
}
//todos pueden editar los ajustes
sock.sendMessage(res.id, {text: lenguaje['smsAvisos7'](),  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,
isForwarded: true,
remoteJid: anu.id,   
mentionedJid:[m.sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"containsAutoReply": false,
"renderLargerThumbnail": false,  
"title": lenguaje['smsAvisos5'](),
"body": wm, 
"mediaType": 1,   
"thumbnailUrl": ftkim,  
"mediaUrl": redes,  
"sourceUrl": canales 
}}})
} else if(!res.desc == ``){
await sleep(2000)
try {
ppgroup = await sock.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png'
}
// descripción
let text = `${lenguaje['smsAvisos8']()}\n ❥ ${res.desc}`
sock.sendMessage(res.id, {text: text,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,
isForwarded: true,
remoteJid: anu.id,   
mentionedJid:[m.sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"containsAutoReply": false,
"renderLargerThumbnail": false,  
"title": lenguaje['smsAvisos5'](),
"body": wm, 
"mediaType": 1,   
"thumbnailUrl": ftkim,  
"mediaUrl": redes,  
"sourceUrl": canales
}}})
} else if(!res.subject == ``){
await sleep(2000)
try {
ppgroup = await sock.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png'
}
// nombre
let text = `${lenguaje['smsAvisos9']()}\n ❥ ${res.subject}`
sock.sendMessage(res.id, {text: text,  
contextInfo:{  
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,
isForwarded: true,
remoteJid: anu.id,
mentionedJid:[m.sender],  
"externalAdReply": {  
"showAdAttribution": true,  
"containsAutoReply": false,
"renderLargerThumbnail": false,  
"title": lenguaje['smsAvisos5'](),
"body": wm, 
"mediaType": 1,   
"thumbnailUrl": ftkim,  
"mediaUrl": redes,  
"sourceUrl": canales
}}})
}})
	
//Welcome adaptado
sock.ev.on('group-participants.update', async (anu) => {
let isWelcome = global.db.data.chats[anu.id].welcome
if(!isWelcome) return
console.log(anu)
try {
let metadata = await sock.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await sock.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
}
try {
ppgroup = await sock.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png'
}
memb = metadata.participants.length
welc = await getBuffer(ppuser)
leave = await getBuffer(ppuser)
if (anu.action == 'add') {
const buffer = await getBuffer(ppuser)
const time = moment.tz('America/Bogota').format('HH:mm:ss')
const date = moment.tz('America/Bogota').format('DD/MM/YYYY')
let name = num
const miembros = metadata.participants.length
sock.sendMessage(anu.id, { text: `${lenguaje.wel.A} @${num.split("@")[0]} ${lenguaje.wel.B}\n${String.fromCharCode(8206).repeat(850)}\n${metadata.desc}`, contextInfo:{
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: 'zamhetero' },
isForwarded: true, 
mentionedJid:[num],
"externalAdReply": {"showAdAttribution": true,
"containsAutoReply": true,
"title": `${lenguaje.wel.w}`,
"body": `${metadata.subject}`,
"previewType": "PHOTO",
"thumbnailUrl": redes,
"thumbnail": welc,
"sourceUrl": redes}}}) 	
}
// despedida
let isBye = global.db.data.chats[anu.id].bye
if(!isBye) return
if (anu.action == "remove") {
        const buffer = await getBuffer(ppuser)
let name = num
const members = metadata.participants.length
sock.sendMessage(anu.id, { text: `${lenguaje.wel.C} @${name.split("@")[0]} 🍇*\n${lenguaje.wel.D}`, contextInfo:{
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,
isForwarded: true,
remoteJid: anu.id,
mentionedJid:[num],
"externalAdReply": {"showAdAttribution": true,
"containsAutoReply": true,
"title": `${lenguaje.wel.x}`, 
"body": `${metadata.subject}`,
"previewType": "PHOTO",
"thumbnailUrl": ``,     
"thumbnail": leave,
"sourceUrl": redes}}}, {quoted: m}) 
}
//nuevo admin
let isAdm = global.db.data.chats[anu.id].adm
if(!isAdm) return
 if (anu.action == "promote") {
const groupAdmins = participants.filter(p => p.admin)
const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n')
const buffer = await getBuffer(ppuser)
let name = num
let usuario = anu.author
sock.sendMessage(anu.id, { text: `${lenguaje.wel.E} @${name.split("@")[0]} ${lenguaje.wel.F} @${usuario.split("@")[0]} ${lenguaje.wel.G}`, mentions: [...groupAdmins.map(v => v.id)], 
 contextInfo:{
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,
isForwarded: true,
remoteJid: anu.id,	 
 mentionedJid: [num, usuario],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": `${lenguaje.wel.y}`,
"body": wm, 
"mediaType": 1,   
"thumbnailUrl": ftkim,  
"mediaUrl": redes,  
"sourceUrl": canales}}})
//un admin menos
} else if (anu.action == 'demote') {
const buffer = await getBuffer(ppuser)
let name = num
let usuario = anu.author
sock.sendMessage(anu.id, { text: `${lenguaje.wel.H} @${name.split("@")[0]} ${lenguaje.wel.F} @${usuario.split("@")[0]} ${lenguaje.wel.G}`,
 contextInfo:{
forwardedNewsletterMessageInfo: { 
newsletterJid: '120363200204060894@newsletter', 
serverMessageId: '', 
newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
forwardingScore: 9999999,
isForwarded: true,
remoteJid: anu.id,	 
 mentionedJid:[num, usuario],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": `${lenguaje.wel.z}`,
"body": wm, 
"mediaType": 1,   
"thumbnailUrl": ftkim,  
"mediaUrl": redes,  
"sourceUrl": canales}}})
}}} catch (err) {
console.log(err)
}})
	
 const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
   
conn.ev.on('creds.update', saveCreds)   
store.bind(conn.ev);   
}

KimBot()
} catch (e) {
m.reply(util.format(e))
}}
   
module.exports = { jadibot, listJadibot }
   
let file = require.resolve(__filename)   
fs.watchFile(file, () => {   
fs.unwatchFile(file)   
console.log(chalk.redBright(`Update ${__filename}`))   
delete require.cache[file]   
require(file)   
}) 
