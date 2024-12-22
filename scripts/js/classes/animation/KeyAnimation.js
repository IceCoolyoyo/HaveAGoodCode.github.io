class KeyAnimation {
    static get canCountinue() {
        return KeyAnimation.countinue;
    }
    static toggleCountinue() {
        KeyAnimation.countinue = !KeyAnimation.countinue;
    }
    static setObjAnimation(string, obj, runnable) {
        KeyAnimation.toggleCountinue();
        obj.style.borderRightColor = 'rgb(0, 0, 0)';
        obj.style.animation = `caret 0.8s steps(1) infinite`;
        KeyAnimation.typing(string, obj, 90, () => setTimeout(() => {
            obj.style.borderRightColor = 'transparent';
            KeyAnimation.toggleCountinue();
            const div = document.createElement("div");
            div.id = "question-title";
            div.innerText = string;
            document.getElementById("left").appendChild(div);
            if (runnable !== undefined && runnable !== null) {
                runnable();
            }
        }, 500));
    }
    static typing(string, element, typingInterval, endRun, currentIndex = 0, isInitialCall = true) {
        if (isInitialCall) {
            element.textContent = "";
            setTimeout(() => {
                KeyAnimation.typing(string, element, typingInterval, endRun, currentIndex, false);
            }, typingInterval);
            return;
        }
        if (currentIndex >= string.length) {
            endRun();
            return;
        }
        const currentChar = string[currentIndex];
        element.textContent += currentChar;
        currentIndex++;
        const delay = currentChar === " " ? 0 : typingInterval;
        setTimeout(() => {
            KeyAnimation.typing(string, element, typingInterval, endRun, currentIndex, false);
        }, delay);
    }
    static setObjAnimation2(obj, callback) {
        KeyAnimation.toggleCountinue();
        obj();
        setTimeout(() => {
            KeyAnimation.toggleCountinue();
            callback === null || callback === void 0 ? void 0 : callback();
        }, 100);
    }
}
KeyAnimation.countinue = true;
export default KeyAnimation;
