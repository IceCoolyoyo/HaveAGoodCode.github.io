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
    private static readonly replaceTypes: Map<DramaType, [string, () => string]> = new Map([
        [DramaType.Ball, [Setting.drama_time, () => Message.getHelloMsg()]]
    ]);

    private static readonly clickType: DramaType[] = [DramaType.Code, DramaType.Ball];

    public static refresh(message: Message): Message {
        for (let [key, value] of this.replaceTypes.entries()) {
            if (message.type === key && message.originalMessage !== null) {
                message.obj = message.originalMessage.replace(value[0] as string, (value[1] as () => string)());
            }
        }
        return new Message(message.type, message.obj, message.originalMessage);
    }

    public static clickOnceContains(type: Message): boolean {
        return this.clickType.includes(type.type);
    }
}