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
        for (let [targetType, replaceMap] of Drama.replaceTypes.entries()) {
            if (message.type === targetType) {
                assert(message.originalMessage !== null);
                for (let i = 0; i < replaceMap.length; i++) {
                    const [replaceString, replaceTarget] = replaceMap[i];
                    message.obj = message.originalMessage.replace(replaceString(), replaceTarget());
                }
            }
        }
        return Object.assign(message, { obj: message.obj });
    }
    static clickOnceContains(type) {
        return Drama.clickType.includes(type.type);
    }
}
Drama.replaceTypes = new Map([
    [DramaType.Ball, [[() => Setting.drama_time, () => Message.getHelloMsg()]]]
]);
Drama.clickType = [DramaType.Code, DramaType.Ball];
export default Drama;
