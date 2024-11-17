"use strict";

import Setting from './classes/setting/Setting.js';
import Message from './classes/message/Message.js';
import KeyAnimation from './classes/animation/KeyAnimation.js';
import MessageID from './classes/message/MessageID.js';
import { DramaType, AnimationState } from './classes/enum/Types.js';
import { animationStates, messages } from './classes/constants/Constants.js';
import assert from './classes/assert/assert.js';

(function () {
    const allLine = `
        @Ball:歡迎來到Java的世界！
        @Function:jumpOnce();
        @Ball:首先，請讓我先介紹一下基本類型：
        @Ball:什麼是類型呢？
        @Ball:類型就是用來讓電腦知道我們要儲存甚麼資料
        @Ball:所以其實「基本類型」就是「國文與英文」、「數學」
        @Function:compareTable();
        `;

    async function click(init) {
        if (animationStates[0] !== AnimationState.IDLE) {
            return;
        }

        messages.forEach((chat, index) => {
            if (chat.type === DramaType.Ball && chat.originalMessage !== null && chat.originalMessage.includes(Setting.drama_time)) {
                messages[index].obj = chat.originalMessage.replace(Setting.drama_time, Message.getHelloMsg());
            }
        });

        if (!init) {
            document.getElementById(Setting.illustrateID)?.remove();
        }

        await processMessage(document.getElementsByClassName(Setting.ballSaysID)[0]);
    }

    async function processMessage(obj) {
        var message = messages[MessageID.getID()];
        switch (message.type) {
            case DramaType.Ball:
                MessageID.addOne();
                var nextMessage = messages[MessageID.getID()];
                var animationCallback = nextMessage.type !== DramaType.Ball
                    ? async () => await processMessage(nextMessage)
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
            await processMessage(nextMessage);
        }
    }

    const init = (function () {
        async function getDrama() {
            // const dramaRes = await fetch("https://raw.githubusercontent.com/HaveAGoodCode/HaveAGoodCode.github.io/refs/heads/main/dramas/drama.drama");
            // const drama = await dramaRes.text();
            // const lines = drama.split('\n');
            var lines = allLine.trim().split('\n');
            for (var index = 0; index < lines.length; index++) {
                messages[index] = Message.createObjWithString(lines[index].replace(/^\s+/, ''));
            }
        }
    
        async function initAll() {
            await getDrama();
            await click(true);
            eventHook();
    
            setTimeout(() => {
                var obj = document.getElementById(Setting.illustrateID);
                // The element may have been deleted before execution
                if (obj) {
                    obj.style.animation = 'fade 2s linear 0s';
                    obj.style.display = 'block';
                }
            }, 6000);
        }

        function eventHook() {
            var ballFrame = document.getElementById(Setting.ballFrameID);
            assert(ballFrame !== null);
            ballFrame.addEventListener('click', async () => await click(false));
        }

        return initAll;
    })();

    init();
})()
