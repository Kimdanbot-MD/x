import {
    areJidsSameUser,
    generateWAMessage,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    downloadContentFromMessage,
    makeInMemoryStore,
    jidDecode,
    proto
} from '@whiskeysockets/baileys';
import fs from 'node:fs';
import fsp from 'node:fs/promises';
import axios from 'axios';
import pino from 'pino';
import moment from 'moment-timezone';
import { sizeFormatter } from 'human-readable';
import Jimp from 'jimp';
import FileType from "file-type";
import path from "node:path";
import PhoneNumber from 'awesome-phonenumber';
import { execSync, exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import util from 'node:util';

// Marcador para funciones de un posible 'functions2.js'.
// import { imageToWebp, videoToWebp, writeExifImg, writeExifVid, toAudio } from './functions2.js';
const functions2Available = false; 
const imageToWebp = async (buffer) => { if (!functions2Available) { console.warn("Función 'imageToWebp' no disponible (functions2.js faltante)"); return buffer;} throw new Error("imageToWebp no implementada"); };
const videoToWebp = async (buffer) => { if (!functions2Available) { console.warn("Función 'videoToWebp' no disponible (functions2.js faltante)"); return buffer;} throw new Error("videoToWebp no implementada"); };
const writeExifImg = async (buffer, options) => { if (!functions2Available) { console.warn("Función 'writeExifImg' no disponible (functions2.js faltante)"); return buffer;} throw new Error("writeExifImg no implementada"); };
const writeExifVid = async (buffer, options) => { if (!functions2Available) { console.warn("Función 'writeExifVid' no disponible (functions2.js faltante)"); return buffer;} throw new Error("writeExifVid no implementada"); };
const toAudio = async (buffer, ext) => { if (!functions2Available) { console.warn("Función 'toAudio' no disponible (functions2.js faltante)"); return { data: buffer, filename: `audio_fallback.${ext}`};} throw new Error("toAudio no implementada"); };


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function pickRandom(list) {
    if (!list || list.length === 0) return undefined;
    return list[Math.floor(Math.random() * list.length)];
}

export async function getBuffer(url, options = {}) {
    try {
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1,
                ...(options.headers || {}),
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (e) {
        console.error(`Error en getBuffer para URL ${url}:`, e.message);
        return null;
    }
}

export const getUserProfilePic = async (kim, sender) => {
    try {
        const userProfilePicUrl = await kim.profilePictureUrl(sender, "image");
        return await getBuffer(userProfilePicUrl);
    } catch (e) {
        console.warn(`No se pudo obtener la foto de perfil para ${sender}. Usando fallback.`, e.message);
        try {
            const fallbackImagePath = path.join(__dirname, '../../media/Menu1.jpg'); // Asume que 'media' está dos niveles arriba de 'Kim/utils'
            if (fs.existsSync(fallbackImagePath)) {
                return fs.readFileSync(fallbackImagePath);
            }
            console.warn("Archivo de imagen de fallback no encontrado en:", fallbackImagePath);
            return null;
        } catch (fallbackError) {
            console.error("Error leyendo imagen de fallback:", fallbackError);
            return null;
        }
    }
};

export const getUserBio = async (kim, sender) => {
    try {
        const statusData = await kim.fetchStatus(sender);
        return statusData.status || "";
    } catch {
        return "";
    }
};

async function downloadMediaMessagePriv(messageContent, messageType) { // Renombrada para evitar colisión con la que se adjunta a kim
    const stream = await downloadContentFromMessage(messageContent, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer;
}
export { downloadMediaMessagePriv as downloadMediaMessage };


export const bytesToSize = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getSizeMedia = (media) => {
    return new Promise((resolve, reject) => {
        if (typeof media === 'string' && isUrl(media)) { // Usar la función isUrl definida
            axios.get(media, { responseType: 'stream' })
                .then((res) => {
                    const length = parseInt(res.headers['content-length']);
                    if (!isNaN(length)) {
                        resolve(bytesToSize(length, 2));
                    } else {
                        resolve('Tamaño desconocido (sin content-length)');
                    }
                })
                .catch(err => reject(`Error obteniendo tamaño de URL: ${err.message}`));
        } else if (Buffer.isBuffer(media)) {
            const length = Buffer.byteLength(media);
            resolve(bytesToSize(length, 2));
        } else {
            reject('Entrada no válida para getSizeMedia (se esperaba URL o Buffer).');
        }
    });
};

export const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000);

export function msToTime(duration) {
    let milliseconds = parseInt((duration % 1000) / 100);
    let seconds = Math.floor((duration / 1000) % 60);
    let minutes = Math.floor((duration / (1000 * 60)) % 60);
    let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours.toString();
    minutes = (minutes < 10) ? "0" + minutes : minutes.toString();
    seconds = (seconds < 10) ? "0" + seconds : seconds.toString();

    return `${hours} Horas ${minutes} Minutos ${seconds} Segundos`;
}

export const generateMessageTag = (epoch) => {
    let tag = unixTimestampSeconds().toString();
    if (epoch) {
        tag += '.--' + epoch;
    }
    return tag;
};

export const processTime = (timestamp, now) => {
    return moment.duration(now - moment(timestamp * 1000)).asSeconds();
};

export const getRandom = (ext = '') => {
    return `${Math.floor(Math.random() * 100000000)}${ext}`;
};

export const fetchJson = async (url, options = {}) => {
    try {
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
                ...(options.headers || {}),
            },
            ...options
        });
        return res.data;
    } catch (err) {
        console.error(`Error en fetchJson para URL ${url}:`, err.message);
        return null;
    }
};

