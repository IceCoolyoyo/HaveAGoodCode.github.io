import { messages } from '../constants/Constants.js';
import Message from './Message.js';

export default class MessageID {
    public static id: number;

    public static addOne(): void {
        MessageID.id = MessageID.getPreAdd(1);
    }

    public static addOneAndGet(): Message {
        MessageID.id = MessageID.getPreAdd(1);
        return messages[MessageID.getID()];
    }

    public static getPreAdd(num: number): number {
        return (MessageID.id + num) % messages.length;
    }

    public static getID(): number {
        return MessageID.id;
    }
}