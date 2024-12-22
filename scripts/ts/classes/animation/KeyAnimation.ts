export default class KeyAnimation {
    private static countinue: boolean = true;

    public static get canCountinue(): boolean {
        return KeyAnimation.countinue;
    }

    private static toggleCountinue(): void {
        KeyAnimation.countinue = !KeyAnimation.countinue;
    }

    public static setObjAnimation(string: string, obj: HTMLElement, runnable?: (() => Promise<void>) | null): void {
        KeyAnimation.toggleCountinue();

        obj.style.borderRightColor = 'rgb(0, 0, 0)';
        obj.style.animation = `caret 0.8s steps(1) infinite`;

        KeyAnimation.typing(string, obj, 90, () =>
            setTimeout(() => {
                obj.style.borderRightColor = 'transparent';
                KeyAnimation.toggleCountinue();

                const div: HTMLElement = document.createElement("div");
                div.id = "question-title";
                div.innerText = string;
                (document.getElementById("left") as HTMLElement).appendChild(div);

                if (runnable !== undefined && runnable !== null) {
                    runnable();
                }
            }, 500));
    }

    private static typing(string: string, element: HTMLElement, typingInterval: number, endRun: () => void, currentIndex: number = 0, isInitialCall: boolean = true): void {
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

    public static setObjAnimation2(obj: Function, callback: (() => Promise<void>) | null): void {
        KeyAnimation.toggleCountinue();

        obj();

        setTimeout(() => {
            KeyAnimation.toggleCountinue();
            callback?.();
        }, 100);
    }
}