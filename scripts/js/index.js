"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Setting from './classes/setting/Setting.js';
import Message, { ballSays, processMessage } from './classes/message/Message.js';
import { DramaType, AnimationState } from './classes/enum/Types.js';
import { animationStates, messages } from './classes/constants/Constants.js';
import MessageID from './classes/message/MessageID.js';
import KeyAnimation from './classes/animation/KeyAnimation.js';
import Doc from './classes/doct/doct.js';
(function () {
    const allLine = `
        @Ball:歡迎來到Java的世界！
        @Ball:Dev Java
        @Function:q1();
        @Ball:Question And Dev Java
        @Function:q2();
        @Ball:「基本類型」就是「國文與英文」、「數學」
        @Function:q3();
        `;
    function click(init) {
        return __awaiter(this, void 0, void 0, function* () {
            if (animationStates[0] !== AnimationState.IDLE) {
                return;
            }
            messages.forEach((chat, index) => {
                if (chat.type === DramaType.Ball && chat.originalMessage !== null && chat.originalMessage.includes(Setting.drama_time)) {
                    messages[index].obj = chat.originalMessage.replace(Setting.drama_time, Message.getHelloMsg());
                }
            });
            if (!init) {
                var illustrate = document.getElementById(Setting.illustrateID);
                if (illustrate !== null) {
                    illustrate.remove();
                }
            }
            yield processMessage();
            window.localStorage.setItem('messageCount', MessageID.getID().toString());
        });
    }
    const init = (function () {
        function getDrama() {
            return __awaiter(this, void 0, void 0, function* () {
                // const dramaRes = await fetch("https://raw.githubusercontent.com/HaveAGoodCode/HaveAGoodCode.github.io/refs/heads/main/dramas/drama.drama");
                // const drama = await dramaRes.text();
                // const lines = drama.split('\n');
                var lines = allLine.trim().split('\n');
                for (var index = 0; index < lines.length; index++) {
                    messages[index] = Message.createObjWithString(lines[index].replace(/^\s+/, ''));
                }
            });
        }
        function restoreState() {
            return __awaiter(this, void 0, void 0, function* () {
                const currentIndex = MessageID.getID();
                if (currentIndex === 0) {
                    yield processMessage();
                    return;
                }
                const upIndex = currentIndex - 1;
                if (upIndex < 0 || upIndex >= messages.length) {
                    throw new Error("Invalid currentMessageID");
                }
                var message = messages[currentIndex];
                let startIndex = -1;
                for (let i = upIndex; i >= 0; i--) {
                    if (messages[i].type === DramaType.Ball) {
                        startIndex = i;
                        break;
                    }
                }
                if (startIndex === -1) {
                    throw new Error("No message with type DramaType.Ball found");
                }
                if (message.type === DramaType.Ball) {
                    for (let i = startIndex; i < currentIndex; i++) {
                        var currentMessage = messages[i];
                        if (currentMessage.type === DramaType.Function) {
                            yield currentMessage.obj();
                        }
                    }
                    KeyAnimation.setObjAnimation(message.obj, ballSays);
                }
                else {
                    for (let i = startIndex; i < currentIndex; i++) {
                        var currentMessage = messages[i];
                        if (currentMessage.type === DramaType.Function) {
                            yield currentMessage.obj();
                        }
                    }
                    KeyAnimation.setObjAnimation(messages[startIndex].obj, ballSays, yield message.obj());
                }
                MessageID.addOne();
            });
        }
        function initAll() {
            return __awaiter(this, void 0, void 0, function* () {
                yield getDrama();
                yield restoreState();
                eventHook();
                setTimeout(() => {
                    var obj = document.getElementById(Setting.illustrateID);
                    // The element may have been deleted before execution
                    if (obj) {
                        obj.style.animation = 'fade 2s linear 0s';
                        obj.style.display = 'block';
                    }
                }, 6000);
            });
        }
        function eventHook() {
            Doc.getElementById(Setting.ballFrameID).addEventListener('click', () => __awaiter(this, void 0, void 0, function* () { return yield click(false); }));
        }
        return initAll;
    })();
    init();
})();
