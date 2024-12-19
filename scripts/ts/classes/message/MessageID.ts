import { messages } from '../constants/Constants.js';

export default class MessageID {
    public static id: number;

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