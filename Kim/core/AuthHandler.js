import readline from "readline";
import chalk from "chalk";

export class AuthHandler {
    constructor(rlInstance) {
        this.rl = rlInstance; // Utiliza la instancia de readline proporcionada para la interacción con el usuario.
        this.question = (text) => new Promise((resolve) => this.rl.question(text, resolve));
    }

    // Muestra un menú al usuario y obtiene la opción de conexión (QR o código de 8 dígitos).
    async obtenerOpcionConexion() {
        let opcion;
        do {
            // Lógica del menú visual (se mantiene la provista por el usuario)
            let lineM = '★∻∹⋰⋰ ☆∻∹⋰⋰ ★∻∹⋰⋰ ☆∻∹⋰⋰★∻∹⋰⋰ ☆∻∹⋰⋰';
            let linen = '✄ ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈';
            opcion = await this.question(`\n\n${lineM}\n
      ${chalk.blue.bgBlue.bold.cyan('🪷  mᥱ́𝗍᥆ძ᥆ ძᥱ ᥎іᥒᥴᥙᥣᥲᥴі᥆ᥒ 🪷 ')}\n
${lineM}\n
  ${chalk.blueBright('🎀 ꒷︶꒥‧˚૮꒰۵•▴•۵꒱ა‧˚꒷︶꒥🎀')}\n
${chalk.blueBright(linen)}\n   
${chalk.green.bgMagenta.bold.yellow('🌟  һ᥆ᥣᥲ, һᥱrm᥆s᥊, ¿ᥴ᥆m᥆ 𝗊ᥙіᥱrᥱs ᥴ᥆ᥒᥱᥴ𝗍ᥲr𝗍ᥱ? 🌟 ')}\n
${chalk.bold.redBright('🍓  ▷ ᥱᥣᥱᥴᥴі᥆ᥒ ➊ :')} ${chalk.greenBright('ᥙsᥲ ᥙᥒ ᥴ᥆ძіg᥆ 🆀 🆁 .')}
${chalk.bold.redBright('🧸  ▷ ᥱᥣᥱᥴᥴі᥆ᥒ ➋ :')} ${chalk.greenBright('ᥙsᥲ ᥙᥒ ᥴ᥆ძіg᥆ ძᥱ 8 ძіgі𝗍᥆s.')}\n
${chalk.blueBright(linen)}\n   
${chalk.italic.magenta('🍄 ¿𝗊ᥙᥱ́ ᥱᥣᥱᥴᥴі᥆ᥒ ᥱᥣᥱgіs𝗍ᥱ? ⍴᥆r𝖿іs ᥱsᥴrіᑲᥱ')}
${chalk.italic.magenta('s᥆ᥣ᥆ ᥱᥣ ᥒᥙ́mᥱr᥆ ძᥱ ᥣᥲ ᥱᥣᥱᥴᥴі᥆ᥒ. 🍄')}\n
${chalk.bold.magentaBright('---> ')}`);

            if (!/^[1-2]$/.test(opcion)) {
                console.log(chalk.bold.cyanBright(`🌻  һᥱᥡᥡᥡᥡ 🌻  ٩(๑꒦ິȏ꒦ິ๑)۶ \n\n${chalk.bold.redBright(`🌸  ᥒ᥆ sᥱ ⍴ᥱrmі𝗍ᥱᥒ mᥲ́s ᥒᥙmᥱr᥆s᥆s ᥲ⍴ᥲr𝗍ᥱ ძᥱ ${chalk.bold.greenBright("➊")} ᥆ ${chalk.bold.greenBright("➋")} 🌸\n🌼  𝗍ᥲm⍴᥆ᥴ᥆ ᥣᥱ𝗍rᥲs ᥒі sіmᑲ᥆ᥣ᥆s ᥱs⍴ᥱᥴіᥲᥣᥱs. (╥﹏╥) 🌼`)}\n\n${chalk.bold.yellowBright("🪻  ♡ ´･ღ ･`♡ 𝗍і⍴ 🪻 : 🌺  ᥴ᥆⍴іᥲ 𝗍ᥙ ᥒᥙ́mᥱr᥆ ძᥱsძᥱ ᥣᥲ ᥲ⍴⍴\n ძᥱ ᥕһᥲ𝗍sᥲ⍴⍴ ᥡ ⍴ᥱgᥲᥣ᥆ ᥱᥒ ᥣᥲ ᥴ᥆ᥒs᥆ᥣᥲ. 🌺")}`))
            }
        } while (!/^[1-2]$/.test(opcion));
        return opcion; // Retorna '1' para QR o '2' para código de 8 dígitos.
    }

    // Solicita al usuario su número de teléfono si se elige la conexión por código y no existe sesión.
    async obtenerNumeroTelefonoParaCodigo(authFileExists) {
        if (authFileExists) {
            console.log(chalk.yellow("Archivo de sesión existente. Si el código de pareo falla, elimina la carpeta 'auth' y reintenta."));
        }

        let addNumber;
        while (true) {
            addNumber = await this.question(chalk.bgBlack(chalk.bold.greenBright(`\n  (≡^∇^≡) Por favor, introduce tu número de WhatsApp completo (con código de país).\n\n${chalk.bold.yellowBright("🫐  Por ejemplo (〃∀〃)ゞ🫐\n    ➥ +5211234567890")}\n${chalk.bold.magentaBright('---> ')}`)));
            addNumber = addNumber.replace(/[^0-9+]/g, ''); // Permite '+' para el código de país.

            if (addNumber.match(/^\+?\d{10,15}$/)) { // Validación básica del formato del número.
                break;
            } else {
                console.log(chalk.bold.redBright("  Por favor, introduce un número de WhatsApp válido con el código de país. (◞ ᜊ ◟ㆀ) "));
            }
        }
        // Es responsabilidad de quien llama a AuthHandler cerrar la instancia 'rl' global cuando ya no se necesite en la aplicación.
        return addNumber; // Retorna el número de teléfono proporcionado por el usuario.
    }
}
