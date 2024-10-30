export class GroupHandler {
  constructor(kim) {
    this.kim = kim;
  }

  async procesarCambiosGrupo(update) {
    const { id, participants, action } = update;
    const botNumber = this.kim.user.id.split(':')[0] + '@s.whatsapp.net'; 

    switch (action) {
      case 'add':
        // Enviar mensaje de bienvenida a los nuevos participantes
        for (const participant of participants) {
          if (participant === botNumber) {
            await this.kim.sendMessage(id, { text: `Hola! Gracias por agregarme al grupo. Para ver la lista de comandos, envía ${prefix}menu` });
          } else {
            await this.kim.sendMessage(id, { text: `¡Bienvenido/a al grupo, @${participant.split('@')[0]}!` , mentions: [participant]});
          }
        }
        break;

      case 'remove':
        // Enviar mensaje de despedida a los participantes que salen
        for (const participant of participants) {
          if (participant !== botNumber) {
            await this.kim.sendMessage(id, { text: `@${participant.split('@')[0]} ha salido del grupo. ¡Hasta luego!`, mentions: [participant] });
          }
        }
        break;

      case 'promote':
        // Notificar que un usuario ha sido promovido a administrador
        for (const participant of participants) {
          await this.kim.sendMessage(id, { text: `@${participant.split('@')[0]} ha sido promovido/a a administrador/a.`, mentions: [participant] });
        }
        break;

      case 'demote':
        // Notificar que un usuario ha sido degradado de administrador
        for (const participant of participants) {
          await this.kim.sendMessage(id, { text: `@${participant.split('@')[0]} ya no es administrador/a.`, mentions: [participant] });
        }
        break;

      default:
        console.log(`Acción de grupo desconocida: ${action}`);
    }
  }
}
