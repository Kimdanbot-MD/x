export class CommandHandler {
  constructor(kim) {
    this.kim = kim;
  }

  async handleCommand(m, command) {
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
            if (!isOwner) return m.reply(mess.owner);
            try {
              return m.reply(JSON.stringify(eval(m.text.slice(2)), null, '\t'));
            } catch (e) {
              return m.reply(String(e));
            }}
          if (m.text.startsWith('=>')) {
            if (!isOwner) return m.reply(mess.owner);
            try {
              let result = await eval(`(async () => { ${m.text.slice(3)} })()`);
              return m.reply(JSON.stringify(result, null, '\t'));
            } catch (e) {
              return m.reply(String(e));
            }}
          if (m.text.startsWith('$')) {
            if (!isOwner) return m.reply(mess.owner);
            try {
              return m.reply(String(execSync(m.text.slice(2), { encoding: 'utf-8' })));
            } catch (err) {
              console.error(err);
              return m.reply(String(err));
            }}
          await m.reply('Comando no encontrado.');
      }
    } catch (error) {
      console.error('Error al ejecutar el comando:', error);
      await m.reply('Ha ocurrido un error al ejecutar el comando.');
    }}}
