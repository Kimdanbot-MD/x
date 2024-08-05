//import { imageToWebp, videoToWebp, writeExifImg, writeExifVid, toAudio } from './functions2.js'
import * as Baileys from '@whiskeysockets/baileys';
const { areJidsSameUser, generateWAMessage, prepareWAMessageMedia, generateWAMessageFromContent, downloadContentFromMessage, makeInMemoryStore, jidDecode, proto } = Baileys;
import fs from 'fs'
import axios from 'axios'
import pino from 'pino'
import moment from 'moment-timezone'
import sizeFormatter from 'human-readable'
import jimp from 'jimp'
import FileType from "file-type"
import path from "path"
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
import PhoneNumber from 'awesome-phonenumber'
import es from './idiomas/es.js' //Español 
import en from './idiomas/en.js' //Ingles 

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)];
};

//información del usuario
exports.getUserProfilePic = async (conn, sender) => {
  try {
    const userProfilePicUrl = await conn.profilePictureUrl(sender, "image");
    return await getBuffer(userProfilePicUrl);
  } catch {
    return fs.readFileSync("./media/Menu1");
  };
};

exports.getUserBio = async (conn, sender) => {
  try {
    const statusData = await conn.fetchStatus(sender);
    return statusData.status;
  } catch {
    return "";
  };
};


const downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
        let extension = mime.split('/')[1]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
	}
        
	return buffer
}

exports.getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.get(path)
            .then((res) => {
                let length = parseInt(res.headers['content-length'])
                let size = exports.bytesToSize(length, 3)
                if(!isNaN(length)) resolve(size)
            })
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path)
            let size = exports.bytesToSize(length, 3)
            if(!isNaN(length)) resolve(size)
        } else {
            reject('error')
        }
    })
}

const unixTimestampSeconds = (date = new Date()) => Math.floor(date.getTime() / 1000)

exports.unixTimestampSeconds = unixTimestampSeconds

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + " Horas " + minutes + " Minutos"
}

exports.msToTime = msToTime

exports.generateMessageTag = (epoch) => {
    let tag = (0, exports.unixTimestampSeconds)().toString();
    if (epoch)
        tag += '.--' + epoch; // attach epoch if provided
    return tag;
}

exports.processTime = (timestamp, now) => {
	return moment.duration(now - moment(timestamp * 1000)).asSeconds()
}

exports.getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}

export function getBuffer(url, options) {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		return e
	}
}

exports.fetchBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "GET",
			url,
			headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (err) {
		return err
	}
}

exports.fetchJson = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}

exports.runtime = function(seconds) {
	seconds = Number(seconds);
	var d = Math.floor(seconds / (3600 * 24));
	var h = Math.floor(seconds % (3600 * 24) / 3600);
	var m = Math.floor(seconds % 3600 / 60);
	var s = Math.floor(seconds % 60);
	var dDisplay = d < 10 ? String("0" + d) : d >= 10 ? String(d) : "00";
	var hDisplay = h < 10 ? String("0" + h) : h >= 10 ? String(h) : "00";
	var mDisplay = m < 10 ? String("0" + m) : m >= 10 ? String(m) : "00";
	var sDisplay = s < 10 ? String("0" + s) : s > 10 ? String(s) : "00";
	return dDisplay + ":" + hDisplay + ":" + mDisplay + ":" + sDisplay;
};

exports.clockString = function(seconds) {
    let h = isNaN(seconds) ? '--' : Math.floor(seconds % (3600 * 24) / 3600)
    let m = isNaN(seconds) ? '--' : Math.floor(seconds % 3600 / 60)
    let s = isNaN(seconds) ? '--' : Math.floor(seconds % 60)
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

exports.isUrl = (url) => {
    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
}

exports.buffergif = async (image) => {
const child_process = require('child_process')
const filename = `${Math.random().toString(36)}`
await fs.writeFileSync(`./temp/${filename}.gif`, image)
child_process.exec(`ffmpeg -i ./temp/${filename}.gif -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" ./tmp${filename}.mp4`)
await sleep(4000)
var buffer5  =  await  fs.readFileSync(`./temp/${filename}.mp4`)
Promise.all([unlink(`./temp/${filename}.mp4`), unlink(`./tmp/${filename}.gif`)])
return buffer5
}

exports.getTime = (format, date) => {
	if (date) {
		return moment(date).locale('id').format(format)
	} else {
		return moment.tz('Asia/Jakarta').locale('id').format(format)
	}
}

exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms)); // promises?
}

