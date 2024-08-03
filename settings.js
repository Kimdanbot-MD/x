import chalk from "chalk"
import path from 'path'
import fs from "fs"
import es from './Kim/idiomas/es.js' //Español 
import en from './Kim/idiomas/en.js' //Ingles 
const idiomas = {es, en};

global.owner = [
["573234628903", "creador", true],
["573044062173"], 
["50685690440"],
["573148243189"],
["5214434703586", "Zam", true],
["51968374620", "Ale", true],
["522221496388", " suro", true]]

global.vip = [
owner 
]

global.aport = [
  vip
]

// ═════════════𓊈『 IDIOMAS 』𓊉═════════════ 
global.place = 'America/Bogota' 
global.lenguaje = 'es' 
global.prefix = [`.`]

// ═════════════𓊈『 APIS 』𓊉═════════════ 
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']; 
global.keysZens = ['LuOlangNgentot', 'c2459db922', '37CC845916', '6fb0eff124', 'hdiiofficial', 'fiktod', 'BF39D349845E', '675e34de8a', '0b917b905e6f']; 
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]; 
global.keysxteammm = ['29d4b59a4aa687ca', '5LTV57azwaid7dXfz5fzJu', 'cb15ed422c71a2fb', '5bd33b276d41d6b4', 'HIRO', 'kurrxd09', 'ebb6251cc00f9c63']; 
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]; 
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']; 
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]; 
global.lolkeysapi = ['GataDios']; // ['BrunoSobrino_2'] 
global.itsrose = ['4b146102c4d500809da9d1ff'];
global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.APIs = {
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
global.APIKeys = {
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
}*/

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
