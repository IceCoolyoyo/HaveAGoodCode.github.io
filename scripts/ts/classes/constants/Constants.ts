import Message from '../message/Message.js';
import Setting from '../setting/Setting.js';

export let goodMessage: string;
export let messages: Message[] = [];

(async function () {
    const messageRes = await fetch(Setting.fineSentenceAPI);
    goodMessage = await messageRes.text();
})();