exports.formatDate = (n, locale = 'id') => {
	let d = new Date(n)
	return d.toLocaleDateString(locale, {
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	})
}

exports.tanggal = (numer) => {
	myMonths = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
				myDays = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']; 
				var tgl = new Date(numer);
				var day = tgl.getDate()
				bulan = tgl.getMonth()
				var thisDay = tgl.getDay(),
				thisDay = myDays[thisDay];
				var yy = tgl.getYear()
				var year = (yy < 1000) ? yy + 1900 : yy; 
				const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
				let d = new Date
				let locale = 'id'
				let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
				let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
				
				return`${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`
}

exports.formatp = sizeFormatter({
    std: 'JEDEC', //'SI' = default | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

exports.jsonformat = (string) => {
    return JSON.stringify(string, null, 2)
}

exports.generateProfilePicture = async (buffer) => {
	const jimp = await jimp.read(buffer)
	const min = jimp.getWidth()
	const max = jimp.getHeight()
	const cropped = jimp.crop(0, 0, min, max)
	return {
		img: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG),
		preview: await cropped.scaleToFit(720, 720).getBufferAsync(jimp_1.MIME_JPEG)
	}
}

exports.parseMention = (text = '') => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

exports.getGroupAdmins = (participantes) => {
	const admins = []
	for (let i of participantes) {
		if (i.admin) admins.push(i.id);
	}
	return admins
}

/**
 * Serialize Message
 * @param {WAConnection} conn 
 * @param {Object} m 
 * @param {Boolean} hasParent 
 */
exports.smsg = (conn, m, hasParent) => {
    if (!m) return m
    let M = proto.WebMessageInfo
    let protocolMessageKey
    
    if (m.key) {
        m.messageInfo = M
        m.id = m.key.id
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16
        m.chat = m.key.remoteJid
        m.fromMe = m.key.fromMe
        m.isGroup = m.chat.endsWith('@g.us')
        m.sender = m.fromMe ? (conn.user.id.split(":")[0]+'@s.whatsapp.net' || conn.user.id) : (m.key.participant || m.key.remoteJid)
        m.device = m.key.id.length > 21 ? 'Android' : m.key.id.substring(0, 2) == '3A' ? 'IOS' : 'whatsapp web'
    }

    if (m.message) {
        m.mtype = Object.keys(m.message)[0]
        m.body = m.message.conversation || m.message[m.mtype].caption || m.message[m.mtype].text || (m.mtype == 'listResponseMessage') && m.message[m.mtype].singleSelectReply.selectedRowId || (m.mtype == 'buttonsResponseMessage') && m.message[m.mtype].selectedButtonId || m.mtype
        m.msg = m.message[m.mtype]
        if (m.mtype == 'protocolMessage' && m.msg.key) { 
        protocolMessageKey = m.msg.key; 
        if (protocolMessageKey == 'status@broadcast') protocolMessageKey.remoteJid = m.chat; 
        if (!protocolMessageKey.participant || protocolMessageKey.participant == 'status_me') protocolMessageKey.participant = m.sender; 
        protocolMessageKey.fromMe = conn.decodeJid(protocolMessageKey.participant) === conn.decodeJid(conn.user.id); 
        if (!protocolMessageKey.fromMe && protocolMessageKey.remoteJid === conn.decodeJid(conn.user.id)) protocolMessageKey.remoteJid = m.sender; 
        } 
  
        try {
        if (protocolMessageKey && m.mtype == 'protocolMessage') conn.ev.emit('message.delete', protocolMessageKey); 
        } catch (e) {
        console.error(e)
        }
        if (m.mtype === 'ephemeralMessage') {
            exports.smsg(sock, m.msg)
            m.mtype = m.msg.mtype
            m.msg = m.msg.msg
        }
        let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null
        m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
        if (m.quoted) {
            let type = Object.keys(m.quoted)[0]
			m.quoted = m.quoted[type]
            if (['productMessage'].includes(type)) {
				type = Object.keys(m.quoted)[0]
				m.quoted = m.quoted[type]
			}
            if (typeof m.quoted === 'string') m.quoted = {
				text: m.quoted
			}
            m.quoted.id = m.msg.contextInfo.stanzaId
			m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
			m.quoted.sender = m.msg.contextInfo.participant.split(":")[0] || m.msg.contextInfo.participant
			m.quoted.fromMe = m.quoted.sender === (conn.user && conn.user.id)
            m.quoted.text = m.quoted.text || m.quoted.caption || ''
			m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            })

            /**
             * 
             * @returns 
             */
            m.quoted.delete = () => conn.sendMessage(m.quoted.chat, { delete: vM.key })

	   /**
		* 
		* @param {*} jid 
		* @param {*} forceForward 
		* @param {*} options 
		* @returns 
	   */
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => conn.copyNForward(jid, vM, forceForward, options)

            /**
              *
              * @returns
            */
            m.quoted.download = () => downloadMediaMessage(m.quoted)
        }
    }
  if (m.msg.url) m.download = () => conn.downloadMediaMessage(m.msg)
    m.text = m.msg.text || m.msg.caption || m.message.conversation || m.msg.contentText || m.msg.selectedDisplayText || m.msg.title || ''

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
	
    conn.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options)
        } else {
            buffer = await imageToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }

       conn.sendPayment = async (jid, amount, text, quoted, options) => { 
         conn.relayMessage(jid, { 
           requestPaymentMessage: { 
             currencyCodeIso4217: 'PEN', 
             amount1000: amount, 
             requestFrom: null, 
             noteMessage: { 
               extendedTextMessage: { 
                 text: text, 
                 contextInfo: { 
                   externalAdReply: { 
                     showAdAttribution: true, 
                   }, mentionedJid: conn.parseMention(text)}}}}}, {})
       }
      
       conn.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || ''
        let messageType = mime.split('/')[0].replace('application', 'document') ? mime.split('/')[0].replace('application', 'document') : mime.split('/')[0]
        let extension = mime.split('/')[1]
        const stream = await downloadContentFromMessage(message, messageType)
        let buffer = Buffer.from([])
        for await(const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
        }
        
    /**
    * @param {*} jid
    * @param {*} path
    * @param {*} caption 
    */
    conn.sendImage = async (jid, path, caption = '', quoted = '', options) => { 
     let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0) 
     return await conn.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted }) 
     } 
     
    /**
    * @param {*} jid
    * @param {*} caption
    * @param {*} thumbnail
    * @param {*} quoted
    */
    conn.adReply = (jid, caption, thumbnail, quoted, inTrue, newsletterJid, newsletterName) => {
	sock.sendMessage(jid ? jid : m.chat, {   
	text: caption,  
	contextInfo:{  
	forwardedNewsletterMessageInfo: { 
	newsletterJid: newsletterJid ? newsletterJid : '120363200204060894@newsletter', 
	serverMessageId: '', 
	newsletterName: newsletterName ? newsletterName: '༻꫞⃝🧃 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🧃⃝꫞༺' },
	forwardingScore: 9999999,
	isForwarded: true,
	remoteJid: anu.id,   
	mentionedJid:[m.sender],  
	"externalAdReply": {  
	"showAdAttribution": true,  
	"containsAutoReply": false,
	"renderLargerThumbnail": inTrue ? inTrue : false,  
	"title": botname,
	"body": wm,
	"mediaType": 1,   
	"thumbnailUrl": thumbnail ? thumbnail : ftkim,  
	"mediaUrl": wha,  
	"sourceUrl": wha
	}}}) 
    }
    
    /**
    * @param {*} jid
    * @param {*} caption
    * @param {*} thumbail // optional
    * @param {*} orderTitle // optional
    * @param {*} userJid // optional
    */
    conn.awaitMessage = async (options = {}) => {
		return new Promise((resolve, reject) => {
			if (typeof options !== 'object') reject(new Error('Options must be an object'));
            if (typeof options.sender !== 'string') reject(new Error('Sender must be a string'));
            if (typeof options.chatJid !== 'string') reject(new Error('ChatJid must be a string'));
            if (options.timeout && typeof options.timeout !== 'number') reject(new Error('Timeout must be a number'));
            if (options.filter && typeof options.filter !== 'function') reject(new Error('Filter must be a function'));
            
            const timeout = options?.timeout || undefined;
            const filter = options?.filter || (() => true);
            let interval = undefined
                    
            let listener = (data) => {
                let { type, messages } = data;
				if (type == "notify") {
					for (let message of messages) {
                        const fromMe = message.key.fromMe;
                        const chatId = message.key.remoteJid;
                        const isGroup = chatId.endsWith('@g.us');
                        const isStatus = chatId == 'status@broadcast';
            
                        const sender = fromMe ? conn.user.id.replace(/:.*@/g, '@') : (isGroup || isStatus) ? message.key.participant.replace(/:.*@/g, '@') : chatId;
                        if (sender == options.sender && chatId == options.chatJid && filter(message)) {
                            conn.ev.off('messages.upsert', listener);
                            clearTimeout(interval);
                            resolve(message);
                        }
                    }
                }
            }
            conn.ev.on('messages.upsert', listener);
            if (timeout) {
                interval = setTimeout(() => {
                    conn.ev.off('messages.upsert', listener);
                    reject(new Error('Timeout'));
                }, timeout);
            }
        });
    }
    conn.sendCart = async (jid, text, thumbail, orderTitle, userJid) => {
    var messa = await prepareWAMessageMedia({ image: thumbail ? thumbail : success }, { upload: conn.waUploadToServer })
    var order = generateWAMessageFromContent(jid, proto.Message.fromObject({
    "orderMessage":{ "orderId":"3648563358700955",
    "thumbnail": thumbail ? thumbail : success,
    "itemCount": 999999,
    "status": "INQUIRY",
    "surface": "CATALOG",
    "message": text,
    "orderTitle": orderTitle ? orderTitle : 'unknown',
    "sellerJid": "54446767@s.whatsapp.net",
    "token": "AR4flJ+gzJw9zdUj+RpekLK8gqSiyei/OVDUFQRcmFmqqQ==",
    "totalAmount1000": "-500000000",
    "totalCurrencyCode":"USD",
    "contextInfo":{ "expiration": 604800, "ephemeralSettingTimestamp":"1679959486","entryPointConversionSource":"global_search_new_chat","entryPointConversionApp":"whatsapp","entryPointConversionDelaySeconds":9,"disappearingMode":{"initiator":"CHANGED_IN_CHAT"}}}
    }), { userJid: userJid ? userJid : conn.user.id})
    conn.relayMessage(jid, order.message, { messageId: order.key.id })
    }
   