export const runtime = function(seconds) {
    seconds = Number(seconds);
    if (isNaN(seconds) || seconds < 0) return "00:00:00:00";
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor(seconds % (3600 * 24) / 3600);
    const m = Math.floor(seconds % 3600 / 60);
    const s = Math.floor(seconds % 60);

    const dDisplay = d.toString().padStart(2, '0');
    const hDisplay = h.toString().padStart(2, '0');
    const mDisplay = m.toString().padStart(2, '0');
    const sDisplay = s.toString().padStart(2, '0');
    return `${dDisplay}:${hDisplay}:${mDisplay}:${sDisplay}`;
};

export const clockString = function(seconds) {
    seconds = Number(seconds);
    const h = isNaN(seconds) ? '--' : Math.floor(seconds % (3600 * 24) / 3600);
    const m = isNaN(seconds) ? '--' : Math.floor(seconds % 3600 / 60);
    const s = isNaN(seconds) ? '--' : Math.floor(seconds % 60);
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
};

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const isUrl = (url) => {
    if (typeof url !== 'string') return false;
    try {
        new URL(url);
        return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/.test(url);
    } catch (_) {
        return false;
    }
};

const execAsync = util.promisify(exec);
const tempBaseDir = path.join(__dirname, '../../temp'); // Directorio base para archivos temporales

export const buffergif = async (imageBuffer) => {
    const filenameBase = getRandom();
    const tempInputPath = path.join(tempBaseDir, `${filenameBase}.gif`);
    const tempOutputPath = path.join(tempBaseDir, `${filenameBase}.mp4`);

    try {
        await fsp.mkdir(tempBaseDir, { recursive: true });
        await fsp.writeFile(tempInputPath, imageBuffer);
        
        await execAsync(`ffmpeg -i ${tempInputPath} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ${tempOutputPath}`);
        
        const outputBuffer = await fsp.readFile(tempOutputPath);
        return outputBuffer;
    } catch (error) {
        console.error("Error en buffergif:", error);
        throw error;
    } finally {
        try { await fsp.unlink(tempInputPath); } catch (e) { /* ignore */ }
        try { await fsp.unlink(tempOutputPath); } catch (e) { /* ignore */ }
    }
};

export const getTime = (format, date) => {
    const lang = global.lenguaje?.formatLocale || 'es';
    const tz = global.place || 'America/Bogota';
    if (date) {
        return moment(date).locale(lang).tz(tz).format(format);
    } else {
        return moment().tz(tz).locale(lang).format(format);
    }
};

export const formatDate = (timestamp, locale) => {
    const lang = locale || global.lenguaje?.formatLocale || 'es';
    const tz = global.place || 'America/Bogota';
    const d = new Date(timestamp); // timestamp debería ser en ms
    return d.toLocaleDateString(lang, {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        timeZone: tz
    });
};

export const tanggal = (timestamp) => {
    const tgl = new Date(timestamp); // timestamp debería ser en ms
    const myMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const myDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    
    const day = tgl.getDate();
    const bulan = tgl.getMonth(); // Es un índice 0-11
    const thisDayName = myDays[tgl.getDay()]; // getDay() devuelve 0 para Domingo, 1 para Lunes...
    const year = tgl.getFullYear();
        
    return `${thisDayName}, ${day} de ${myMonths[bulan]} de ${year}`;
};

