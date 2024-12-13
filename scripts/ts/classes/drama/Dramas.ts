import assert from "../assert/assert.js";
import Message from "../message/Message.js";
import Setting from "../setting/Setting.js";

export enum DramaType {
    Ball = 'Ball',
    Function = 'Function',
    Image = 'Image',
    Code = 'Code',
    Answer = 'Answer'
};

export default class Drama {
    private static readonly replaceTypes: Map<DramaType, [() => string, () => string][]> = new Map([
        [DramaType.Ball, [[() => Setting.drama_time, () => Message.getHelloMsg()]]]
    ]);

    private static readonly clickType: DramaType[] = [DramaType.Code, DramaType.Ball];

    public static refresh(message: Message): Message {
        for (let [targetType, replaceMap] of Drama.replaceTypes.entries()) {

            if (message.type === targetType) {

                assert(message.originalMessage !== null);

                for (let i = 0; i < replaceMap.length; i++) {

                    const [replaceString, replaceTarget]: [() => string, () => string] = replaceMap[i];

                    message.obj = message.originalMessage.replace(replaceString(), replaceTarget());
                }
            }
        }
        return Object.assign(message, { obj: message.obj });
    }

    public static clickOnceContains(type: Message): boolean {
        return Drama.clickType.includes(type.type);
    }
}