conn.user.jid = conn.user.id.split(":")[0] + "@s.whatsapp.net" // jid in user?
conn.user.chat = m.chat // chat in user?????????
    
    /**
    * @param {*} jid
    * @param {*} caption
    * @param {*} fakenumber
    * @param {*} fakecaption
    */

    conn.fakeReply = (jid, caption,  fakeNumber, fakeCaption) => {
    conn.sendMessage(jid, { text: caption }, {quoted: { key: { fromMe: false, participant: fakeNumber, ...(m.chat ? { remoteJid: null } : {}) }, message: { conversation: fakeCaption }}})
    }

    /**
    * @param {*} jid
    * @param {*} text
    * @param {*} editedText
    * @param {*} quoted
    */
    conn.editMessage = async (jid, text, editedText, seconds, quoted) => {
     const {key} = await conn.sendMessage(jid, { text: text }, { quoted: quoted ? quoted : m}); 
     await exports.sleep(1000 * seconds); // message in seconds?? (delay)
     await conn.sendMessage(m.chat, { text: editedText, edit: key }); 
    }
    
    /**
    * @param {*} jid
    * @param {*} audio
    * @param {*} quoted
    */
    conn.sendAudio = async (jid, audio, quoted, ppt, options) => { // audio? uwu
    await conn.sendPresenceUpdate('recording', jid)
    await conn.sendMessage(jid, { audio: { url: audio }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: ppt ? ptt : true, ...options }, { quoted: quoted ? quoted : m })
    }
    conn.parseAudio = async (jid, audio, quoted, ppt, name, link, image) => {
    await conn.sendPresenceUpdate('recording', jid)
    await conn.sendMessage(jid, { audio: { url: audio }, fileName: 'error.mp3', mimetype: 'audio/mp4', ptt: ppt ? ptt : true, contextInfo:{  externalAdReply: { showAdAttribution: true,
    mediaType:  1,
    mediaUrl: link ? link : wha,
    title: name ? name : botname,
    sourceUrl: link ? link : wha, 
    thumbnail: image ? image : ftkim 
    }}}, { quoted: quoted ? quoted : m })
    }
    
  /**
    * @param {*} jid
    * @param {*} text
    * @param {*} quoted
    * @param {*} options
    */
	
    conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

    conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })

	
