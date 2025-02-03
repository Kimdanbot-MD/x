import '../utils/config.js' 
import util from 'util'; 

export class ErrorHandler {
  constructor(kim) {
    this.kim = kim;
  }

  async handleError(m, error) {
    console.error(error);

    // Envía un mensaje al propietario del bot informando del error
    const ownerNumber = config.owner[0][0] + '@s.whatsapp.net'; 
    try {
      await this.kim.sendMessage(ownerNumber, { 
        text: `Error en el bot: ${util.format(error)}`, 
        contextInfo: { forwardingScore: 9999999, isForwarded: false } 
      });
    } catch (error) {
      console.error('Error al enviar el mensaje de error al propietario:', error);
    }

    // Envía un mensaje al usuario informando del error
    if (m) {
      try {
        await m.reply("Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.");
      } catch (error) {
        console.error('Error al enviar el mensaje de error al usuario:', error);
      }
    }

    // Manejo de excepciones no capturadas
    process.on('uncaughtException', async (err) => {
      console.error('Excepción no capturada:', err);
      try {
        await this.kim.sendMessage(ownerNumber, { 
          text: `Excepción no capturada: ${util.format(err)}`, 
          contextInfo: { forwardingScore: 9999999, isForwarded: false } 
        });
      } catch (error) {
        console.error('Error al enviar el mensaje de excepción no capturada:', error);
      }
    });
  }
}
