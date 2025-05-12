import { getGroupAdmins, isUrl, sleep, generateProfilePicture, parseMention, getRandom } from "../utils/functions.js";
import moment from 'moment-timezone';
import chalk from "chalk";
import gradient from 'gradient-string';
import { CommandHandler } from "../core/CommandHandler.js";

function getMessageType(message) {
    if (message.conversation) return 'conversation';
    if (message.imageMessage) return 'imageMessage';
    if (message.videoMessage) return 'videoMessage';
    if (message.extendedTextMessage) return 'extendedTextMessage';
    if (message.stickerMessage) return 'stickerMessage';
    if (message.audioMessage) return 'audioMessage';
    if (message.documentMessage) return 'documentMessage';
    if (message.contactMessage) return 'contactMessage';
    if (message.locationMessage) return 'locationMessage';
    return Object.keys(message)[0];
}

export class MessageHandler {
    constructor(kim, store, commandHandlerInstance) {
        this.kim = kim;
        this.store = store;
        this.commandHandler = commandHandlerInstance || new CommandHandler(kim);
    }

    async procesarMensajes(chatUpdate) {
        const m = chatUpdate.messages[0];
        if (!m || !m.message) return;
        if (m.key && m.key.remoteJid === 'status@broadcast') return;
        if (m.key.id?.startsWith('BAE5') && m.key.id?.length === 16) return;

        m.chat = m.key.remoteJid;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = m.key.fromMe ? this.kim.user.id : (m.isGroup ? m.key.participant : m.key.remoteJid);
        m.pushName = m.pushName || "Usuario";
        m.mtype = getMessageType(m.message);

        const body = this.getBody(m);
        if (body === null || body === undefined) return;

        const currentPrefix = Array.isArray(global.prefix) ? global.prefix[0] : global.prefix || '.';
        const isCmd = typeof body === 'string' && body.startsWith(currentPrefix);
        const command = isCmd ? body.slice(currentPrefix.length).trim().split(/ +/).shift().toLowerCase() : '';
        m.text = body;

        if (isCmd && command) {
            console.log(chalk.cyanBright(`[MessageHandler] Comando recibido: "${command}" de ${m.sender} en ${m.chat}`));
            await this.commandHandler.handleCommand(m, command);
        }

        const from = m.chat;
        const type = m.mtype;

        let quotedMsgInfo = null;
        if (m.message.extendedTextMessage?.contextInfo?.quotedMessage) {
            quotedMsgInfo = {
                message: m.message.extendedTextMessage.contextInfo.quotedMessage,
                key: {
                    remoteJid: m.chat,
                    id: m.message.extendedTextMessage.contextInfo.stanzaId,
                    participant: m.message.extendedTextMessage.contextInfo.participant
                }
            };
            quotedMsgInfo.mtype = getMessageType(quotedMsgInfo.message);
            quotedMsgInfo.text = this.getBody(quotedMsgInfo);
        }
        m.quoted = quotedMsgInfo;

        const mime = quotedMsgInfo ? (getMessageType(quotedMsgInfo.message) === 'imageMessage' ? 'image/jpeg' : getMessageType(quotedMsgInfo.message) === 'videoMessage' ? 'video/mp4' : '') : (m.mtype === 'imageMessage' ? 'image/jpeg' : m.mtype === 'videoMessage' ? 'video/mp4' : '');
        const isMedia = /image|video|sticker|audio/.test(m.mtype);

        const groupMetadata = m.isGroup ? await this.kim.groupMetadata(from).catch(() => null) : null;
        const groupName = m.isGroup && groupMetadata ? groupMetadata.subject : '';
        const participants = m.isGroup && groupMetadata ? groupMetadata.participants : [];
        const groupAdmins = m.isGroup ? getGroupAdmins(participants) : [];
        const botJid = this.kim.user?.id;
        const isBotAdmin = m.isGroup && botJid ? groupAdmins.some(admin => admin.id === botJid) : false;
        const isSenderAdmin = m.isGroup ? groupAdmins.some(admin => admin.id === m.sender) : false;
        m.isBotAdmin = isBotAdmin;
        m.isSenderAdmin = isSenderAdmin;

        if (m.message && global.lenguaje && global.lenguaje.Bio) {
            const timestamp = typeof m.messageTimestamp === 'number' ? m.messageTimestamp : (typeof m.messageTimestamp === 'object' && m.messageTimestamp?.low) ? m.messageTimestamp.low : Date.now() / 1000;
            console.log(chalk.bold.magenta(' ༺  🍓  𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🍓  ༻ '),
                chalk.bold.cyanBright(`\n┏━━━━━━━━━━━━━━━━━━━━━━━━┅┅\n┃🏷️  ~${botJid?.split("@")[0] || 'BOT'}`),
                chalk.bold.yellow(`${global.lenguaje.Bio.fecha || "Fecha:"}`) + chalk.yellow(moment(timestamp * 1000).tz(global.place || 'America/Bogota').format('DD/MM/YY')),
                chalk.bold.red(`${global.lenguaje.Bio.hora || "Hora:"}`) + chalk.red(moment(timestamp * 1000).tz(global.place || 'America/Bogota').format('HH:mm:ss')),
                chalk.bold.magenta(`${global.lenguaje.Bio.usuario || "Usuario:"}`) + chalk.magenta(m.pushName) + '  ➜ ', gradient.rainbow(m.sender)),
                m.isGroup ? chalk.bold.yellow(`${global.lenguaje.Bio.grupo || "Grupo:"}`) + chalk.yellow(groupName) + '  ❥ ' : chalk.bold.yellow(`${global.lenguaje.Bio.priv || "Privado:"}`),
                chalk.bold.cyanBright('\n┃') + chalk.bold.white(`${global.lenguaje.Bio.mensaje || "Mensaje:"}${this.msgs(body)}`) + chalk.bold.cyanBright(`\n┗━━━━━━━━━━━━━━━━━━━━━━━━┅┅\n`));
        }
    }

    getBody(mOrQuoted) {
        if (!mOrQuoted || !mOrQuoted.message) return null;
        const message = mOrQuoted.message;
        const type = mOrQuoted.mtype || getMessageType(message);

        if (type === 'conversation') return message.conversation;
        if (type === 'imageMessage') return message.imageMessage?.caption;
        if (type === 'videoMessage') return message.videoMessage?.caption;
        if (type === 'extendedTextMessage') return message.extendedTextMessage?.text;
        return null;
    }

    msgs(messageContent) {
        if (typeof messageContent === 'string') {
            if (messageContent.length >= 100) {
                return `${messageContent.substr(0, 100)}...`;
            }
            return messageContent;
        }
        return "[Contenido no textual o vacío]";
    }

    async procesarMensajesEditados(updateMessages) {
        if (!Array.isArray(updateMessages) || updateMessages.length === 0) return;
        const m = updateMessages[0];
        console.log(chalk.blueBright("[MessageHandler] Mensaje editado detectado:"), m);
    }
}
