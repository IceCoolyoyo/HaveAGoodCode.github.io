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
        KeyAnimation.setupObjAnimationStyles(obj);

        KeyAnimation.typing(string, obj, 90, () => {
            KeyAnimation.finalizeAnimation(string, obj, runnable);
        });
    }

    private static setupObjAnimationStyles(obj: HTMLElement): void {
        obj.style.borderRightColor = 'rgb(0, 0, 0)';
        obj.style.animation = `caret 0.8s steps(1) infinite`;
    }

    private static finalizeAnimation(string: string, obj: HTMLElement, runnable?: (() => Promise<void>) | null): void {
        setTimeout(() => {
            obj.style.borderRightColor = 'transparent';
            KeyAnimation.toggleCountinue();

            const div: HTMLElement = document.createElement("div");
            div.id = "question-title";
            div.innerText = string;
            (document.getElementById("left") as HTMLElement).appendChild(div);

            if (runnable) {
                runnable();
            }
        }, 500);
    }

    private static typing(string: string, element: HTMLElement, typingInterval: number, endRun: () => void, currentIndex: number = 0, isInitialCall: boolean = true): void {
        if (isInitialCall) {
            KeyAnimation.initializeTyping(element, string, typingInterval, endRun);
            return;
        }

        if (currentIndex >= string.length) {
            endRun();
            return;
        }

        KeyAnimation.processTyping(string, element, typingInterval, endRun, currentIndex);
    }

    private static initializeTyping(element: HTMLElement, string: string, typingInterval: number, endRun: () => void): void {
        element.textContent = "";
        setTimeout(() => {
            KeyAnimation.typing(string, element, typingInterval, endRun, 0, false);
        }, typingInterval);
    }

    private static processTyping(string: string, element: HTMLElement, typingInterval: number, endRun: () => void, currentIndex: number): void {
        const currentChar = string[currentIndex];
        element.textContent += currentChar;
        const delay = currentChar === " " ? 0 : typingInterval;

        setTimeout(() => {
            KeyAnimation.typing(string, element, typingInterval, endRun, currentIndex + 1, false);
        }, delay);
    }

    public static setObjAnimation2(obj: Function, callback: (() => Promise<void>) | null): void {
        KeyAnimation.toggleCountinue();
        obj();
        
        KeyAnimation.finalizeObjAnimation2(callback);
    }

    private static finalizeObjAnimation2(callback: (() => Promise<void>) | null): void {
        setTimeout(() => {
            KeyAnimation.toggleCountinue();
            callback?.();
        }, 100);
    }
}
