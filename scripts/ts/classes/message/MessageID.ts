import { messages } from '../constants/Constants.js';

export default class MessageID {
    static id = 0;

    static addOne() {
        MessageID.id = MessageID.getPreAdd(1);
    }

    static getPreAdd(num: number) {
        return (MessageID.id + num) % messages.length;
    }

    static getID() {
        return MessageID.id;
    }
}