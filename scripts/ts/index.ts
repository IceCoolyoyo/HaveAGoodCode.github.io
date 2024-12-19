import Setting from './classes/setting/Setting.js';
import Message, { ballSays, processMessage } from './classes/message/Message.js';
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

        private static async click(init: boolean): Promise<void> {
            if (!KeyAnimation.canCountinue) {
                return;
            }

            if (!init) {
                const illustrate = document.getElementById(Setting.illustrateID);
                if (illustrate !== null) {
                    illustrate.remove();
                }
            }

            await processMessage();

            LocalStorageApi.write<number>(StorageType.MESSAGE_COUNT, MessageID.getID());
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
            const currentIndex = MessageID.getID() - 1;

            if (currentIndex === (0 - 1)) {
                while (!Drama.clickOnceContains(messages[MessageID.getID()])) {
                    await processMessage();
                }
                await processMessage();
                return;
            }

            const message = messages[currentIndex];

            const startIndex = messages.slice(0, currentIndex)
                .reverse()
                .findIndex(Drama.clickOnceContains);

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
            } else if (message.type === DramaType.Code) {
                KeyAnimation.setObjAnimation2(message.obj, async () => { });
            } else {
                const nextMessage = messages[MessageID.getID()];
                const animationCallback = nextMessage.type !== DramaType.Ball && nextMessage.type !== DramaType.Code
                    ? async () => {
                        await processMessage();
                    }
                    : async () => { };
                const finalCallBack = async () => {
                    await message.obj();
                    await animationCallback();
                };
                if (messages[startIndex].type === DramaType.Ball) {
                    KeyAnimation.setObjAnimation(messages[startIndex].obj, ballSays, finalCallBack);
                } else {
                    KeyAnimation.setObjAnimation2(messages[startIndex].obj, finalCallBack);
                }
            }
        }

        private static async initAll() {
            this.handleOnceJoinnnnnnnnnnnnnnnnnn();
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

            window.addEventListener('wheel', function (event: WheelEvent) {
                if (event.ctrlKey === true || event.metaKey === true) {
                    event.preventDefault();
                }
            }, { passive: false });

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

        private static handleOnceJoinnnnnnnnnnnnnnnnnn(): void {
            if (LocalStorageApi.read<number>(StorageType.MESSAGE_COUNT) === null && LocalStorageApi.read<number>(StorageType.MUSIC_TIME) === null) {
                (document.getElementById("closeIntro") as HTMLElement).onclick = () => 
                    (document.getElementById('introBackground') as HTMLElement).remove();
                MessageID.id = 0;
                LocalStorageApi.write<number>(StorageType.MESSAGE_COUNT, 0);
            } else {
                (document.getElementById('introBackground') as HTMLElement).remove();
                MessageID.id = (LocalStorageApi.read<number>(StorageType.MESSAGE_COUNT) as number);
            }
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
                        LocalStorageApi.write<number>(StorageType.MUSIC_TIME, parseInt((e.data.position as string), 10) / 1000);
                    });
                    EmbedController.play();
                };
                IFrameAPI.createController(element, options, callback);

                await this.restoreState();
            };
        }
    };
})();
