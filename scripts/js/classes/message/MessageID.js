import { messages } from '../constants/Constants.js';
class MessageID {
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
(() => {
    var v = Number(window.localStorage.getItem('messageCount'));
    MessageID.id = Number.isNaN(v) ? -1 : v;
})();
export default MessageID;
