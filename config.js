import chalk from "chalk"
import path from 'path'
import fs from "fs"
import es from './Kim/idiomas/es.js' //Español 
import en from './Kim/idiomas/en.js' //Ingles 

global.owner = [
["573234628903", "creador", true],
["573044062173"], 
["50685690440"],
["573148243189"],
["5214434703586", "Zam", true],
["51968374620", "Ale", true]]

global.vip = [
owner 
]

global.aport = [
  vip
]

// ═════════════𓊈『 IDIOMAS 』𓊉═════════════ 
global.place = 'America/Bogota' // Aquí puede encontrar su ubicación https://momentjs.com/timezone/
global.lenguaje = es // Aquí puede encontrar su idioma https://cloud.google.com/translate/docs/languages?hl=es-419
global.prefix = [`.`]

// ═════════════𓊈『 LINKS 』𓊉═════════════ 
global.md = 'https://github.com/Kimdanbot-MD/KimdanBot-MD'
global.yt = 'https://youtube.com/@universobl?si=HeFdv4RaYDF9HAeX'
global.tiktok = 'https://www.tiktok.com/@universo_yaoi_bl?_t=8iIlNrlJg1d&_r=1'
global.fb = 'https://www.instagram.com/_universo.bl?igshid=OGQ5ZDc2ODk2ZA=='
global.red = [md, yt, tiktok, fb]

global.nna = 'https://whatsapp.com/channel/0029VaFFJab3QxS5sqmnXR3l' //canal
global.nna2 = 'https://whatsapp.com/channel/0029VaNCiOMFSAtAQVOwA50y' //canal
global.nna3 = 'https://whatsapp.com/channel/0029VaIJ2NSGE56k4PCzfd1E' //canal
global.nna4 = 'https://whatsapp.com/channel/0029VaFFJab3QxS5sqmnXR3l' //canal

global.nn = 'https://chat.whatsapp.com/C0lYCnklEtg1HUkbR4uPxA' //kim
global.nn2 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.nn3 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.nn4 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.nn5 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.nn6 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.nn7 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.nn8 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.nn9 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.nn10 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
global.ca = [nna, nna2, nna3, nna4]
global.wa = [nna, nna2, nna3, nna4, nn, nn2, nn3, nn4, nn5, nn6, nn7, nn8, nn9, nn10]
/*
// ═════════════𓊈『 GLOBAL 』𓊉════════════ 
global.mess = {
admin: `${lenguaje['admin']()}`, 
botAdmin: `${lenguaje['botAdmin']()}`, 
owner: `${lenguaje['propietario']()}`, 
group: `${lenguaje['group']()}`, 
wait: "🤚 𝐏𝐎𝐑 𝐅𝐀𝐕𝐎𝐑 𝐄𝐒𝐏𝐄𝐑𝐀𝐑 𝐔𝐍 𝐌𝐎𝐌𝐄𝐍𝐓𝐎 🍇", 
private: `${lenguaje['private']()}`, 
bot: `${lenguaje['bot']()}`,
registrarse: `${lenguaje['registra']()}`, 
error: `${lenguaje['error']()}`, 
advertencia: `${lenguaje['advertencia']()}`, 
limit: `${lenguaje['limit']()}`, 
AntiNsfw: `${lenguaje['AntiNsfw']()}`,
endLimit: `${lenguaje['endLimit']()}`, }


// ═════════════𓊈『 CARGA 』𓊉═════════════ 
global.info = {
wait: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${lenguaje['carga']()}_* █▒▒▒▒▒▒▒▒▒ *(っ◞‸◟c)*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ   °    Ꮚ`, 
waitt: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${lenguaje['carga']()}_* ██▒▒▒▒▒▒▒▒ *(｡>ㅅ<｡)*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___ 𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ   °    Ꮚ`, 
waittt: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${lenguaje['carga']()}_* ████▒▒▒▒▒▒` + " *:;(∩´﹏`∩);:*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___ 𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ   °    Ꮚ", 
waitttt: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${lenguaje['carga']()}_* ████████▒▒ *(〃ﾟ3ﾟ〃)*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___ 𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ   °    Ꮚ`, 
waittttt: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${lenguaje['carga']()}_* ██████████` + "*(人´∀`〃)*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___ 𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ   °    Ꮚ", 
result: `${lenguaje['result']()}`
}
*/
// ═════════════𓊈『 REACCIONES 』𓊉═════════════ 
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' 

// ═════════════𓊈『 INFO 』𓊉═════════════ 
global.botname = "𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃"
global.wm = "                𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃"
global.packname = "🍓 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🍓"
global.author = "🍒𝐃𝐚𝐧𝐨𝐧𝐢𝐧𝐨🍒"
global.vs = '𝟏.𝟎.𝟎'
global.botNumberCode = "" //Ejemplo: +57
global.phoneNumber = ""

// ═════════════𓊈『 LISTAS 』𓊉═════════════ 
global.mods = []
global.premium = []  
global.blockList = []  

// ═════════════𓊈『 NIVELES 』𓊉═════════════ 
global.multiplier = 90 // Cuanto más alto, más difícil subir de nivel 
global.maxwarn = '4' // máxima advertencias  
