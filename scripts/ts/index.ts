"use strict";

import Setting from './classes/setting/Setting.js';
import Message, { processMessage } from './classes/message/Message.js';
import { DramaType, AnimationState } from './classes/enum/Types.js';
import { animationStates, messages } from './classes/constants/Constants.js';
import assert from './classes/assert/assert.js';
import { answer } from './classes/textbook/Question.js';

(function () {
    const allLine = `
        @Ball:歡迎來到Java的世界！
        @Ball:Dev Java
        @Function:q1();
        @Ball:Question And Dev Java
        @Function:q2();
        @Ball:「基本類型」就是「國文與英文」、「數學」
        @Function:compareTable();
        `;

    async function click(init: boolean) {
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

        await processMessage(document.getElementsByClassName(Setting.ballSaysID)[0] as HTMLElement);
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
