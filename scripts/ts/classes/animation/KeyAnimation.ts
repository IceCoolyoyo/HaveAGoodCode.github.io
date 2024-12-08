import DebugTool from '../debug/DebugTool.js';

export default class KeyAnimation {
    private static countinue : boolean = true;

    public static get canCountinue() : boolean {
        return KeyAnimation.countinue;
    }

    private static toggleCountinue() : void {
        KeyAnimation.countinue = !KeyAnimation.countinue;
    }
 
    public static setObjAnimation(string: string, obj: HTMLElement, runnable?: (() => Promise<void>) | null):void {
        const width : number = KeyAnimation.calcWidth(string);
        
        KeyAnimation.toggleCountinue();

        obj.innerHTML = string;
        obj.style.width = `${width}ch`;
        obj.style.borderRightColor = 'rgb(0, 0, 0)';
        obj.style.animation = `typing ${width / 10}s steps(${string.length}), caret 0.8s steps(1) infinite`;

        setTimeout(() => {
            KeyAnimation.clearObjAnimation(obj);
            KeyAnimation.toggleCountinue();
            if (runnable) {
                runnable();
            }
        }, ((width / 10) * 1000) + 500);
    }

    public static clearObjAnimation(obj: HTMLElement):void {
        obj.style.borderRightColor = 'transparent';
        obj.style.animation = ``;
    }

    public static deTypingAnimation(width: number, obj: HTMLElement):void {
        obj.style.animation = `deTyping ${width / 10}s steps(${obj.innerHTML.length}), caret 0.8s steps(1) infinite`;
        setTimeout(() => {
            KeyAnimation.clearObjAnimation(obj);
        }, ((width / 10) * 1000));
    }

    public static calcWidth(string: string): number {
        const chineseCharRegex = /[\u4E00-\u9FFF]/;
        const doubleWidthCharRegex = /[\u3000-\u303F\uFF00-\uFFFF]/;

        const debugArray: Array<{ char: string; width: number }> = [];

        let width = 0;

        for (let char of string) {
            const charWidth = chineseCharRegex.test(char) || doubleWidthCharRegex.test(char) ? 2 : 1;
            width += charWidth;
            DebugTool.ifDebug(() => debugArray.push({ char, width: charWidth }));
        }

        DebugTool.ifDebug(() =>
            console.debug("%cFunction %ccalcWidth", "color: #CCEEFF;", "color: #FFC8B4; font-weight: bold;", debugArray)
        );
        return width;
    }
}