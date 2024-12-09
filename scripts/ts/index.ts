import Setting from './classes/setting/Setting.js';
import Message, { ballSays, processMessage } from './classes/message/Message.js';
import { DramaType } from './classes/enum/Types.js';
import { messages } from './classes/constants/Constants.js';
import MessageID from './classes/message/MessageID.js';
import KeyAnimation from './classes/animation/KeyAnimation.js';
import Doc from './classes/doct/doct.js';
import LocalStorageApi, { StorageType } from './classes/localStorage/LocalStorageApi.js';
import CodeFrame from './classes/code_frame/code.js';
import Question from './classes/textbook/Question.js';
import assert from './classes/assert/assert.js';
import DirectoryManager from './classes/directory/Directory.js';
import { Part } from './Drama.js';

(function () {
    const _ = class {
        static {
            this.initAll();
        }

        private static async click(init: boolean): Promise<void> {
            if (!KeyAnimation.canCountinue) {
                return;
            }

            messages.forEach((chat, index) => {
                if (chat.type === DramaType.Ball && chat.originalMessage !== null && chat.originalMessage.includes(Setting.drama_time)) {
                    messages[index].obj = chat.originalMessage.replace(Setting.drama_time, Message.getHelloMsg());
                }
            });

            if (!init) {
                const illustrate = document.getElementById(Setting.illustrateID);
                if (illustrate !== null) {
                    illustrate.remove();
                }
            }

            await processMessage();

            window.localStorage.setItem('messageCount', MessageID.getID().toString());
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
                allLines.push("@" + DramaType.Function + ":q6");
                allLines.push("@" + DramaType.Function + ":q4");
            });

            const lines: string[] = allLines.map(s => s.trim());
            for (let index = 0; index < lines.length; index++) {
                messages[index] = Message.createObjWithString(lines[index]);
            }
        }

        private static async restoreState() {
            const currentIndex = MessageID.getID();

            if (currentIndex === 0) {
                await processMessage();
                MessageID.addOne();
                return;
            }

            const message = messages[currentIndex];

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

            MessageID.addOne();

            for (let i = startIndex; i < currentIndex; i++) {
                const currentMessage = messages[i];
                if (currentMessage.type === DramaType.Function) {
                    await currentMessage.obj();
                }
            }

            if (message.type === DramaType.Ball) {
                KeyAnimation.setObjAnimation(message.obj, ballSays);
            } else {
                const nextMessage = messages[MessageID.getID()];
                const animationCallback = nextMessage.type !== DramaType.Ball
                    ? async () => {
                        await processMessage();
                    }
                    : async () => {};
                const finalCallBack = async () => {
                    await message.obj();
                    await animationCallback();
                };
                KeyAnimation.setObjAnimation(messages[startIndex].obj, ballSays, finalCallBack);
            }
        }

        private static async initAll() {
            await this.getDrama();

            this.eventHook();
            this.spotifyInit();

            DirectoryManager.main();

            setTimeout(() => {
                const obj = document.getElementById(Setting.illustrateID);
                // The element may have been deleted before execution
                if (obj) {
                    obj.style.animation = 'fade 2s linear 0s';
                    obj.style.display = 'block';
                }
            }, 6000);
        }

        private static eventHook(): void {
            document.body.addEventListener('click', (ev) => {
                if (Question.timeStop) {
                    ev.preventDefault();
                    ev.stopPropagation();
                }
            }, true);
            (document.getElementById(Setting.ballFrameID) as HTMLElement).addEventListener('click', async () => await this.click(false));
        }

        private static spotifyInit(): void {
            (window as any).onSpotifyIframeApiReady = async (IFrameAPI: { createController: (arg0: HTMLElement | null, arg1: { uri: string; }, arg2: (EmbedController: any) => void) => void; }) => {
                const element = document.getElementById('spotify-iframe') as HTMLElement;
                const options = { uri: 'spotify:track:5vNRhkKd0yEAg8suGBpjeY' };
                const callback = (EmbedController: { loadUri: (arg0: string, arg1: boolean, arg2: number) => void; addListener: (arg0: string, arg1: (e: any) => void) => void; play: () => void; }) => {
                    const a = LocalStorageApi.read<number>(StorageType.MUSIC_TIME);
                    if (a !== null) {
                        EmbedController.loadUri(options.uri, false, a);
                    }
                    EmbedController.addListener('playback_update', e => {
                        LocalStorageApi.write(StorageType.MUSIC_TIME, parseInt((e.data.position as string), 10) / 1000);
                    });
                    EmbedController.play();
                };
                IFrameAPI.createController(element, options, callback);

                await this.restoreState();
            };
        }
    };
})();
