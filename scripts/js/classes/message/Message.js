var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            const prefix = '@' + type + ":";
            if (string.startsWith(prefix)) {
                return Message.processType(type, string.replace(prefix, ''));
            }
        }
        throw new Error(`Unknow type : ${string}`);
    }
    static processType(type, string) {
        switch (type) {
            case DramaType.Ball: {
                const message = string.replace(Setting.drama_fineSentence, goodMessage);
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
                return new Message(DramaType.Function, function () { var _a; (_a = document.getElementById("left")) === null || _a === void 0 ? void 0 : _a.appendChild(obj); });
            }
            case DramaType.Code: {
                const obj = CodeFrame.createCodeFrame(Codes[string]);
                return new Message(DramaType.Code, function code() { var _a; (_a = document.getElementById("left")) === null || _a === void 0 ? void 0 : _a.appendChild(obj); });
            }
            case DramaType.Answer: {
                return new Message(DramaType.Function, function answer() { Question.answer = string; });
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
        }
        else if (hour >= 12 && hour < 18) {
            return Setting.goodAfterNoon;
        }
        else {
            return Setting.goodNight;
        }
    }
}
export function createNewTextLine() {
    const div = document.createElement("div");
    div.id = "question-title";
    div.style.width = 'auto';
    document.getElementById("left").appendChild(div);
    return div;
}
export function processMessage() {
    return __awaiter(this, void 0, void 0, function* () {
        const message = Drama.refresh(messages[MessageID.getID()]);
        switch (message.type) {
            case DramaType.Ball: {
                if (Drama.clickOnceContains(MessageID.addOneAndGet())) {
                    KeyAnimation.setObjAnimation(message.obj, createNewTextLine());
                }
                else {
                    KeyAnimation.setObjAnimation(message.obj, createNewTextLine(), () => __awaiter(this, void 0, void 0, function* () { return yield processMessage(); }));
                }
                return;
            }
            case DramaType.Code: {
                if (Drama.clickOnceContains(MessageID.addOneAndGet())) {
                    KeyAnimation.setObjAnimation2(message.obj);
                }
                else {
                    KeyAnimation.setObjAnimation2(() => __awaiter(this, void 0, void 0, function* () { return yield processMessage(); }));
                }
                return;
            }
            case DramaType.Function: {
                yield message.obj();
                break;
            }
            default: {
                throw new Error(`Unknow type : ${message.type}`);
            }
        }
        MessageID.addOne();
        const nextMessage = messages[MessageID.getID()];
        if (!Drama.clickOnceContains(nextMessage)) {
            yield processMessage();
        }
        return MessageID.getID();
    });
}