export const formatp = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
});

export const jsonformat = (obj) => {
    return JSON.stringify(obj, null, 2);
};

export const generateProfilePicture = async (buffer) => {
    try {
        const image = await Jimp.read(buffer);
        const size = Math.min(image.getWidth(), image.getHeight());
        const x = (image.getWidth() - size) / 2;
        const y = (image.getHeight() - size) / 2;
        const cropped = image.crop(x, y, size, size);

        return {
            img: await cropped.resize(720, 720).getBufferAsync(Jimp.MIME_JPEG),
            preview: await cropped.resize(128, 128).getBufferAsync(Jimp.MIME_JPEG)
        };
    } catch (error) {
        console.error("Error en generateProfilePicture:", error);
        return { img: null, preview: null };
    }
};

export const getGroupAdmins = (participants = []) => {
    return participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.id);
};

export function smsg(kim, m, storeInstance) {
    if (!m) return m;

    let M = proto.WebMessageInfo;
    if (m.key) { // Si ya es un WebMessageInfo parcial
        m = M.fromObject(m); // Completarlo a un objeto proto completo
    } else if (! (m instanceof M) && Object.keys(m).length > 0 ) { // Si es solo el contenido del mensaje (ej. m.message.imageMessage)
        // Esto es más complicado, smsg espera un WebMessageInfo o algo que pueda convertir en uno.
        // Si 'm' es solo el contenido, necesitamos construir la estructura de WebMessageInfo alrededor.
        // Esta rama es difícil de generalizar sin saber exactamente qué forma tiene 'm'.
        // Por ahora, asumimos que 'm' es usualmente un WebMessageInfo.
         console.warn("smsg recibió un objeto 'm' que no es WebMessageInfo y no tiene 'key'. Se intentará usar directamente.");
    }


    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = !!(m.id && (m.id.startsWith('BAE5') || m.id.startsWith('3EB0')));
        m.chat = kim.decodeJid(m.key.remoteJid);
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat ? m.chat.endsWith('@g.us') : false;
        m.sender = kim.decodeJid(m.fromMe && kim.user?.id || m.key.participant || m.chat || '');
        m.device = m.key.id?.length > 21 ? 'Android' : m.key.id?.substring(0, 2) === '3A' ? 'iOS' : 'WhatsApp Web';
    }

    if (m.message) {
        const getMsgType = (message) => {
             if (!message) return null;
             const type = Object.keys(message)[0];
             return type === 'senderKeyDistributionMessage' && message[type]?.groupId ? 'groupUpdate' : type;
        };
        m.mtype = getMsgType(m.message);
        m.msg = m.message[m.mtype];

        if (m.mtype === 'ephemeralMessage' && m.message.ephemeralMessage?.message) {
            const innerMsg = m.message.ephemeralMessage.message;
            const smsgResult = smsg(kim, { key: m.key, message: innerMsg, pushName: m.pushName, messageTimestamp: m.messageTimestamp }, storeInstance);
            m.mtype = smsgResult.mtype;
            m.msg = smsgResult.msg;
            m.message = innerMsg; // Actualizar m.message al contenido real
            m.body = smsgResult.body;
            m.text = smsgResult.text;
        }
        
        if (m.mtype === 'protocolMessage' && m.msg?.key) {
            if (m.msg.type === proto.ProtocolMessage.Type.REVOKE && kim.ev) {
                 kim.ev.emit('messages.delete', { keys: [m.msg.key] });
            }
        }

        let text = '';
        const msgContent = m.msg || {}; // Usar msgContent para evitar repetir m.message[m.mtype]
        if (m.mtype === 'conversation') {
            text = m.message.conversation;
        } else if (msgContent.text !== undefined) { // Para extendedTextMessage, etc.
            text = msgContent.text;
        } else if (msgContent.caption !== undefined) { // Para imageMessage, videoMessage
            text = msgContent.caption;
        } else if (m.mtype === 'listResponseMessage' && msgContent.singleSelectReply) {
            text = msgContent.singleSelectReply.selectedRowId || msgContent.title;
        } else if (m.mtype === 'buttonsResponseMessage' && msgContent.selectedButtonId) {
            text = msgContent.selectedButtonId || msgContent.selectedDisplayText;
        } else if (m.mtype === 'templateButtonReplyMessage' && msgContent.selectedId) {
            text = msgContent.selectedId || msgContent.selectedDisplayText;
        }
        m.body = text || ''; // Asegurar que body siempre sea string
        m.text = text || ''; // Asegurar que text siempre sea string

        let quoted = m.quoted = null;
        const contextInfo = msgContent.contextInfo || m.message.extendedTextMessage?.contextInfo || m.message.ephemeralMessage?.message?.extendedTextMessage?.contextInfo;

        if (contextInfo && contextInfo.quotedMessage) {
            const quotedProto = M.fromObject({
                key: {
                    remoteJid: m.chat,
                    fromMe: areJidsSameUser(contextInfo.participant, kim.user?.id),
                    id: contextInfo.stanzaId,
                    participant: m.isGroup ? contextInfo.participant : undefined
                },
                message: contextInfo.quotedMessage,
                pushName: m.pushName, // Heredar pushName puede no ser lo ideal para el citado
                messageTimestamp: m.messageTimestamp // O el timestamp del mensaje citado si estuviera disponible
            });
            quoted = m.quoted = smsg(kim, quotedProto, storeInstance);
        }

        m.mentionedJid = contextInfo?.mentionedJid || [];
    }
    
    if (m.msg?.url && (m.mtype === 'imageMessage' || m.mtype === 'videoMessage' || m.mtype === 'audioMessage' || m.mtype === 'stickerMessage' || m.mtype === 'documentMessage')) {
        m.download = () => downloadMediaMessagePriv(m.msg, m.mtype.replace('Message', ''));
    }

    m.reply = (text, chatId, options = {}) => {
        const targetJid = chatId || m.chat;
        const mentions = parseMention(String(text)); // parseMention está definida más abajo y en MessageHandler
        return kim.sendMessage(targetJid, { text: String(text), mentions, ...options }, { quoted: m, ...options });
    };

    m.react = (reactionText) => {
        if (!m.key) return Promise.resolve(null); // No se puede reaccionar si no hay clave de mensaje
        return kim.sendMessage(m.chat, { react: { text: reactionText, key: m.key } });
    };

    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => {
        return kim.copyNForward(jid, m, forceForward, { readViewOnce: true, ...options });
    };
    
    m.copy = () => {
        const mCopy = M.fromObject(M.toObject(m));
        return smsg(kim, mCopy, storeInstance);
    };

    return m;
}

