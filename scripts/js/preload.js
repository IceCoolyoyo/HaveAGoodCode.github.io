import LocalStorageApi, { StorageType } from "./classes/localStorage/LocalStorageApi.js";
(function () {
    class Preload {
        static handleOnceJoin() {
            LocalStorageApi.write(StorageType.NEED_INTRO, LocalStorageApi.isClean());
        }
    }
    Preload.handleOnceJoin();
})();
