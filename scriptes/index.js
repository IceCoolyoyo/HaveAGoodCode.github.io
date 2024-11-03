"use strict";

function validateInputInteger(value, input) {
    var type = input.id.replace('num', '');
    var obj = document.getElementById(type);
    let min = parseInt(obj.min, 10);
    let max = parseInt(obj.max, 10);

    var intValue = parseInt(value, 10);
    if (value.length > 1 && value.includes('-') && value[0] !== '-') {
        // 負號在奇怪的位置
        input.value = value.replace('-', '');
    } else if ((value.match(/-/g) || []).length > 1 || value === '-0') {
        // 多個負號 或是 -0 
        input.value = 0;
    } else if (intValue < min || intValue > max) {
        // 值太大或太小
        input.value = (intValue < min) ? min : max;
    } else if (value.length > 1 && value[0] === '0') {
        // 以不必要的0開頭
        input.value = value.replace(/^0+/, '');
    }
    obj.value = input.value;
}

(function () {
    class BallAnimation {
        static objs = [document.getElementById('ball'), document.getElementById('shadow')];

        static remove(animationId) {
            BallAnimation.objs.forEach(obj => obj.classList.remove(animationId));
        }

        static add(animationId) {
            BallAnimation.objs.forEach(obj => obj.classList.add(animationId));
        }

        static jump() {
            BallAnimation.remove('roll');
            BallAnimation.add('jump');
        }

        static roll() {
            BallAnimation.add('roll');
            BallAnimation.remove('jump');
        }

        static normal() {
            BallAnimation.remove('roll');
            BallAnimation.remove('jump');
        }

        static jumpOnce() {
            BallAnimation.jump();
            setTimeout(() => BallAnimation.normal(), 800 + 10);
        }
    }

    class TextBook {
        static frame = document.getElementById('frame');

        static createNumAndDragBar(type, min, max, dragBarInput) {
            var num = document.createElement('input');
            num.id = type + 'num';
            num.type = 'text';
            num.value = '0';
            num.oninput = 'validateInputInteger(this.value.trim(), this)';
            num.addEventListener('keydown', (event) => {
                        if ((event.key === 'Backspace') || (event.key === 'Delete') ||
                            (event.key === 'ArrowLeft') || (event.key === 'ArrowRight') || (event.key === 'Enter') ||
                            (event.key === '-')) {
                            return;
                        }

                        if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                        }
                    });

            var dragBar = document.createElement('input');
            dragBar.id = type;
            dragBar.type = 'range';
            dragBar.value = '0';
            dragBar.min = min;
            dragBar.max = max;
            dragBar.oninput = dragBarInput.length === 0 ? 'document.getElementById(\'' + num.id + '\').value = this.value' : dragBarInput;

            return [num, dragBar];
        }

        static int() {
            this.createNumAndDragBar('int', '-2147483648', '2147483647', '').forEach(obj => frame.appendChild(obj));
        }

        static long() {
            this.createNumAndDragBar('long', '-9223372036854775808', '9223372036854775807', `
                var val = BigInt(Number(this.value));
                document.getElementById('longnum').value = val > 0 ? val - 1n : val;`
            ).forEach(obj => frame.appendChild(obj));
        }

        static short() {
            this.createNumAndDragBar('short', '-32768', '32767', '').forEach(obj => frame.appendChild(obj));
        }

        static byte() {
            this.createNumAndDragBar('byte', '-128', '127', '').forEach(obj => frame.appendChild(obj));
        }

        static bool() {
            var array = this.createNumAndDragBar('bool', '0', '1', `document.getElementById('boolval').value = this.value == 1 ? 'true' : 'false'`);
            array[0].oninput = `
            var value = this.value.toLowerCase();
            if (!'true'.startsWith(value) && !'false'.startsWith(value)) {
                this.value = this.value.startsWith('t') ? 'true'.substring(0, this.value.length - 1) : 'false'.substring(0, this.value.length - 1);
            }`;
            array[0].value = 'false';
            array.forEach(obj => frame.appendChild(obj));
        }
    }

    function getHelloMsg() {
        var hour = new Date().getHours();
        if (hour >= 4 && hour < 12) {
            return "早安";
        } else if (hour >= 12 && hour < 18) {
            return "午安";
        } else {
            return "晚安";
        }
    }

    let chats = [];
    let oChats = [];
    let calls = [];

    async function getDrama() {
        // Get the drama and split it into lines and random good sentences
        const [dramaRes, messageRes] = await Promise.all([
            fetch("https://raw.githubusercontent.com/HaveAGoodCode/HaveAGoodCode.github.io/refs/heads/main/dramas/drama.drama"),
            fetch("https://api.github.com/zen")
        ]);
        const [drama, message] = await Promise.all([dramaRes.text(), messageRes.text()]);
        const lines = drama.split('\n');

        for (var index = 0; index < lines.length; index++) {
            var line = lines[index];
            if (line.startsWith('@Ball:')) {
                // Since the good message is random and will not change over time, the original message and message are directly replaced
                // The original message removes the beginning of '@ball:' and has a length of 6
                oChats[index] = line.substring(6).replace('{goodMsg}', message);
                chats[index] = oChats[index];
            } else if (line.startsWith('@Function:')) {
                var name = line.replace('@Function:', '').replace('(', '').replace(')', '').replace(';', '');
                var method = BallAnimation[name];
                if (typeof method !== 'function') {
                    method = TextBook[name];
                }
                if (typeof method === 'function') {
                    calls[index] = method;
                    // Prevent the message get from being undefined or null
                    oChats[index] = '';
                    chats[index] = oChats[index];
                }
            }
        }
    }

    async function init() {
        await getDrama();
        click(true);
        eventHook();

        setTimeout(() => {
            var obj = document.getElementById('Illustrate');
            // The element may have been deleted before execution
            if (obj) {
                obj.style.animation = 'fade 2s linear 0s';
                obj.style.display = 'block';
            }
        }, 8000);
    }

    function click(init) {
        // If the time has changed (not checked)
        for (var index = 0; index < oChats.length; index++) {
            var chat = oChats[index];
            if (chat.includes('{time}')) {
                chats[index] = chat.replace('{time}', getHelloMsg());
            }
        }

        const textElement = document.getElementsByClassName('text')[0];

        // If it is the first click, obj != null, delete the prompt
        // Otherwise, it is null and no operation is performed
        if (!init) {
            var obj = document.getElementById('Illustrate');
            if (obj) {
                obj.remove();
            }
        }

        // If the next element is '', it is a method call
        var isCall = false;
        if (chats[(parseInt(textElement.id, 10) + 1) % chats.length].length === 0) {
            isCall = true;
        }
        // Set text of the chat
        textElement.innerHTML = chats[parseInt(textElement.id, 10)];

        // Calc width (chinese char and chinese sige +2, english char and normal sige +1)
        let width = 0;
        for (let char of textElement.innerHTML) {
            width += /[\u4e00-\u9fa5\uff0c\u3002\u3001\u300c\u300d\uff1b\uff1a\uff08\uff09\uff1f\uff01\u3010\u3011\u300a\u300b\u2014\u2026\u2013\u2018\u201c\u201d\uff0e]/.test(char) ? 2 : 1;
        }
        textElement.style.width = width + 'ch';

        // Show the caret
        textElement.style.borderRightColor = 'rgb(0, 0, 0)';

        // Appear letter by letter, with a blinking caret
        textElement.style.animation = 'typing ' + (width / 10) + 's steps(' + textElement.innerHTML.length + '), caret 0.8s steps(1) infinite';

        // Id+1，stay in scope, possibly a method call
        textElement.id = (parseInt(textElement.id, 10) + 1) % chats.length;

        setTimeout(() => {
            // Make the caret disappear after typing is complete
            textElement.style.animation = '';
            textElement.style.borderRightColor = 'transparent';
            // If it is a method call
            if (isCall) {
                // Call it!
                calls[parseInt(textElement.id, 10)]();
                // Override method id
                textElement.id = (parseInt(textElement.id, 10) + 1) % chats.length;
            }
        }, ((width / 10) * 1000) + 500);
    }

    function eventHook() {
        document.getElementById('frame').addEventListener('click', () => click(false));
    }

    init();
})()