/**
    * @returns
    */
    
    conn.parseMention = async(text) => {
    return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')}
    
    /**
    * @param {*} jid
    */

    conn.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
    let decode = jidDecode(jid) || {}
    return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
    }
    
    /**
    * @param {*} jid?
    */
    
    conn.getName = (jid, withoutContact  = false) => { // jid = m.chat?
    id = conn.decodeJid(jid)
    withoutContact = conn.withoutContact || withoutContact 
    let v
    if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
    v = store.contacts[id] || {}
    if (!(v.name || v.subject)) v = conn.groupMetadata(id) || {}
    resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
    })
    else v = id === '0@s.whatsapp.net' ? {
    id,
    name: 'WhatsApp'
    } : id === conn.decodeJid(conn.user.jid) ?
    conn.user :
    (store.contacts[id] || {})
    return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
    }
    
    /**
    *
    * @param {*} jid
    * @param {*} kon
    * @param {*} quoted
    * @param {*} opts = options?
    */
    
    conn.sendContact = async (jid, kon, quoted = '', opts = {}) => {
	let list = []
	for (let i of kon) {
	    list.push({
	    	displayName: await conn.getName(i),
	    	vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await conn.getName(i)}\nFN:${await conn.getName(i)}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:toca aqui uwu\nitem2.EMAIL;type=INTERNET:${yt}\nitem2.X-ABLabel:YouTube\nitem3.URL:${github}\nitem3.X-ABLabel:GitHub\nitem4.ADR:;;${location};;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
	    })
	}
	conn.sendMessage(jid, { contacts: { displayName: `${list.length} Contacto`, contacts: list }, ...opts }, { quoted })
    }
    
    /**
     * 
     * @param {*} jid 
     * @param {*} path 
     * @param {*} quoted 
     * @param {*} options 
     * @returns 
     */
    conn.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
        let buffer
        if (options && (options.packname || options.author)) {
            buffer = await writeExifVid(buff, options)
        } else {
            buffer = await videoToWebp(buff)
        }

        await conn.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        return buffer
    }
    conn.sendPoll = (jid, name = '', values = [], selectableCount = 1) => { return conn.sendMessage(jid, { poll: { name, values, selectableCount }}) }
    
