export default class Left {
    public static clear(): void {
        Array.from(document.querySelectorAll("#left *")).forEach(element => element.remove());
    }
}