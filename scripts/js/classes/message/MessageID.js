import { messages } from '../constants/Constants.js';
export default class MessageID {
    static addOne() {
        MessageID.id = MessageID.getPreAdd(1);
    }
    static getPreAdd(num) {
        return (MessageID.id + num) % messages.length;
    }
    static getID() {
        return MessageID.id;
    }
}
