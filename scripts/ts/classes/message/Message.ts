import { DramaType, classList } from '../enum/Types.js';
import Setting from '../setting/Setting.js';
import { goodMessage } from '../constants/Constants.js';
import KeyAnimation from '../animation/KeyAnimation.js';
import MessageID from '../message/MessageID.js';
import { messages } from '../constants/Constants.js';
import assert from '../assert/assert.js';

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
            var prefix = '@' + type + ":";
            if (string.startsWith(prefix)) {
                return Message.processType(type, string.replace(prefix, ''));
            }
        }
        throw new Error(`Unknow type : ${string}`);
    }

    static processType(type: DramaType, string: string) {
        switch (type) {
            case DramaType.Ball:
                var message: string = string.replace(Setting.drama_fineSentence, goodMessage);
                return new Message(type, message, message);

            case DramaType.Function:
                var name = string.replace(/[();]/g, '');
                var method = null;
                for (let className in classList) {
                    var classObj = classList[className];
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

            case DramaType.Image:
                var obj = document.createElement('img');
                obj.src = Setting.imageSrcFolder + string;
                obj.classList.add(Setting.stableSizeTag);
                return new Message(type, obj);

            default:
                throw new Error(`Unknow type : ${type}, string : ${string}`);
        }
    }

    static getHelloMsg() {
        var hour = new Date().getHours();
        if (hour >= 4 && hour < 12) {
            return Setting.goodMorning;
        } else if (hour >= 12 && hour < 18) {
            return Setting.goodAfterNoon;
        } else {
            return Setting.goodNight;
        }
    }
}

export async function processMessage(obj?: HTMLElement) {
    var message = messages[MessageID.getID()];
    switch (message.type) {
        case DramaType.Ball:
            assert(obj instanceof HTMLElement);
            MessageID.addOne();
            var nextMessage = messages[MessageID.getID()];
            var animationCallback = nextMessage.type !== DramaType.Ball
                ? async () => await processMessage()
                : null;
            KeyAnimation.setObjAnimation(message.obj, obj, animationCallback);
            return;

        case DramaType.Function:
            await message.obj();
            break;

        case DramaType.Image:
            var lessonMedia = document.getElementById(Setting.lessonMediaID);
            assert(lessonMedia !== null);
            lessonMedia.appendChild(message.obj);
            break;

        default:
            throw new Error(`Unknow type : ${message.type}`);
    }
    MessageID.addOne();
    var nextMessage = messages[MessageID.getID()];
    if (nextMessage.type !== DramaType.Ball) {
        await processMessage();
    }
}