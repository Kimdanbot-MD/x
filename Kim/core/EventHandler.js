import { MessageHandler } from "../modules/messageHandler.js";
import { ConnectionHandler } from "./ConnectionHandler.js";
import { GroupHandler } from "../modules/groupHandler.js";
import { ErrorHandler } from "../modules/errorHandler.js";
import { CommandHandler } from "./CommandHandler.js";

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
            console.error('[EventHandler] Error en onMessageUpsert:', error);
            this.errorHandler.handleError(chatUpdate, error);
        }
    };

    onMessagesUpdate = async (update) => {
        try {
            this.messageHandler.procesarMensajesEditados(update);
        } catch (error) {
            console.error('[EventHandler] Error en onMessagesUpdate:', error);
            this.errorHandler.handleError(update, error);
        }
    };

    onGroupParticipantsUpdate = async (update) => {
        try {
            this.groupHandler.procesarCambiosGrupo(update);
        } catch (error) {
            console.error('[EventHandler] Error en onGroupParticipantsUpdate:', error);
            this.errorHandler.handleError(update, error);
        }
    };
}
