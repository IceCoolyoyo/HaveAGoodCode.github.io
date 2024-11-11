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
        Prompt: 'Prompt'
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
                    var method = BallAnimation[name];
                    if (typeof method !== 'function') {
                        method = TextBook[name];
                    }
                    if (typeof method !== 'function') {
                        throw new Error(`Unknow function : ${method}, name : ${name}`);
                    }
                    return new Message(type, method);

                case DramaType.Prompt:
                    throw new Error(`Unsupport`);

                default:
                    throw new Error(`Unknow type : ${type}, string : ${string}`);
            }
        }
    }

    let goodMessage;

    const allLine =`
        @Ball:{goodMsg}
        @Ball:您好！，{time}，初次見面，我的名字是小遥。
        @Function:jumpOnce();
        @Ball:歡迎來到 Java 的世界！
        @Function:jumpOnce();
        @Ball:讓我來為您介紹一下基本類型。
        @Ball:這是 Integer，Java 當中最常用、最基本的類型。
        @Function:int();
        @Ball:請務必記住它的範圍：-2,147,483,648 ~ 2,147,483,647。
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
    }

    async function init() {
        await getGoodMsg();
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
        }, 6000);
    }

    let canContinue = true;
    let id = 0;

    function click(init) {
        if (!canContinue) return;

        messages.forEach((chat, index) => {
            if (chat.type === DramaType.Ball && chat.originalMessage.includes('{time}')) {
                messages[index].obj = chat.originalMessage.replace('{time}', getHelloMsg());
            }
        });

        const textElement = document.getElementsByClassName('text')[0];

        !init && document.getElementById('Illustrate')?.remove();

        textElement.innerHTML = messages[id].obj;

        let width = [...textElement.innerHTML].reduce((acc, char) => acc + (/[\u4e00-\u9fa5\uff0c\u3002\u3001\u300c\u300d\uff1b\uff1a\uff08\uff09\uff1f\uff01\u3010\u3011\u300a\u300b\u2014\u2026\u2013\u2018\u201c\u201d\uff0e]/.test(char) ? 2 : 1), 0);
        textElement.style.width = `${width}ch`;
        textElement.style.borderRightColor = 'rgb(0, 0, 0)';
        textElement.style.animation = `typing ${width / 10}s steps(${textElement.innerHTML.length}), caret 0.8s steps(1) infinite`;

        canContinue = false;

        var isCall = messages[id + 1] && messages[id + 1].type === DramaType.Function;

        id = (id + 1) % messages.length;

        setTimeout(() => {
            textElement.style.animation = '';
            textElement.style.borderRightColor = 'transparent';
            if (isCall) {
                messages[id].obj();
                id = (id + 1) % messages.length;
            }
            canContinue = true;
        }, ((width / 10) * 1000) + 500);
    }

    function eventHook() {
        document.getElementById('frame').addEventListener('click', () => click(false));
    }

    init();
})()
