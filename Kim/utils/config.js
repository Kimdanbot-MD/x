import chalk from "chalk";
import es from '../idiomas/es.js';
import en from '../idiomas/en.js';

global.owner = [
    ["573234628903", "creador", true],
    ["573044062173", "nombre_opcional", false],
    ["50685690440", "nombre_opcional", false],
    ["573148243189", "nombre_opcional", false],
    ["5214434703586", "Zam", true],
    ["51968374620", "Ale", true]
];

global.vip = [...global.owner];
global.aport = [...global.vip];

global.place = 'America/Bogota';
global.lenguaje = es;
global.prefix = ['.'];

global.md = 'https://github.com/Kimdanbot-MD/KimdanBot-MD';
global.yt = 'https://www.youtube.com/@KimDanBot';
global.tiktok = 'https://www.tiktok.com/@universo_yaoi_bl?_t=8iIlNrlJg1d&_r=1';
global.fb = 'https://www.instagram.com/_universo.bl?igshid=OGQ5ZDc2ODk2ZA==';
global.red = [global.md, global.yt, global.tiktok, global.fb];

global.nna = 'https://whatsapp.com/channel/0029VaFFJab3QxS5sqmnXR3l';
global.nna2 = 'https://whatsapp.com/channel/0029VaNCiOMFSAtAQVOwA50y';
global.nna3 = 'https://whatsapp.com/channel/0029VaIJ2NSGE56k4PCzfd1E';
global.nna4 = 'https://whatsapp.com/channel/0029VaFFJab3QxS5sqmnXR3l';

global.nn = 'https://chat.whatsapp.com/C0lYCnklEtg1HUkbR4uPxA';
global.nn2 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.nn3 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.nn4 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.nn5 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.nn6 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.nn7 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.nn8 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.nn9 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.nn10 = 'https://chat.whatsapp.com/Fj2edZ8XtV48tyNLZn3rdE';
global.ca = [global.nna, global.nna2, global.nna3, global.nna4];
global.wa = [global.nna, global.nna2, global.nna3, global.nna4, global.nn, global.nn2, global.nn3, global.nn4, global.nn5, global.nn6, global.nn7, global.nn8, global.nn9, global.nn10];

global.mess = {
    admin: `${global.lenguaje.admin ? global.lenguaje.admin() : 'Función solo para administradores.'}`,
    botAdmin: `${global.lenguaje.botAdmin ? global.lenguaje.botAdmin() : 'Necesito ser administrador para esto.'}`,
    owner: `${global.lenguaje.propietario ? global.lenguaje.propietario() : 'Función solo para el propietario.'}`,
    group: `${global.lenguaje.group ? global.lenguaje.group() : 'Este comando solo se usa en grupos.'}`,
    wait: "🤚 𝐏𝐎𝐑 𝐅𝐀𝐕𝐎𝐑 𝐄𝐒𝐏𝐄𝐑𝐀𝐑 𝐔𝐍 𝐌𝐎𝐌𝐄𝐍𝐓𝐎 🍇",
    private: `${global.lenguaje.private ? global.lenguaje.private() : 'Este comando solo se usa en chat privado.'}`,
    bot: `${global.lenguaje.bot ? global.lenguaje.bot() : 'Función específica del bot.'}`,
    registrarse: `${global.lenguaje.registra ? global.lenguaje.registra() : '¡Regístrate para usar esta función!'}`,
    error: `${global.lenguaje.error ? global.lenguaje.error() : 'Ocurrió un error.'}`,
    advertencia: `${global.lenguaje.advertencia ? global.lenguaje.advertencia() : 'Advertencia:'}`,
    limit: `${global.lenguaje.limit ? global.lenguaje.limit() : 'Límite alcanzado.'}`,
    AntiNsfw: `${global.lenguaje.AntiNsfw ? global.lenguaje.AntiNsfw() : 'Contenido NSFW desactivado.'}`,
    endLimit: `${global.lenguaje.endLimit ? global.lenguaje.endLimit() : 'Se acabó tu límite diario.'}`,
};

global.info = {
    wait: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${global.lenguaje.carga ? global.lenguaje.carga() : "Cargando..."}_* █▒▒▒▒▒▒▒▒▒ *(っ◞‸◟c)*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ    °     Ꮚ`,
    waitt: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${global.lenguaje.carga ? global.lenguaje.carga() : "Cargando..."}_* ██▒▒▒▒▒▒▒▒ *(｡>ㅅ<｡)*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___ 𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ    °     Ꮚ`,
    waittt: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${global.lenguaje.carga ? global.lenguaje.carga() : "Cargando..."}_* ████▒▒▒▒▒▒` + " *:;(∩´﹏`∩);:*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___ 𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ    °     Ꮚ",
    waitttt: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${global.lenguaje.carga ? global.lenguaje.carga() : "Cargando..."}_* ████████▒▒ *(〃ﾟ3ﾟ〃)*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___ 𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ    °     Ꮚ`,
    waittttt: `*. : ｡✿ * ﾟ * .: ｡ ✿ * ﾟ  * . : ｡ ✿ *. : ｡✿ * ﾟ * .: ｡*\n\n*_💐▷ ${global.lenguaje.carga ? global.lenguaje.carga() : "Cargando..."}_* ██████████` + "*(人´∀`〃)*\n              𝞋𝞎  ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ ୨🌸୧ ࿙⃛͜࿚⃛࿙⃛͜࿚⃛࿙⃛͜࿚⃛ 𝞋𝞎 \n. ᘛ   °   🥞 𖣃' 𝕏̷̸.𝔽̷̸𝔸̷̸𝕍̷̸𝕆̷̸ℝ̷̸___ 𝔼̷̸𝕊̷̸ℙ̷̸𝔼̷̸ℝ̷̸𝔼̷̸ㅤ    °     Ꮚ",
    result: `${global.lenguaje.result ? global.lenguaje.result() : "Resultado:"}`
};

global.rwait = '⌛';
global.dmoji = '🤭';
global.done = '✅';
global.error = '❌';
global.xmoji = '🔥';

global.botname = "𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃";
global.wm = "                𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃";
global.packname = "🍓 𝐊𝐢𝐦𝐝𝐚𝐧𝐁𝐨𝐭-𝐌𝐃 🍓";
global.author = "🍒𝐃𝐚𝐧𝐨𝐧𝐢𝐧𝐨🍒";
global.vs = '1.0.0';
global.botNumberCode = "";
global.phoneNumber = "";

global.mods = [];
global.premium = [];
global.blockList = [];

global.multiplier = 90;
global.maxwarn = '4';
