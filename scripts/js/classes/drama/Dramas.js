import Message from "../message/Message.js";
import Setting from "../setting/Setting.js";
export var DramaType;
(function (DramaType) {
    DramaType["Ball"] = "Ball";
    DramaType["Function"] = "Function";
    DramaType["Image"] = "Image";
    DramaType["Code"] = "Code";
    DramaType["Answer"] = "Answer";
})(DramaType || (DramaType = {}));
;
class Drama {
    static refresh(message) {
        for (let [key, value] of this.replaceTypes.entries()) {
            if (message.type === key && message.originalMessage !== null) {
                message.obj = message.originalMessage.replace(value[0], value[1]());
            }
        }
        return new Message(message.type, message.obj, message.originalMessage);
    }
    static clickOnceContains(type) {
        return this.clickType.includes(type.type);
    }
}
Drama.replaceTypes = new Map([
    [DramaType.Ball, [Setting.drama_time, () => Message.getHelloMsg()]]
]);
Drama.clickType = [DramaType.Code, DramaType.Ball];
export default Drama;
