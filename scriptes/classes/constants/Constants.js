import { AnimationState } from '../enum/Types.js';
import Setting from '../setting/Setting.js';

export let goodMessage;
export let animationStates = [AnimationState.IDLE];
export let messages = [];

(async function () {
    const messageRes = await fetch(Setting.fineSentenceAPI);
    goodMessage = await messageRes.text();
})();