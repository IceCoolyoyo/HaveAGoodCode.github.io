export default class DebugTool {
    private static readonly debugActive : boolean = ["127.0.0.1", "localhost", "::1"].includes(window.location.hostname);

    public static get isDebug() : boolean {
        return DebugTool.debugActive;
    }

    public static ifDebug(callback: () => void) : void {
        if (DebugTool.isDebug) {
            callback();
        }
    }
}