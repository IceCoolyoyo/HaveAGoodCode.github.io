"use strict";

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
        static frame = document.body;

        static validateInputInteger(value, input) {
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

        static createNumAndDragBar(type, min, max, dragBarInput) {
            var div = document.createElement('div');
            div.style.position = 'absolute';
            div.style.top = '50%';
            div.style.left = '50%';
            div.style.transform = 'translate(-50%, -50%)'
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.alignItems = 'center';

            var num = document.createElement('input');
            num.id = type + 'num';
            num.type = 'text';
            num.value = '0';
            num.oninput = function () {
                TextBook.validateInputInteger(this.value.trim(), this);
            };
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
            dragBar.oninput = dragBarInput.length === 0 ? function () {
                num.value = this.value;
            } : dragBarInput;

            num.style.textAlign = 'center';

            div.appendChild(num);
            div.appendChild(dragBar);

            return div;
        }

        static int() {
            TextBook.frame.appendChild(TextBook.createNumAndDragBar('int', '-2147483648', '2147483647', ''));
        }

        static long() {
            TextBook.frame.appendChild(TextBook.createNumAndDragBar('long', '-9223372036854775808', '9223372036854775807', function () {
                var val = BigInt(Number(this.value));
                document.getElementById('longnum').value = val > 0 ? val - 1n : val;
            }));
        }

        static short() {
            TextBook.frame.appendChild(TextBook.createNumAndDragBar('short', '-32768', '32767', ''));
        }

        static byte() {
            TextBook.frame.appendChild(TextBook.createNumAndDragBar('byte', '-128', '127', ''));
        }

        static bool() {
            var div = TextBook.createNumAndDragBar('bool', '0', '1', function () { document.getElementById('boolval').value = this.value == 1 ? 'true' : 'false'; });
            div.firstChild.oninput = function () {
                var value = this.value.toLowerCase();
                if (!'true'.startsWith(value) && !'false'.startsWith(value)) {
                    this.value = this.value.startsWith('t') ? 'true'.substring(0, this.value.length - 1) : 'false'.substring(0, this.value.length - 1);
                }
            };
            div.firstChild.value = 'false';
            TextBook.frame.appendChild(div);
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

    let messages = [];

    const DramaType = Object.freeze({
        Ball: 'Ball',
        Function: 'Function',
        Image: 'Image'
    });

    const classList = Object.freeze({
        BallAnimation, TextBook
    });

    class Message {
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
                    var message = string.replace('{goodMsg}', goodMessage);
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
                    obj.src = 'images/' + string;
                    obj.classList.add("checkSize");
                    return new Message(type, obj);

                default:
                    throw new Error(`Unknow type : ${type}, string : ${string}`);
            }
        }
    }

    const AnimationState = Object.freeze({
        IDLE: 'idle',
        TYPING: 'typing',
        EXECUTING_FUNCTION: 'executing_function',
    });

    let animationState = AnimationState.IDLE;

    class KeyAnimation {
        static setObjAnimation(string, obj, runnable) {
            var width = KeyAnimation.calcWidth(string);
            animationState = AnimationState.TYPING;
            obj.innerHTML = string;
            obj.style.display = 'flex';
            obj.style.width = `${width}ch`;
            obj.style.borderRightColor = 'rgb(0, 0, 0)';
            obj.style.animation = `typing ${width / 10}s steps(${string.length}), caret 0.8s steps(1) infinite`;
            setTimeout(() => {
                KeyAnimation.deTypingAnimation(width, obj);
                animationState = AnimationState.IDLE;
                if (runnable) {
                    runnable();
                }
            }, ((width / 10) * 1000) + 500);
        }

        static clearObjAnimation(obj) {
            obj.style.borderRightColor = 'transparent';
            obj.style.animation = ``;
            obj.style.display = 'none';
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
                } else {
                    width += 1;
                }
            }
            return width;
        }
    }

    class MessageID {
        static id = 0;

        static addOne() {
            MessageID.id = MessageID.getPreAdd(1);
        }

        static getPreAdd(num) {
            return (MessageID.id + num) % messages.length;
        }

        static getID() {
            return MessageID.id;
        }
    }

    let goodMessage;

    const allLine = `
        @Ball:歡迎來到Java的世界！
        @Function:jumpOnce();
        @Ball:首先，我們要先知道基本類型。
        @Ball:什麼是類型呢? 類型就是用來讓電腦知道我們要儲存甚麼資料。
        @Ball:很像各種科目。
        @Function:jumpOnce();
        @Ball:「基本類型」就是最基本的「國文與英文」、「數學」
        @Image:types.png
        `;

    async function getGoodMsg() {
        const messageRes = await fetch("https://api.github.com/zen");
        goodMessage = await messageRes.text();
    }

    async function getDrama() {
        // const dramaRes = await fetch("https://raw.githubusercontent.com/HaveAGoodCode/HaveAGoodCode.github.io/refs/heads/main/dramas/drama.drama");
        // const drama = await dramaRes.text();

        // const lines = drama.split('\n');
        var lines = allLine.trim().split('\n');
        for (var index = 0; index < lines.length; index++) {
            messages[index] = Message.createObjWithString(lines[index].replace(/^\s+/, ''));
        }
        console.log(messages);
    }

    async function init() {
        await getGoodMsg();
        await getDrama();
        await click(true);
        eventHook();

        setTimeout(() => {
            var obj = document.getElementById('Illustrate');
            // The element may have been deleted before execution
            if (obj) {
                obj.style.animation = 'fade 2s linear 0s';
                obj.style.display = 'block';
            }
        }, 6000);
    }

    async function click(init) {
        if (animationState !== AnimationState.IDLE) {
            return;
        }

        messages.forEach((chat, index) => {
            if (chat.type === DramaType.Ball && chat.originalMessage.includes('{time}')) {
                messages[index].obj = chat.originalMessage.replace('{time}', getHelloMsg());
            }
        });

        if (!init) {
            document.getElementById('Illustrate')?.remove();
        }

        await processMessage(document.getElementsByClassName('text')[0]);
    }

    async function processMessage(obj) {
        var message = messages[MessageID.getID()];
        switch (message.type) {
            case DramaType.Ball:
                MessageID.addOne();
                var nextMessage = messages[MessageID.getID()];
                var animationCallback = nextMessage.type !== DramaType.Ball
                    ? async () => await processMessage(nextMessage, obj)
                    : null;
                KeyAnimation.setObjAnimation(message.obj, obj, animationCallback);
                return;

            case DramaType.Function:
                await message.obj();
                break;

            case DramaType.Image:
                document.getElementById('lesson-media').appendChild(message.obj);
                break;

            default:
                throw new Error(`Unknow type : ${message.type}`);
        }
        MessageID.addOne();
        var nextMessage = messages[MessageID.getID()];
        if (nextMessage.type !== DramaType.Ball) {
            await processMessage(nextMessage, obj);
        }
    }

    function eventHook() {
        document.getElementById('frame').addEventListener('click', async () => await click(false));
    }

    init();
})()
