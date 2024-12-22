import assert from "../assert/assert.js";
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
        for (let [targetType, replaceMap] of Drama.replaceTypes) {
            if (message.type === targetType) {
                assert(message.originalMessage !== null);
                let updatedMessage = message.originalMessage;
                for (const [replaceString, replaceTarget] of replaceMap) {
                    updatedMessage = updatedMessage.replace(replaceString(), replaceTarget());
                }
                message.obj = updatedMessage;
                break;
            }
        }
        return message;
    }
    static clickOnceContains(type) {
        return Drama.clickType.includes(type.type);
    }
}
Drama.replaceTypes = new Map([
    [
        DramaType.Ball,
        new Map([
            [() => Setting.drama_time, () => Message.getHelloMsg()]
        ])
    ]
]);
Drama.clickType = [DramaType.Code, DramaType.Ball];
export default Drama;
