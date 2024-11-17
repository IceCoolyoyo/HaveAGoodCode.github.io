class AssertionError extends Error {
    constructor(message?: string) {
        super(message || "Assertion failed!");
        this.name = "AssertionError";
    }
}

export default function assert(rule: boolean, message?: string): asserts rule {
    if (!rule) {
        throw new AssertionError(message);
    }
}