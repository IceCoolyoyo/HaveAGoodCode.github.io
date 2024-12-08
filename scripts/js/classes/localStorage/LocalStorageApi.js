export class StorageType {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}
StorageType.MUSIC_TIME = new StorageType("music_time");
StorageType.MESSAGE_COUNT = new StorageType("message_count");
class LocalStorageApi {
    static write(type, data) {
        try {
            const serializedData = JSON.stringify(data !== null && data !== void 0 ? data : {});
            LocalStorageApi.LOCAL_STORAGE.setItem(type.getName(), serializedData);
        }
        catch (e) {
            console.error("Failed to write to localStorage:", e);
        }
    }
    static read(type) {
        try {
            const item = LocalStorageApi.LOCAL_STORAGE.getItem(type.getName());
            return item ? JSON.parse(item) : null;
        }
        catch (e) {
            console.error("Failed to read from localStorage:", e);
            return null;
        }
    }
    static remove(type) {
        try {
            LocalStorageApi.LOCAL_STORAGE.removeItem(type.getName());
        }
        catch (e) {
            console.error("Failed to remove from localStorage:", e);
        }
    }
}
LocalStorageApi.LOCAL_STORAGE = window.localStorage;
export default LocalStorageApi;
