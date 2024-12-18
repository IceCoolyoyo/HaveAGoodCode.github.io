import Setting from '../setting/Setting.js';

export default class BallAnimation {
    static objs = [document.getElementById(Setting.ballID) as HTMLElement, document.getElementById(Setting.shadowID) as HTMLElement];

    static remove(animationId: string) {
        BallAnimation.objs.forEach(obj => obj.classList.remove(animationId));
    }

    static add(animationId: string) {
        BallAnimation.objs.forEach(obj => obj.classList.add(animationId));
    }

    static jump() {
        BallAnimation.remove(Setting.rollTag);
        BallAnimation.add(Setting.jumpTag);
    }

    static roll() {
        BallAnimation.add(Setting.rollTag);
        BallAnimation.remove(Setting.jumpTag);
    }

    static normal() {
        BallAnimation.remove(Setting.rollTag);
        BallAnimation.remove(Setting.jumpTag);
    }

    static jumpOnce() {
        BallAnimation.jump();
        setTimeout(() => BallAnimation.normal(), (Setting.jumpAnimationOnceMS * 2) + 10);
    }
}