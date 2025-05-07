export class GroupHandler {
    constructor(kim) {
        this.kim = kim;
    }

    async procesarCambiosGrupo(update) {
        const { id, participants, action } = update;

        const botJid = this.kim.user?.id;
        if (!botJid) {
            console.error("[GroupHandler] No se pudo obtener el JID del bot (this.kim.user.id está indefinido)");
            return;
        }

        const currentPrefix = Array.isArray(global.prefix) ? global.prefix[0] : global.prefix || '.';

        switch (action) {
            case 'add':
                for (const participant of participants) {
                    if (participant === botJid) {
                        await this.kim.sendMessage(id, { text: `¡Hola! Gracias por agregarme al grupo.\nPara ver mis comandos, envía: ${currentPrefix}menu` });
                    } else {
                        await this.kim.sendMessage(id, { text: `¡Bienvenido/a al grupo, @${participant.split('@')[0]}!`, mentions: [participant] });
                    }
                }
                break;

            case 'remove':
                for (const participant of participants) {
                    if (participant !== botJid) {
                        await this.kim.sendMessage(id, { text: `@${participant.split('@')[0]} ha salido del grupo. ¡Hasta luego!`, mentions: [participant] });
                    }
                }
                break;

            case 'promote':
                for (const participant of participants) {
                    await this.kim.sendMessage(id, { text: `@${participant.split('@')[0]} ha sido promovido/a a administrador/a.`, mentions: [participant] });
                }
                break;

            case 'demote':
                for (const participant of participants) {
                    await this.kim.sendMessage(id, { text: `@${participant.split('@')[0]} ya no es administrador/a.`, mentions: [participant] });
                }
                break;

            default:
                console.log(`[GroupHandler] Acción de grupo desconocida: ${action} en el grupo ${id}`);
        }
    }
}
