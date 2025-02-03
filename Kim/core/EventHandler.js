import { MessageHandler } from "../modules/messageHandler.js";
import { ConnectionHandler } from "./connectionHandler.js";
import { GroupHandler } from "../Kim/modules/groupHandler.js";
import { ErrorHandler } from "../Kim/modules/errorHandler.js";

export class EventHandler {
  constructor(kim, store, start) {
    this.kim = kim;
    this.store = store;
    this.start = start;
    this.commandHandler = new CommandHandler(kim);
    this.groupHandler = new GroupHandler(kim);
    this.messageHandler = new MessageHandler(kim, store, this.commandHandler);
    this.errorHandler = new ErrorHandler(kim);
    this.connectionHandler = new ConnectionHandler(kim, store, start);
  }

  onConnectionUpdate = (update) => {
    this.connectionHandler.onConnectionUpdate(update);
  }

  onMessageUpsert = async (chatUpdate) => {
    try {
      await this.messageHandler.procesarMensajes(chatUpdate);
    } catch (error) {
      console.error('Error en onMessageUpsert:', error);
      this.errorHandler.handleError(null, error);
    }
  };

  onMessagesUpdate = async (update) => {
    try {
      this.messageHandler.procesarMensajesEditados(update);
    } catch (error) {
      console.error('Error en onMessagesUpdate:', error);
      this.errorHandler.handleError(null, error);
    }
  };

  onGroupParticipantsUpdate = async (update) => {
    try {
      this.groupHandler.procesarCambiosGrupo(update);
    } catch (error) {
      console.error('Error en onGroupParticipantsUpdate:', error);
      this.errorHandler.handleError(null, error);
    }
  };
}
