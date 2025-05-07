import util from 'util';

export class ErrorHandler {
    constructor(kim) {
        this.kim = kim;
    }

    async handleError(context, error) {
        console.error("[ErrorHandler] Error recibido:", error);
        if (context) {
            console.error("[ErrorHandler] Contexto del error:", context);
        }

        const ownerJid = global.owner && global.owner.length > 0 && global.owner[0].length > 0
            ? global.owner[0][0] + '@s.whatsapp.net'
            : null;

        if (ownerJid && this.kim) {
            try {
                await this.kim.sendMessage(ownerJid, {
                    text: `⚠️ Error en el bot ⚠️:\n\n${util.format(error)}`
                });
            } catch (sendError) {
                console.error('[ErrorHandler] Error al enviar el mensaje de error al propietario:', sendError);
            }
        } else {
            console.error("[ErrorHandler] No se pudo determinar el JID del propietario o 'kim' no está disponible.");
        }

        if (context && typeof context.reply === 'function') {
            try {
                await context.reply(global.mess?.error || "Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.");
            } catch (replyError) {
                console.error('[ErrorHandler] Error al enviar el mensaje de error al usuario:', replyError);
            }
        }
    }
}