conn.parseMention = (text = '') => {
return [...text.matchAll(/@([0-9]{5,16}|0)/g)].map(v => v[1] + '@s.whatsapp.net')
}

conn.sendTextWithMentions = async (jid, text, quoted, options = {}) => conn.sendMessage(jid, { text: text, contextInfo: { mentionedJid: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net') }, ...options }, { quoted })

conn.sendText = (jid, text, quoted = '', options) => conn.sendMessage(jid, { text: text, ...options }, { quoted })
	
	/**
    * a normal reply
    */
    m.reply = (text, chatId, options) => conn.sendMessage(chatId ? chatId : m.chat, { text: text }, { quoted: m, detectLinks: false, thumbnail: global.thumb, ...options })

	m.react = (text, key, options) => conn.sendMessage(m.chat, { react: {text, key: m.key }})

	m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => conn.copyNForward(jid, true, {readViewOnce: true})
	
	//m.react = (text, chatId, key, options) => conn.relayMessage(chatId ? chatId : m.chat, {reactionMessage: { key: m.key, text, }}, { messageId: m.key.id })

    /**
    * copy message?
    */
    m.copy = () => exports.smsg(conn, M.fromObject(M.toObject(m)))
    
    /**
     * 
     * @param {*} path 
     * @returns 
     */
     
    conn.getFile = async (PATH, saveToFile = false) => { 
         let res; let filename; 
         const data = Buffer.isBuffer(PATH) ? PATH : PATH instanceof ArrayBuffer ? PATH.toBuffer() : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await fetch(PATH)).buffer() : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0); 
         if (!Buffer.isBuffer(data)) throw new TypeError('Result is not a buffer'); 
         const type = await FileType.fromBuffer(data) || { 
           mime: 'application/octet-stream', 
           ext: '.bin', 
         }; 
         if (data && saveToFile && !filename) (filename = path.join(__dirname, '../temp/' + new Date * 1 + '.' + type.ext), await fs.promises.writeFile(filename, data)); 
         return { 
           res, 
           filename, 
           ...type, 
           data, 
           deleteFile() { 
             return filename && fs.promises.unlink(filename); 
           }, 
         }}
   /**
    * @param {*} jid
    * @param {*} path
    * @param {*} fileName
    * @param {*} quoted
    * @param {*} options
    * @return
    */
   conn.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
         const type = await conn.getFile(path, true); 
         let {res, data: file, filename: pathFile} = type; 
         if (res && res.status !== 200 || file.length <= 65536) { 
           try { 
             throw {json: JSON.parse(file.toString())}; 
           } catch (e) { 
             if (e.json) throw e.json; 
           } 
         }      
         const opt = {}; 
         if (quoted) opt.quoted = quoted; 
         if (!type) options.asDocument = true; 
         let mtype = ''; let mimetype = options.mimetype || type.mime; let convert; 
         if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'; 
         else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'; 
         else if (/video/.test(type.mime)) mtype = 'video'; 
         else if (/audio/.test(type.mime)) { 
           ( 
             convert = await toAudio(file, type.ext), 
             file = convert.data, 
             pathFile = convert.filename, 
             mtype = 'audio', 
             mimetype = options.mimetype || 'audio/mpeg; codecs=opus' 
           ); 
         } else mtype = 'document'; 
         if (options.asDocument) mtype = 'document'; 
  
         delete options.asSticker; 
         delete options.asLocation; 
         delete options.asVideo; 
         delete options.asDocument; 
         delete options.asImage; 
  
         const message = { 
           ...options, 
           caption, 
           ptt, 
           [mtype]: {url: pathFile}, 
           mimetype, 
           fileName: filename || pathFile.split('/').pop(), 
         }; 
         /** 
                  * @type {import('@whiskeysockets/baileys').proto.WebMessageInfo} 
                  */ 
         let m; 
         try { 
           m = await conn.sendMessage(jid, message, {...opt, ...options}); 
         } catch (e) { 
           console.error(e); 
           m = null; 
         } finally { 
           if (!m) m = await conn.sendMessage(jid, {...message, [mtype]: file}, {...opt, ...options}); 
           file = null; // releasing the memory 
           return m; 
         } 
       }
       
    conn.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await(const chunk of stream) {
    buffer = Buffer.concat([buffer, chunk])}
    let type = await FileType.fromBuffer(buffer)
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
    }
    
    conn.appenTextMessage = async(text, chatUpdate) => {
        let messages = await generateWAMessage(m.chat, { text: text, mentions: m.mentionedJid }, {
            userJid: conn.user.id,
            quoted: m.quoted && m.quoted.fakeObj
        })
        messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id)
        messages.key.id = m.key.id
        messages.pushName = m.pushName
        if (m.isGroup) messages.participant = m.sender
        let msg = {
            ...chatUpdate,
            messages: [proto.WebMessageInfo.fromObject(messages)],
            type: 'append'
        }
        conn.ev.emit('messages.upsert', msg)
    }
    return m
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(require('chalk').redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
