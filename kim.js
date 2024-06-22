// ═════════════𓊈『 IMPORTACIONES 』𓊉═════════════ 
import { WaMessageStubType, areJidsSameUser, downloadContentFromMessage, generateWAMessageContent, generateWAMessageFromContent, generateWAMessage, prepareWAMessageMedia, relayMessage} from '@whiskeysockets/baileys'  
import pino from "pino";
import chalk from "chalk";
import fs from "fs";
import fetch from 'node-fetch'

const msgs = (message) => {   
if (message.length >= 10) { 
return `${message.substr(0, 500)}` 
} else {  
return `${message}`}}
const getFileBuffer = async (mediakey, MediaType) => {  
const stream = await downloadContentFromMessage(mediakey, MediaType)  
let buffer = Buffer.from([])  
for await(const chunk of stream) {  
buffer = Buffer.concat([buffer, chunk]) }  
return buffer 
}     
module.exports = kim = async (conn, m, chatUpdate, mek, store, sock) => { // Raíz "kim" para mensajes y argumentos
var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''

function KimR(list) {return list[Math.floor(list.length * Math.random())]}     
global.ftkim = KimR(fotos)
global.redes = KimR(red) 
global.wha = KimR(wa) 
global.canales = KimR(ca)

// ═════════════𓊈『 ATRIBUTOS 』𓊉═════════════
if (m.key.id.startsWith("BAE5")) return
var budy = (typeof m.text == 'string' ? m.text : '')
const isCmd = body.startsWith(prefix)
const from = m.chat
const msg = JSON.parse(JSON.stringify(mek, undefined, 2))
const content = JSON.stringify(m.message)
const type = m.mtype
const arg = body.substring(body.indexOf(' ') + 1)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const full_args = body.replace(command, '').slice(1).trim()
const q = args.join(" ")
let t = m.messageTimestamp
const pushname = m.pushName || "Sin nombre"
const botnm = conn.user.id.split(":")[0] + "@s.whatsapp.net"
const userSender = m.key.fromMe ? botnm : m.isGroup && m.key.participant.includes(":") ? m.key.participant.split(":")[0] + "@s.whatsapp.net" : m.key.remoteJid.includes(":") ? m.key.remoteJid.split(":")[0] + "@s.whatsapp.net" : m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid
const isCreator = global.owner.map(([numero]) => numero.replace(/[^\d\s().+:]/g, '').replace(/\s/g, '') + '@s.whatsapp.net').includes(userSender)
const isOwner = isCreator || m.fromMe;
const isMods = isOwner || global.mods.map((v) => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const itsMe = m.sender == conn.user.id ? true : false
const text = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const sender = m.key.fromMe ? botnm : m.isGroup ? m.key.participant : m.key.remoteJid
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const mime = (quoted.msg || quoted).mimetype || ''
const qmsg = (quoted.msg || quoted)
const isMedia = /image|video|sticker|audio/.test(mime)
const numBot = conn.user.id.split(":")[0] + "@s.whatsapp.net"
const numBot2 = conn.user.id
const mentions = []
if (m.message[type].contextInfo) {
if (m.message[type].contextInfo.mentionedJid) {
const msd = m.message[type].contextInfo.mentionedJid
for (let i = 0; i < msd.length; i++) {
mentions.push(msd[i])}}}
  
// ═════════════𓊈『 GRUPO 』𓊉═════════════
const groupMetadata = m.isGroup ? await conn.groupMetadata(from) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(numBot) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false
const isBanned = m.isGroup ? blockList.includes(userSender) : false
const isPremium = m.isGroup ? premium.includes(userSender) : false
const who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
const thumb = ftkim
const fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${userSender.split('@')[0]}:${userSender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
const fake = { contextInfo: { forwardedNewsletterMessageInfo: { newsletterJid: '120363160031023229@newsletter', serverMessageId: '', newsletterName: 'texto bonis' }, mentionedJid: null, forwardingScore: 9999999, isForwarded: true, "externalAdReply": {"showAdAttribution": true, "containsAutoReply": true, "title": wm, "body": vs, "previewType": "PHOTO", thumbnail: ftkim, sourceUrl: redes}}}
const ftroli ={key: {fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "status@broadcast"}, "message": {orderMessage: {itemCount: 2022,status: 200, thumbnail: thumb, surface: 200, message: "ɴᴏᴠᴀʙᴏᴛ-ᴍᴅ", orderTitle: "sᴜᴘᴇʀ ʙᴏᴛ ᴅᴇ ᴡʜᴀᴛsᴀᴘᴘ", sellerJid: '0@s.whatsapp.net'}}, contextInfo: {"forwardingScore":999,"isForwarded":true},sendEphemeral: true}
const fdoc = {key : {participant : '0@s.whatsapp.net', ...(from ? { remoteJid: `status@broadcast` } : {}) },message: {documentMessage: {title: botname, jpegThumbnail: null}}}

 // ═════════════𓊈『 MENSAJES 』𓊉═════════════
const reply = (text) => {
m.reply(text)} // Enviar una respuesta
const sendAdMessage = (text, title, body, image, url) => { conn.sendMessage(from, {text: text, contextInfo: { externalAdReply: { title: title, body: body, mediaUrl: url, sourceUrl: url, previewType: 'PHOTO', showAdAttribution: true, thumbnail: image, sourceUrl: url }}}, {})}
const sendImage = ( image, caption ) => { conn.sendMessage(from, { image: image, caption: caption }, { quoted: m })}
const sendImageAsUrl = ( url, caption ) => { conn.sendMessage(from, { image:  {url: url }, caption: caption }, { quoted: m })}
	
// ═════════════𓊈『 TIPOS DE MENSAJES Y CITADOS 』𓊉═════════════
const isAudio = type == 'audioMessage' 
const isSticker = type == 'stickerMessage' 
const isContact = type == 'contactMessage' 
const isLocation = type == 'locationMessage'  
const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
const isQuotedDocument = type === 'extendedTextMessage' && content.includes('documentMessage')
const isQuotedMsg = type === 'extendedTextMessage' && content.includes('Message') 
const isViewOnce = (type === 'viewOnceMessage') 

/*// ═════════════𓊈『 CONSOLA 』𓊉═════════════	
if (m.message) {
console.log(chalk.bold.magenta(' ༺  🍓  𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🍓 ༻'), 
chalk.bold.cyanBright(`\n┏━━━━━━━━━━━━━━━━━━━━━━━━┅┅\n┃🏷️  +${conn.user.id.split("@")[0]}`), 
chalk.bold.yellow(`${lenguaje.Bio.fecha}`) + chalk.yellow(moment(t * 1000).tz(place).format('DD/MM/YY'),	
chalk.bold.red(`${lenguaje.Bio.hora}`) + chalk.red(moment(t * 1000).tz(place).format('HH:mm:ss'),
chalk.bold.magenta(`${lenguaje.Bio.usuario}`) + chalk.magenta(pushname) + '  ➜ ', gradient.rainbow(userSender), 
m.isGroup ? chalk.bold.yellow(`${lenguaje.Bio.grupo}`) + chalk.yellow(groupName) + '  ❥ ': chalk.bold.yellow(`${lenguaje.Bio.priv}`), 
chalk.bold.cyanBright('\n┃') + chalk.bold.white(`${lenguaje.Bio.mensaje}${msgs(m.text)}`) + chalk.bold.cyanBright(`\n┗━━━━━━━━━━━━━━━━━━━━━━━━┅┅\n`)
)))}*/
 
switch (command) { 
  case 'test':
    return reply('si sirve') 
  break

 // ═════════════𓊈『 OWNER 』𓊉═════════════
default:
if (budy.startsWith('>')) {
if (!owner) return reply(mess.owner)
try {
return reply(JSON.stringify(eval(budy.slice(2)), null, '\t'))
} catch (e) {
e = String(e)
reply(e)
}}
if (budy.startsWith('=>')) {
if (!owner) return reply(mess.owner)
try {
return reply(JSON.stringify(eval(`(async () => { ${budy.slice(3)} })()`), null, '\t'))  
} catch (e) {
e = String(e)
reply(e)
}}
if (budy.startsWith('$')) {
if (!owner) return reply(mess.owner) 
try {
return reply(String(execSync(budy.slice(2), { encoding: 'utf-8' })))
} catch (err) { 
console.log(util.format(err))  
 
if (isCmd && budy.toLowerCase() != undefined) {
if (m.chat.endsWith('broadcast')) return
if (m.isBaileys) return
let msgs = global.db.data.database
if (!(budy.toLowerCase() in msgs)) return
conn.copyNForward(m.chat, msgs[budy.toLowerCase()], true)
}
  
// ═════════════𓊈『 REPORTE/ERRORS 』𓊉═════════════
let e = String(err) 
conn.sendMessage("573173090446@s.whatsapp.net", { text: "Hola Creador/desarrollador, parece haber un error, por favor arreglarlo 🥲\n\n" + util.format(e), 
contextInfo:{forwardingScore: 9999999, isForwarded: false }})
process.on('uncaughtException', function (err) {
console.log('Caught exception: ', err)})}}}}
 
