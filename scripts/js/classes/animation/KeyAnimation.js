import { AnimationState } from '../enum/Types.js';
import { animationStates } from '../constants/Constants.js';
export default class KeyAnimation {
    static setObjAnimation(string, obj, runnable) {
        var width = KeyAnimation.calcWidth(string);
        animationStates[0] = AnimationState.TYPING;
        obj.innerHTML = string;
        obj.style.width = `${width}ch`;
        obj.style.borderRightColor = 'rgb(0, 0, 0)';
        obj.style.animation = `typing ${width / 10}s steps(${string.length}), caret 0.8s steps(1) infinite`;
        setTimeout(() => {
            KeyAnimation.clearObjAnimation(obj);
            animationStates[0] = AnimationState.IDLE;
            if (runnable) {
                runnable();
            }
        }, ((width / 10) * 1000) + 500);
    }
    static clearObjAnimation(obj) {
        obj.style.borderRightColor = 'transparent';
        obj.style.animation = ``;
    }
    static deTypingAnimation(width, obj) {
        obj.style.animation = `deTyping ${width / 10}s steps(${obj.innerHTML.length}), caret 0.8s steps(1) infinite`;
        setTimeout(() => {
            KeyAnimation.clearObjAnimation(obj);
        }, ((width / 10) * 1000));
    }
    static calcWidth(string) {
        var width = 0;
        for (var char of string) {
            if (/[\u4e00-\u9fa5\uff0c\u3002\u3001\u300c\u300d\uff1b\uff1a\uff08\uff09\uff1f\uff01\u3010\u3011\u300a\u300b\u2014\u2026\u2013\u2018\u201c\u201d\uff0e]/.test(char)) {
                width += 2;
            }
            else {
                width += 1;
            }
        }
        return width;
    }
}
