import { DramaType, classList} from '../enum/Types.js';
import Setting from '../setting/Setting.js';
import { goodMessage } from '../constants/Constants.js';

export default class Message {
    constructor(type, obj, originalMessage = null) {
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