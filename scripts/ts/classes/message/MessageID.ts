import { messages } from '../constants/Constants.js';

export default class MessageID {
    static id: number;

    static {
        var v = Number(window.localStorage.getItem('messageCount'));
        MessageID.id = Number.isNaN(v) ? 0 : v;
    }

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