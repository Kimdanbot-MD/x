import { execSync } from 'child_process';

export class CommandHandler {
    constructor(kim) {
        this.kim = kim;
    }

    async handleCommand(m, command) {
        const senderJid = m.sender;
        const isOwner = global.owner && Array.isArray(global.owner)
            ? global.owner.some(ownerEntry => ownerEntry[0] === senderJid?.split('@')[0])
            : false;

        try {
            switch (command) {
                case 'test':
                    await m.reply('¡El bot funciona correctamente!');
                    break;
                case 'ping':
                    const startTime = Date.now();
                    await m.reply(`Pong! ${Date.now() - startTime}ms`);
                    break;
                default:
                    if (m.text.startsWith('>')) {
                        if (!isOwner) return m.reply(global.mess?.owner || "Función solo para el propietario.");
                        try {
                            const codeToEvaluate = m.text.slice(2);
                            console.log(`[CommandHandler] Evaluando (sync): ${codeToEvaluate}`);
                            const result = eval(codeToEvaluate);
                            return m.reply(JSON.stringify(result, null, '\t'));
                        } catch (e) {
                            console.error("[CommandHandler] Error en eval (>):", e);
                            return m.reply("Error al evaluar el código.");
                        }
                    }
                    if (m.text.startsWith('=>')) {
                        if (!isOwner) return m.reply(global.mess?.owner || "Función solo para el propietario.");
                        try {
                            const asyncCodeToEvaluate = m.text.slice(3);
                            console.log(`[CommandHandler] Evaluando (async): ${asyncCodeToEvaluate}`);
                            let result = await eval(`(async () => { ${asyncCodeToEvaluate} })()`);
                            return m.reply(JSON.stringify(result, null, '\t'));
                        } catch (e) {
                            console.error("[CommandHandler] Error en eval (=>):", e);
                            return m.reply("Error al evaluar el código asíncrono.");
                        }
                    }
                    if (m.text.startsWith('$')) {
                        if (!isOwner) return m.reply(global.mess?.owner || "Función solo para el propietario.");
                        try {
                            const commandToExecute = m.text.slice(2);
                            console.log(`[CommandHandler] Ejecutando comando shell: ${commandToExecute}`);
                            const output = execSync(commandToExecute, { encoding: 'utf-8' });
                            return m.reply(output);
                        } catch (err) {
                            console.error("[CommandHandler] Error en execSync ($):", err);
                            return m.reply("Error al ejecutar el comando de shell.");
                        }
                    }
                    if (command) {
                        await m.reply(`Comando "${command}" no reconocido.`);
                    }
            }
        } catch (error) {
            console.error(`[CommandHandler] Error al ejecutar el comando '${command}':`, error);
            await m.reply('Ha ocurrido un error interno al procesar el comando.');
        }
    }
}
