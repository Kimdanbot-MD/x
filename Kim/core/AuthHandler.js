import readline from "readline";
import chalk from "chalk";
import { BaileysConnection } from "../core/BaileysConnection.js";
import { fetchLatestBaileysVersion } from "@whiskeysockets/baileys";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

export class AuthHandler {
  async obtenerOpcionConexion() {
    let opcion;
    do {
      let lineM = '★∻∹⋰⋰ ☆∻∹⋰⋰ ★∻∹⋰⋰ ☆∻∹⋰⋰★∻∹⋰⋰ ☆∻∹⋰⋰'
      let linen = '✄ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈'
      opcion = await question(`\n\n${lineM}\n
     ${chalk.blue.bgBlue.bold.cyan('🪷  mᥱ́𝗍᥆ძ᥆ ძᥱ ᥎іᥒᥴᥙᥣᥲᥴі᥆ᥒ 🪷 ')}\n
${lineM}\n
  ${chalk.blueBright('🎀 ꒷︶꒥‧˚૮꒰۵•▴•۵꒱ა‧˚꒷︶꒥🎀')}\n
${chalk.blueBright(linen)}\n   
${chalk.green.bgMagenta.bold.yellow('🌟  һ᥆ᥣᥲ, һᥱrm᥆s᥊, ¿ᥴ᥆m᥆ 𝗊ᥙіᥱrᥱs ᥴ᥆ᥒᥱᥴ𝗍ᥲr𝗍ᥱ? 🌟 ')}\n
${chalk.bold.redBright('🍓  ▷ ᥱᥣᥱᥴᥴі᥆ᥒ ➊ :')} ${chalk.greenBright('ᥙsᥲ ᥙᥒ ᥴ᥆ძіg᥆ 🆀 🆁 .')}
${chalk.bold.redBright('🧸  ▷ ᥱᥣᥱᥴᥴі᥆ᥒ ➋ :')} ${chalk.greenBright('ᥙsᥲ ᥙᥒ ᥴ᥆ძіg᥆ ძᥱ 8 ძіgі𝗍᥆s.')}\n
${chalk.blueBright(linen)}\n   
${chalk.italic.magenta('🍄 ¿𝗊ᥙᥱ́ ᥱᥣᥱᥴᥴі᥆ᥒ ᥱᥣᥱgіs𝗍ᥱ? ⍴᥆r𝖿іs ᥱsᥴrіᑲᥱ')}
${chalk.italic.magenta('s᥆ᥣ᥆ ᥱᥣ ᥒᥙ́mᥱr᥆ ძᥱ ᥣᥲ ᥱᥣᥱᥴᥴі᥆ᥒ. 🍄')}\n
${chalk.bold.magentaBright('---> ')}`);

      if (!/^[1-2]$/.test(opcion)) {
        console.log(chalk.bold.cyanBright(`🌻  һᥱᥡᥡᥡᥡ 🌻  ٩(๑꒦ິȏ꒦ິ๑)۶ \n\n${chalk.bold.redBright(`🌸  ᥒ᥆ sᥱ ⍴ᥱrmі𝗍ᥱᥒ mᥲ́s ᥒᥙmᥱr᥆s᥆s ᥲ⍴ᥲr𝗍ᥱ ძᥱ ${chalk.bold.greenBright("➊")} ᥆ ${chalk.bold.greenBright("➋")} 🌸\n🌼  𝗍ᥲm⍴᥆ᥴ᥆ ᥣᥱ𝗍rᥲs ᥒі sіmᑲ᥆ᥣ᥆s ᥱs⍴ᥱᥴіᥲᥣᥱs. (╥﹏╥) 🌼`)}\n\n${chalk.bold.yellowBright("🪻  ♡ ´･ღ ･`♡ 𝗍і⍴ 🪻 : 🌺  ᥴ᥆⍴іᥲ 𝗍ᥙ ᥒᥙ́mᥱr᥆ ძᥱsძᥱ ᥣᥲ ᥲ⍴⍴\n ძᥱ ᥕһᥲ𝗍sᥲ⍴⍴ ᥡ ⍴ᥱgᥲᥣ᥆ ᥱᥒ ᥣᥲ ᥴ᥆ᥒs᥆ᥣᥲ. 🌺")}`))
      }
    } while (!/^[1-2]$/.test(opcion));

    return opcion;
  }

  async iniciarAutenticacion(opcion) {
    try {
      const { version } = await fetchLatestBaileysVersion();
      const baileysConnection = new BaileysConnection({
        authPath: 'auth',
        printQRInTerminal: opcion === '1',
        browser: ['KimdanBot-MD', 'Safari', version], 
        version, 
      });

      const { kim, store } = baileysConnection;

      if (opcion === '2' && !kim.authState.creds.registered) {
        let numero;
        while (true) {
          numero = await question(chalk.bgBlack(chalk.bold.greenBright(`\n🍓  (≡^∇^≡) ⍴᥆r𝖿іs іᥒ𝗍r᥆ძᥙzᥴᥲ sᥙ ᥒᥙ́mᥱr᥆ ძᥱ ᥕһᥲ𝗍sᥲ⍴⍴. 🍓\n\n${chalk.bold.yellowBright("🫐  ⍴᥆r ᥱȷᥱm⍴ᥣ᥆ (〃∀〃)ゞ🫐\n    ➥ +57 316 1407118")}\n`)));
          numero = numero.replace(/[^0-9]/g, '');

          if (numero.match(/^\d+$/)) {
            break;
          } else {
            console.log(chalk.bold.redBright("🍨  ⍴᥆r𝖿ᥲs rᥱᥴᥙᥱrძᥲ іᥒ𝗍r᥆ძᥙᥴіr ᥱᥣ ᥴ᥆ძіg᥆ ძᥱᥣ ⍴ᥲіs. (◞ ᜊ ◟ㆀ) 🍨"));
          }
        }

        try {
          let code = await kim.requestPairingCode(numero);
          code = code?.match(/.{1,4}/g)?.join("-") || code;
          console.log(chalk.bold.white(chalk.bgMagenta(`(●'▽ '●)ゝ 🩷  ᥴ᥆ძіg᥆ ძᥱ ᥎іᥒᥴᥙᥣᥲᥴі᥆ᥒ 🩷 : `)), chalk.bold.white(chalk.white(code)));
        } catch (error) {
          console.error(chalk.red('Error al generar el código de 8 dígitos:', error));
          rl.close();
          return;
        }
      }

      return { kim, store };

    } catch (error) {
      console.error(chalk.red('Error en la autenticación:', error));
      rl.close();
      return;
    }
  }
}
