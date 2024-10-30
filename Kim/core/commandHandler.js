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
          await m.reply('Comando no encontrado.');
      }
    } catch (error) {
      console.error('Error al ejecutar el comando:', error);
      await m.reply('Ha ocurrido un error al ejecutar el comando.');
    }
  }
}
