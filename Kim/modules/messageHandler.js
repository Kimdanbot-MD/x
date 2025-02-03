import { getGroupAdmins, isUrl, sleep, generateProfilePicture, parseMention, getRandom } from "../utils/fuctions.js";
import moment from 'moment-timezone';
import chalk from "chalk";
import gradient from 'gradient-string';
import { CommandHandler } from "../core/CommandHandler.js";

export class MessageHandler {
  constructor(kim, store) {
    this.kim = kim;
    this.store = store;
    this.commandHandler = new CommandHandler(kim);
  }

  async procesarMensajes(chatUpdate) {
    const m = chatUpdate.messages[0];
    if (!m.message) return;
    if (m.key && m.key.remoteJid === 'status@broadcast') return;
    if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return;

    const body = this.getBody(m);
    const isCmd = body.startsWith(prefix);
    const command = isCmd ? body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase() : '';

    if (isCmd) {
      await this.commandHandler.handleCommand(m, command);
    }

    // ═════════════𓊈『 ATRIBUTOS DEL MENSAJE 』𓊉═════════════ 
    const from = m.chat;
    const type = m.mtype;
    const pushname = m.pushName || "Sin nombre";
    const userSender = m.sender;
    const quoted = m.quoted ? m.quoted : m;
    const mime = (quoted.msg || quoted).mimetype || '';
    const isMedia = /image|video|sticker|audio/.test(mime);

    // ═════════════𓊈『 INFORMACIÓN DEL GRUPO 』𓊉═════════════ 
    const groupMetadata = m.isGroup ? await this.kim.groupMetadata(from) : '';
    const groupName = m.isGroup ? groupMetadata.subject : '';
    const participants = m.isGroup ? await groupMetadata.participants : '';
    const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : '';
    const isBotAdmins = m.isGroup ? groupAdmins.includes(this.kim.user.id.split(':')[0] + '@s.whatsapp.net') : false;
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(userSender) : false;


    // ═════════════𓊈『 CONSOLA 』𓊉═════════════ 
    if (m.message) {
      console.log(chalk.bold.magenta(' ༺  🍓  𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🍓  ༻ '),
        chalk.bold.cyanBright(`\n┏━━━━━━━━━━━━━━━━━━━━━━━━┅┅\n┃🏷️  +${this.kim.user.id.split("@")[0]}`),
        chalk.bold.yellow(`${lenguaje.Bio.fecha}`) + chalk.yellow(moment(m.messageTimestamp * 1000).tz(place).format('DD/MM/YY')),
        chalk.bold.red(`${lenguaje.Bio.hora}`) + chalk.red(moment(m.messageTimestamp * 1000).tz(place).format('HH:mm:ss')),
        chalk.bold.magenta(`${lenguaje.Bio.usuario}`) + chalk.magenta(pushname) + '  ➜ ', gradient.rainbow(userSender)),
        m.isGroup ? chalk.bold.yellow(`${lenguaje.Bio.grupo}`) + chalk.yellow(groupName) + '  ❥ ' : chalk.bold.yellow(`${lenguaje.Bio.priv}`),
        chalk.bold.cyanBright('\n┃') + chalk.bold.white(`${lenguaje.Bio.mensaje}${this.msgs(m.text)}`) + chalk.bold.cyanBright(`\n┗━━━━━━━━━━━━━━━━━━━━━━━━┅┅\n`);
    }
  }

  getBody(m) {
    if (m.mtype === 'conversation') return m.message.conversation;
    if (m.mtype === 'imageMessage') return m.message.imageMessage?.caption;
    if (m.mtype === 'videoMessage') return m.message.videoMessage?.caption;
    if (m.mtype === 'extendedTextMessage') return m.message.extendedTextMessage?.text;
    return '';
  }

  msgs(message) {
    if (message.length >= 500) {
      return `${message.substr(0, 500)}...`;
    } else {
      return message;
    }
  }
}