export const getFile = async (PATH, saveToFile = false, tempDir = path.join(__dirname, '../../temp')) => {
    let res; let filename;
    let dataBuffer;

    if (Buffer.isBuffer(PATH)) {
        dataBuffer = PATH;
    } else if (PATH instanceof ArrayBuffer) {
        dataBuffer = Buffer.from(PATH);
    } else if (/^data:.*?\/.*?;base64,/i.test(PATH)) {
        dataBuffer = Buffer.from(PATH.split(',')[1], 'base64');
    } else if (isUrl(PATH)) { // Usa la función isUrl definida
        const response = await axios.get(PATH, { responseType: 'arraybuffer' });
        dataBuffer = response.data; // axios devuelve el buffer en data para arraybuffer
        res = response; // Guardar la respuesta completa por si se necesita (ej. headers)
    } else if (fs.existsSync(PATH)) {
        filename = PATH;
        dataBuffer = await fsp.readFile(PATH);
    } else if (typeof PATH === 'string') {
        dataBuffer = Buffer.from(PATH); // Asumir que es texto si es string y no es URL/ruta
    } else {
        dataBuffer = Buffer.alloc(0);
    }

    if (!Buffer.isBuffer(dataBuffer)) throw new TypeError('El resultado no es un buffer');
    
    const type = await FileType.fromBuffer(dataBuffer) || {
        mime: 'application/octet-stream',
        ext: '.bin',
    };

    if (dataBuffer.length > 0 && saveToFile && !filename) {
        await fsp.mkdir(tempDir, { recursive: true });
        filename = path.join(tempDir, `${Date.now()}.${type.ext}`);
        await fsp.writeFile(filename, dataBuffer);
    }
    
    return {
        res,
        filename,
        mime: type.mime,
        ext: type.ext,
        data: dataBuffer,
        async deleteFile() { // Hacer deleteFile asíncrono
            if (filename && (await fsp.stat(filename).catch(() => false))) {
                return fsp.unlink(filename);
            }
        },
    };
};

