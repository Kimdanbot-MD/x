orimport chalk from "chalk"
import path from 'path'
import fs from "fs"
import es from './Kim/idiomas/es.js' //Español 
import en from './Kim/idiomas/en.js' //Ingles 

export default const owner = [
["573234628903", "creador", true],
["573044062173"], 
["50685690440"],
["573148243189"],
["5214434703586", "Zam", true],
["51968374620", "Ale", true],
["522221496388", " suro", true]]

export default const vip = [
owner 
]

export default const aport = [
  vip
]

// ═════════════𓊈『 IDIOMAS 』𓊉═════════════ 
export default const place = 'America/Bogota' 
export default const lenguaje = es 
export default const prefix = [`.`]

// ═════════════𓊈『 APIS 』𓊉═════════════ 
export default const keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']; 
export default const keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']; 
export default const keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]; 
export default const keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']; 
export default const keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]; 
export default const keysneoxrrr = ['5VC9rvNx', 'cfALv5']; 
export default const keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]; 
export default const lolkeysapi = ['GataDios']; // ['BrunoSobrino_2'] 
export default const itsrose = ['4b146102c4d500809da9d1ff'];
export default const API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

export default const APIs = {
//ApiEmpire: 'https://',
CFROSAPI: 'https://api.cafirexos.com',
nrtm: 'https://fg-nrtm.ddns.net',
fgmods: 'https://api.fgmods.xyz', 
xteam: 'https://api.xteam.xyz',
dzx: 'https://api.dhamzxploit.my.id',
lol: 'https://api.lolhuman.xyz',
neoxr: 'https://api.neoxr.my.id',
zenzapis: 'https://api.zahwazein.xyz',
akuari: 'https://api.akuari.my.id',
akuari2: 'https://apimu.my.id',
botcahx: 'https://api.botcahx.biz.id',
ibeng: 'https://api.ibeng.tech/docs',
rose: 'https://api.itsrose.site',
popcat: 'https://api.popcat.xyz',
xcoders: 'https://api-xcoders.site',
vihangayt: 'https://vihangayt.me',
erdwpe: 'https://api.erdwpe.com',
xyroinee: 'https://api.xyroinee.xyz',
nekobot: 'https://nekobot.xyz'
},
export default const APIKeys = {
'https://api.xteam.xyz': `${keysxteam}`,
'https://api.lolhuman.xyz': 'GataDios',
'https://api.neoxr.my.id': `${keysneoxr}`,
'https://api.zahwazein.xyz': `${keysxxx}`,
'https://api.fgmods.xyz': 'DRLg5kY7', 
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://api.botcahx.biz.id': 'Admin',
'https://api.ibeng.tech/docs': 'tamvan',
'https://api.itsrose.site': 'Rs-Zeltoria',
'https://api-xcoders.site': 'Frieren',
'https://api.xyroinee.xyz': 'uwgflzFEh6'
};

// ═════════════𓊈『 LINKS 』𓊉═════════════ 
export default const  md = 'https://github.com/Kimdanbot-MD/KimdanBot-MD'
export default const  yt = 'https://youtube.com/@universobl?si=HeFdv4RaYDF9HAeX'
export default const  tiktok = 'https://www.tiktok.com/@universo_yaoi_bl?_t=8iIlNrlJg1d&_r=1'
export default const  fb = 'https://www.instagram.com/_universo.bl?igshid=OGQ5ZDc2ODk2ZA=='
export default const  red = [md, yt, tiktok, fb]

export default const nna = 'https://whatsapp.com/channel/0029VaFFJab3QxS5sqmnXR3l' //canal
export default const nna2 = 'https://whatsapp.com/channel/0029VaNCiOMFSAtAQVOwA50y' //canal
export default const nna3 = 'https://whatsapp.com/channel/0029VaIJ2NSGE56k4PCzfd1E' //canal
export default const nna4 = 'https://whatsapp.com/channel/0029VaFFJab3QxS5sqmnXR3l' //canal

export default const nn = 'https://chat.whatsapp.com/C0lYCnklEtg1HUkbR4uPxA' //kim
export default const nn2 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const nn3 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const nn4 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const nn5 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const nn6 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const nn7 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const nn8 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const nn9 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const nn10 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE' //kim2
export default const ca = [nna, nna2, nna3, nna4]
export default const wa = [nna, nna2, nna3, nna4, nn, nn2, nn3, nn4, nn5, nn6, nn7, nn8, nn9, nn10]

// ═════════════𓊈『 GLOBAL 』𓊉════════════ 
/*global.mess = {
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

// ═════════════𓊈『 REACCIONES 』𓊉═════════════ 
global.rwait = '⌛'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌' 
global.xmoji = '🔥' */

// ═════════════𓊈『 INFO 』𓊉═════════════ 
export default const botname = "𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃"
export default const wm = "                𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃"
export default const packname = "🍓 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🍓"
export default const author = "🍒𝐃𝐚𝐧𝐨𝐧𝐢𝐧𝐨🍒"
export default const vs = '𝟏.𝟎.𝟎'
export default const botNumberCode = "" //Ejemplo: +57
export default const phoneNumber = ""

// ═════════════𓊈『 LISTAS 』𓊉═════════════ 
export default const mods = []
export default const premium = []  
export default const blockList = []  

// ═════════════𓊈『 NIVELES 』𓊉═════════════ 
export default const multiplier = 90 // Cuanto más alto, más difícil subir de nivel 
export default const maxwarn = '4' // máxima advertencias  
