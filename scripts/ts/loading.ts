import LocalStorageApi, { StorageType } from "./classes/localStorage/LocalStorageApi.js";
import MessageID from "./classes/message/MessageID.js";

(function () {
    if (LocalStorageApi.isClean()) {
        const html: string = `
        <div id="introBackground">
            <div id="centerBlock">
                <div id="title">
                    <h1 id="innerTitle">歡迎來到</h1>
                    <h1 id="innerTitle">HaveAGoodCode.github.io!</h1>
                </div>
                <div id="intro">
                    <p id="innerText">這是一個致力於提供程式學習者教學的網站。</p>
                    <p id="innerText">您可以在這裡體驗到學習且同時實作的教學模式。</p>
                </div>
                <button id="closeIntro">繼續</button>
            </div>
        </div>`;
        (document.getElementById('base') as HTMLElement).insertAdjacentHTML('afterbegin', html);
        (document.getElementById("closeIntro") as HTMLElement).onclick = () =>
            (document.getElementById('introBackground') as HTMLElement).remove();
        MessageID.id = 0;
        LocalStorageApi.write<number>(StorageType.MESSAGE_COUNT, MessageID.id);
    } else {
        MessageID.id = (LocalStorageApi.read<number>(StorageType.MESSAGE_COUNT) as number);
    }
})();