export function serializeKim(kimInstance) {
    if (!kimInstance || typeof kimInstance !== 'object') {
        console.warn("serializeKim: kimInstance no válido proporcionado.");
        return;
    }

    kimInstance.decodeJid = (jid) => {
        if (!jid || typeof jid !== 'string') return jid;
        if (/:\d+@/gi.test(jid)) {
            const decode = jidDecode(jid) || {};
            return decode.user && decode.server && `${decode.user}@${decode.server}` || jid;
        }
        return jid;
    };

    kimInstance.getName = async (jid, withoutContact = false) => { // Hacerla async por groupMetadata
        const id = kimInstance.decodeJid(jid);
        if (!id) return '';
        
        let v;
        if (id.endsWith("@g.us")) {
            v = store.contacts[id] || {};
            if (!(v.name || v.subject)) {
                try {
                    v = await kimInstance.groupMetadata(id) || {};
                } catch (e) { v = {}; }
            }
            return v.name || v.subject || new PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international');
        } else {
            v = id === '0@s.whatsapp.net' ? { id, name: 'WhatsApp' }
              : (kimInstance.user?.id && id === kimInstance.decodeJid(kimInstance.user.id)) ? kimInstance.user
              : (store.contacts[id] || {});
            return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || new PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international');
        }
    };
    
    kimInstance.sendText = (jid, text, quoted = '', options = {}) => {
        const mentions = parseMention(String(text));
        return kimInstance.sendMessage(jid, { text: String(text), mentions, ...options }, { quoted, ...options });
    };

    kimInstance.sendTextWithMentions = async (jid, text, quoted, options = {}) => { // Ya definida como export normal, esta es redundante si kim.parseMention existe
        return kimInstance.sendMessage(jid, { text: text, contextInfo: { mentionedJid: kimInstance.parseMention(text) }, ...options }, { quoted });
    };

    kimInstance.sendImage = async (jid, pathOrBuffer, caption = '', quoted = '', options = {}) => {
        const bufferData = await getFile(pathOrBuffer); // Usar getFile para obtener el buffer
        if (!bufferData.data || bufferData.data.length === 0) throw new Error('No se pudo obtener el buffer de la imagen.');
        return await kimInstance.sendMessage(jid, { image: bufferData.data, caption: caption, mimetype: bufferData.mime, ...options }, { quoted, ...options });
    };

    kimInstance.sendVideo = async (jid, pathOrBuffer, caption = '', quoted = '', options = {}) => {
        const bufferData = await getFile(pathOrBuffer);
        if (!bufferData.data || bufferData.data.length === 0) throw new Error('No se pudo obtener el buffer del video.');
        return await kimInstance.sendMessage(jid, { video: bufferData.data, caption: caption, mimetype: options.mimetype || bufferData.mime || 'video/mp4', ...options }, { quoted, ...options });
    };
    
    kimInstance.sendAudio = async (jid, pathOrBuffer, quoted = '', ptt = false, options = {}) => {
        await kimInstance.sendPresenceUpdate('recording', jid);
        const bufferData = await getFile(pathOrBuffer);
        if (!bufferData.data || bufferData.data.length === 0) throw new Error('No se pudo obtener el buffer del audio.');
        return await kimInstance.sendMessage(jid, { audio: bufferData.data, mimetype: options.mimetype || bufferData.mime || 'audio/mpeg', ptt: ptt, ...options }, { quoted, ...options });
    };

    kimInstance.sendImageAsSticker = async (jid, pathOrBuffer, quoted, options = {}) => {
        if (!functions2Available) {
            console.warn("Función sendImageAsSticker deshabilitada: functions2.js (imageToWebp, writeExifImg) no disponible.");
            return kimInstance.sendMessage(jid, {text: (global.mess && global.mess.errorSticker) || "[❗] Función de sticker de imagen no disponible."}, {quoted});
        }
        const buffData = await getFile(pathOrBuffer);
        if (!buffData.data || buffData.data.length === 0) throw new Error('No se pudo obtener el buffer para el sticker.');
        
        let stickerBuffer;
        if (options && (options.packname || options.author)) {
            stickerBuffer = await writeExifImg(buffData.data, options);
        } else {
            stickerBuffer = await imageToWebp(buffData.data);
        }
        return await kimInstance.sendMessage(jid, { sticker: stickerBuffer, ...options }, { quoted });
    };

    kimInstance.sendVideoAsSticker = async (jid, pathOrBuffer, quoted, options = {}) => {
        if (!functions2Available) {
            console.warn("Función sendVideoAsSticker deshabilitada: functions2.js (videoToWebp, writeExifVid) no disponible.");
            return kimInstance.sendMessage(jid, {text: (global.mess && global.mess.errorSticker) || "[❗] Función de sticker de video no disponible."}, {quoted});
        }
        const buffData = await getFile(pathOrBuffer);
        if (!buffData.data || buffData.data.length === 0) throw new Error('No se pudo obtener el buffer para el sticker de video.');

        let stickerBuffer;
        if (options && (options.packname || options.author)) {
            stickerBuffer = await writeExifVid(buffData.data, options);
        } else {
            stickerBuffer = await videoToWebp(buffData.data);
        }
        return await kimInstance.sendMessage(jid, { sticker: stickerBuffer, ...options }, { quoted });
    };
    
    kimInstance.sendFile = async (jid, pathOrBuffer, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        const fileData = await getFile(pathOrBuffer, true, options.tempDir);
        let { data: fileBuffer, mime: mimetype, ext, filename: actualFilename } = fileData;
        
        if (!fileBuffer || fileBuffer.length === 0 ) throw new Error("No se pudo obtener el buffer del archivo en sendFile.");

        let type = '';
        if (options.asSticker || (mimetype === 'image/webp' || (/image/.test(mimetype) && options.asSticker))) {
            type = 'sticker';
            if (functions2Available && type === 'sticker' && mimetype !== 'image/webp') { // Convertir a webp si es sticker y no es webp
                 if(options.packname || options.author) fileBuffer = await writeExifImg(fileBuffer, options);
                 else fileBuffer = await imageToWebp(fileBuffer);
                 mimetype = 'image/webp';
            }
        } else if (options.asImage || (/image/.test(mimetype) && !options.asSticker)) {
            type = 'image';
        } else if (options.asVideo || /video/.test(mimetype)) {
            type = 'video';
        } else if (options.asAudio || /audio/.test(mimetype)) {
            type = 'audio';
            if (ext !== '.opus' && functions2Available) {
                try {
                    const convert = await toAudio(fileBuffer, ext);
                    fileBuffer = convert.data;
                    actualFilename = convert.filename;
                    mimetype = 'audio/opus'; // toAudio debería idealmente devolver opus
                } catch (conversionError) {
                    console.warn("Error convirtiendo a audio opus, enviando como documento:", conversionError);
                    type = 'document'; // Fallback a documento si la conversión falla
                }
            } else if (ext === '.opus') {
                 mimetype = 'audio/ogg; codecs=opus'; // Asegurar mimetype correcto para opus
            }
        } else {
            type = 'document';
        }
        
        if (options.asDocument) type = 'document';
        
        const messageOptions = {
            ...options,
            caption,
            ptt,
            [type]: fileBuffer,
            mimetype,
            fileName: filename || path.basename(actualFilename || `file.${ext}`),
        };
        
        delete messageOptions.asSticker; delete messageOptions.asImage; delete messageOptions.asVideo; delete messageOptions.asAudio; delete messageOptions.asDocument; delete messageOptions.tempDir;

        let sentMsg;
        try {
            sentMsg = await kimInstance.sendMessage(jid, messageOptions, { quoted, ...options });
        } catch (e) {
            console.error("Error en kim.sendFile, intentando enviar como documento si es posible:", e);
            // Si el tipo original falló, intentar enviar como documento genérico si no lo era ya
            if (type !== 'document') {
                try {
                    messageOptions.document = fileBuffer;
                    delete messageOptions[type]; // Eliminar la clave de tipo anterior (image, video, etc.)
                    messageOptions.mimetype = fileData.mime; // Mimetype original del archivo
                    messageOptions.fileName = filename || path.basename(actualFilename || `file.${ext}`);
                    sentMsg = await kimInstance.sendMessage(jid, messageOptions, { quoted, ...options });
                } catch (e2) {
                    console.error("Error en kim.sendFile (fallback a documento):", e2);
                    throw e2;
                }
            } else {
                 throw e;
            }
        } finally {
            if (fileData.deleteFile && actualFilename && actualFilename.includes(path.basename(tempBaseDir))) {
                 await fileData.deleteFile();
            }
        }
        return sentMsg;
    };

    kimInstance.downloadAndSaveMediaMessage = async (message, filenamePrefix = 'media', attachExtension = true) => {
        const M = proto.WebMessageInfo;
        if (!message) throw new Error("Mensaje no proporcionado para descargar.");
        
        let msgToDownload;
        let originalMimeType;

        if (message.message) { // Es un WebMessageInfo completo
            const msgType = Object.keys(message.message)[0];
            msgToDownload = message.message[msgType];
            originalMimeType = msgToDownload?.mimetype;
        } else { // Podría ser ya el contenido del mensaje (ej. m.quoted.message)
             const msgType = Object.keys(message)[0];
             msgToDownload = message[msgType];
             originalMimeType = msgToDownload?.mimetype;
        }
        
        if (!msgToDownload) throw new Error("Contenido del mensaje no encontrado para descargar.");

        const stream = await downloadContentFromMessage(msgToDownload, Object.keys(msgToDownload)[0]?.replace('Message', '').toLowerCase());
        let buffer = Buffer.from([]);
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        
        const fileType = await FileType.fromBuffer(buffer);
        const ext = fileType?.ext || (originalMimeType ? originalMimeType.split('/')[1]?.split(';')[0] : 'bin'); // Limpiar posible '; codecs=...'
        
        await fsp.mkdir(tempBaseDir, { recursive: true });
        
        const finalFilename = attachExtension ? `${filenamePrefix}-${Date.now()}.${ext}` : `${filenamePrefix}-${Date.now()}`;
        const filePath = path.join(tempBaseDir, finalFilename);
        
        await fsp.writeFile(filePath, buffer);
        return filePath;
    };

    kimInstance.sendPoll = (jid, name = '', values = [], selectableCount = 1) => {
        if (!name || values.length === 0) throw new Error("Nombre y valores son requeridos para la encuesta.");
        return kimInstance.sendMessage(jid, { poll: { name, values, selectableCount } });
    };

    kimInstance.fakeReply = (jid, caption, fakeNumberJid, fakeCaption, originalMessageContext) => {
        if (!originalMessageContext || !originalMessageContext.chat) {
            console.error("fakeReply requiere un 'originalMessageContext' con 'chat'.");
            return;
        }
        const decodedFakeJid = kimInstance.decodeJid(fakeNumberJid);
        return kimInstance.sendMessage(jid, { text: caption }, {
            quoted: {
                key: {
                    remoteJid: originalMessageContext.chat,
                    fromMe: false, // El mensaje citado no es del bot
                    participant: decodedFakeJid.endsWith('@g.us') ? decodedFakeJid : undefined, // Solo para grupos
                    id: generateMessageTag()
                },
                message: { conversation: fakeCaption }
            }
        });
    };
    
    kimInstance.editMessage = async (chatId, messageId, newText, options = {}) => {
        if (!messageId) throw new Error("Se requiere messageId para editar.");
        // Para editar un mensaje, la clave debe ser la del mensaje original que se está editando,
        // y el 'participant' debe ser el sender original de ese mensaje si es un grupo y el bot no lo envió.
        // Si el bot lo envió, fromMe es true y participant es undefined o el JID del bot.
        // Esta es una simplificación, editar mensajes de otros es más complejo o no posible.
        const editKey = { remoteJid: chatId, id: messageId, fromMe: true, participant: kimInstance.user?.id }; // Asume que el bot edita sus propios mensajes
        return kimInstance.sendMessage(chatId, { text: newText, edit: editKey }, options);
    };
    
    kimInstance.parseMention = (text = '') => { // Definida también como export normal. Consolidar.
        return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net');
    };
    
    // kim.awaitMessage y otras funciones complejas como sendCart, sendPayment, appenTextMessage
    // se omiten aquí para brevedad, pero deberían ser revisadas con la misma lógica:
    // - Usar 'proto' correctamente si fue importado.
    // - Declarar variables.
    // - Asegurar que las dependencias globales (ej. config.botname) estén disponibles o se pasen.

    if (kimInstance.user) {
        kimInstance.user.jid = kimInstance.decodeJid(kimInstance.user.id);
    }
    // La línea kim.user.chat = m.chat; fue eliminada por problemas de alcance.
			}
