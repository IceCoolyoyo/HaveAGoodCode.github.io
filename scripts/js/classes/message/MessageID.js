import { messages } from '../constants/Constants.js';
export default class MessageID {
    static addOne() {
        MessageID.id = MessageID.getPreAdd(1);
    }
    static addOneAndGet() {
        MessageID.id = MessageID.getPreAdd(1);
        return messages[MessageID.getID()];
    }
    static getPreAdd(num) {
        return (MessageID.id + num) % messages.length;
    }
    static getID() {
        return MessageID.id;
    }
}
