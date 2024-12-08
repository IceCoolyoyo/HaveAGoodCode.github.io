var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DramaType, classList } from '../enum/Types.js';
import Setting from '../setting/Setting.js';
import { goodMessage } from '../constants/Constants.js';
import KeyAnimation from '../animation/KeyAnimation.js';
import MessageID from '../message/MessageID.js';
import { messages } from '../constants/Constants.js';
import Doc from '../doct/doct.js';
export default class Message {
    constructor(type, obj, originalMessage = null) {
        if (type === DramaType.Ball && originalMessage === null) {
            throw new Error("OriginalMessage cannot be null when type is Ball!");
        }
        this.originalMessage = originalMessage;
        this.type = type;
        this.obj = obj;
    }
    static createObjWithString(string) {
        for (let type of Object.values(DramaType)) {
            var prefix = '@' + type + ":";
            if (string.startsWith(prefix)) {
                return Message.processType(type, string.replace(prefix, ''));
            }
        }
        throw new Error(`Unknow type : ${string}`);
    }
    static processType(type, string) {
        switch (type) {
            case DramaType.Ball:
                var message = string.replace(Setting.drama_fineSentence, goodMessage);
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
                return new Message(DramaType.Function, function () { var _a; (_a = document.getElementById("left")) === null || _a === void 0 ? void 0 : _a.appendChild(obj); });
            default:
                throw new Error(`Unknow type : ${type}, string : ${string}`);
        }
    }
    static getHelloMsg() {
        var hour = new Date().getHours();
        if (hour >= 4 && hour < 12) {
            return Setting.goodMorning;
        }
        else if (hour >= 12 && hour < 18) {
            return Setting.goodAfterNoon;
        }
        else {
            return Setting.goodNight;
        }
    }
}
export const ballSays = Doc.getElementById(Setting.ballSaysID);
export function processMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        var message = messages[MessageID.getID()];
        switch (message.type) {
            case DramaType.Ball:
                MessageID.addOne();
                var nextMessage = messages[MessageID.getID()];
                var animationCallback = nextMessage.type !== DramaType.Ball
                    ? () => __awaiter(this, void 0, void 0, function* () {
                        yield processMessage();
                    })
                    : null;
                KeyAnimation.setObjAnimation(message.obj, ballSays, animationCallback);
                return;
            case DramaType.Function:
                yield message.obj();
                break;
            // case DramaType.Image:
            //     var lessonMedia = document.getElementById(Setting.lessonMediaID);
            //     assert(lessonMedia !== null);
            //     lessonMedia.appendChild(message.obj);
            //     break;
            default:
                throw new Error(`Unknow type : ${message.type}`);
        }
        MessageID.addOne();
        var nextMessage = messages[MessageID.getID()];
        if (nextMessage.type !== DramaType.Ball) {
            yield processMessage();
        }
        return MessageID.getID();
    });
}
