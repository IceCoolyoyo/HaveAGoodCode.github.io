import Message, { createNewTextLine, processMessage } from './classes/message/Message.js';
import { messages } from './classes/constants/Constants.js';
import MessageID from './classes/message/MessageID.js';
import KeyAnimation from './classes/animation/KeyAnimation.js';
import LocalStorageApi, { StorageType } from './classes/localStorage/LocalStorageApi.js';
import Question from './classes/textbook/Question.js';
import DirectoryManager from './classes/directory/Directory.js';
import { Part } from './Drama.js';
import Drama, { DramaType } from './classes/drama/Dramas.js';

(function () {
    const _ = class {
        static {
            this.initAll();
        }

        private static async click(): Promise<void> {
            if (!KeyAnimation.canCountinue) {
                return;
            }

            await processMessage();
        }

        private static async getDrama(): Promise<void> {
            // const dramaRes = await fetch("https://raw.githubusercontent.com/HaveAGoodCode/HaveAGoodCode.github.io/refs/heads/main/dramas/drama.drama");
            // const drama = await dramaRes.text();
            // const lines = drama.split('\n');
            const values: any[] = Object.values(Part);

            const allLines: string[] = [];
            values.forEach(value => {
                const lines: string[] = value.split("\n");
                lines.forEach(line => allLines.push(line));
                allLines.push("@" + DramaType.Function + ":q4");
                allLines.push("@" + DramaType.Function + ":q6");
            });

            const lines: string[] = allLines.map(s => s.trim());
            for (let index = 0; index < lines.length; index++) {
                messages[index] = Message.createObjWithString(lines[index]);
            }
        }

        private static async restoreState() {
            const currentIndex = MessageID.getID();

            if (currentIndex === 0) {
                while (!Drama.clickOnceContains(messages[MessageID.getID()])) {
                    await processMessage();
                }
                await processMessage();
                return;
            }


            let startIndex = -1;
            for (let i = currentIndex; i >= 0; i--) {
                if (messages[i].type === DramaType.Ball) {
                    startIndex = i;
                    break;
                }
            }

            if (startIndex === -1) {
                throw new Error("No message with type DramaType.Ball found");
            }

            const message = messages[startIndex];

            MessageID.addOne();

            for (let i = startIndex; i < currentIndex; i++) {
                const currentMessage = messages[i];
                if (currentMessage.type === DramaType.Function) {
                    await currentMessage.obj();
                }
            }

            if (message.type === DramaType.Ball) {
                KeyAnimation.setObjAnimation(message.obj, createNewTextLine());
            } else if (message.type === DramaType.Code) {
                KeyAnimation.setObjAnimation2(message.obj, async () => { });
            } else {
                const nextMessage = messages[MessageID.getID()];
                const finalCallBack = async () => {
                    await message.obj();
                    if (!Drama.clickOnceContains(nextMessage)) {
                        await processMessage();
                    }
                };
                if (messages[startIndex].type === DramaType.Ball) {
                    KeyAnimation.setObjAnimation(messages[startIndex].obj, createNewTextLine(), finalCallBack);
                } else {
                    KeyAnimation.setObjAnimation2(messages[startIndex].obj, finalCallBack);
                }
            }
        }

        private static async initAll() {
            await this.getDrama();
            this.restoreState();

            this.eventHook();

            DirectoryManager.initializeDirectory();
        }

        private static eventHook(): void {
            document.body.addEventListener('click', (ev) => {
                if (Question.timeStop) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }, true);

            (document.getElementById('left') as HTMLElement).addEventListener('click', async () => await this.click());

            const checkOrientation = function () {
                const bo: HTMLElement | null = document.getElementById("alert_box");
                if (window.matchMedia("(orientation: portrait)")) {
                    if (bo !== null) {
                        bo.remove();
                    }
                } else {
                    if (bo === null) {
                        const a: HTMLElement = document.createElement("div");
                        a.id = "alert_box";
                        const b: HTMLElement = document.createElement("p");
                        b.textContent = "請轉到橫向畫面。";
                        a.appendChild(b);
                        document.body.appendChild(a);
                    }
                }
            };
            const supportsOrientationChange = "onorientationchange" in window,
                orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
            window.addEventListener(orientationEvent, checkOrientation, false);
            checkOrientation();
        }
    };
})();