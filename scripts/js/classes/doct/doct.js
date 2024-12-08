import assert from "../assert/assert.js";
export default class Doc {
    static getElementById(elementId) {
        var obj = document.getElementById(elementId);
        assert(obj !== null);
        return obj;
    }
}
