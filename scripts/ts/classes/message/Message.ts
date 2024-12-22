import { classList } from '../enum/Types.js';
import Setting from '../setting/Setting.js';
import { goodMessage } from '../constants/Constants.js';
import KeyAnimation from '../animation/KeyAnimation.js';
import MessageID from '../message/MessageID.js';
import { messages } from '../constants/Constants.js';
import CodeFrame from '../code_frame/code.js';
import Codes from '../../Codes.js';
import Question from '../textbook/Question.js';
import Drama, { DramaType } from '../drama/Dramas.js';

export default class Message {
    type: DramaType;
    obj: any;
    originalMessage: string | null;

    constructor(type: DramaType, obj: any, originalMessage: string | null = null) {
        if (type === DramaType.Ball && originalMessage === null) {
            throw new Error("OriginalMessage cannot be null when type is Ball!");
        }
        this.originalMessage = originalMessage;
        this.type = type;
        this.obj = obj;
    }

    static createObjWithString(string: string) {
        for (let type of Object.values(DramaType)) {
            const prefix = '@' + type + ":";
            if (string.startsWith(prefix)) {
                return Message.processType(type, string.replace(prefix, ''));
            }
        }
        throw new Error(`Unknow type : ${string}`);
    }

    static processType(type: DramaType, string: string) {
        switch (type) {
            case DramaType.Ball: {
                const message: string = string.replace(Setting.drama_fineSentence, goodMessage);
                return new Message(type, message, message);
            }

            case DramaType.Function: {
                const name = string.replace(/[();]/g, '');
                let method = null;
                for (let className in classList) {
                    const classObj = classList[className];
                    if (classObj) {
                        method = classObj[name];
                        if (typeof method === 'function') {
                            break;
                        }
                    }
                }
                if (typeof method !== 'function') {
                    throw new Error(`Unknow function : ${method}, name : ${name}`);
                }
                return new Message(type, method);
            }

            case DramaType.Image: {
                const obj = document.createElement('img');
                obj.src = Setting.imageSrcFolder + string;
                return new Message(DramaType.Function, function () { document.getElementById("left")?.appendChild(obj) });
            }

            case DramaType.Code: {
                const obj = CodeFrame.createCodeFrame(Codes[string]);
                return new Message(DramaType.Code, function code() { document.getElementById("left")?.appendChild(obj) });
            }

            case DramaType.Answer: {
                return new Message(DramaType.Function, function answer() { Question.answer = string });
            }

            default: {
                throw new Error(`Unknow type : ${type}, string : ${string}`);
            }
        }
    }

    static getHelloMsg() {
        const hour = new Date().getHours();
        if (hour >= 4 && hour < 12) {
            return Setting.goodMorning;
        } else if (hour >= 12 && hour < 18) {
            return Setting.goodAfterNoon;
        } else {
            return Setting.goodNight;
        }
    }
}


export function createNewTextLine(): HTMLElement {
    const div: HTMLElement = document.createElement("div");
    div.id = "question-title";
    (document.getElementById("left") as HTMLElement).appendChild(div);
    return div;
}

export async function processMessage() {
    const message = Drama.refresh(messages[MessageID.getID()]);
    switch (message.type) {
        case DramaType.Ball: {
            if (Drama.clickOnceContains(MessageID.addOneAndGet())) {
                KeyAnimation.setObjAnimation(message.obj, createNewTextLine());
            } else {
                KeyAnimation.setObjAnimation(message.obj, createNewTextLine(), async () => await processMessage());
            }
            return;
        }

        case DramaType.Code: {
            if (Drama.clickOnceContains(MessageID.addOneAndGet())) {
                KeyAnimation.setObjAnimation2(message.obj);
            } else {
                KeyAnimation.setObjAnimation2(async () => await processMessage());
            }
            return;
        }

        case DramaType.Function: {
            await message.obj();
            break;
        }

        default: {
            throw new Error(`Unknow type : ${message.type}`);
        }
    }
    MessageID.addOne();
    const nextMessage = messages[MessageID.getID()];
    if (!Drama.clickOnceContains(nextMessage)) {
        await processMessage();
    }
    return MessageID.getID();
}