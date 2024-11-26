import BallAnimation from '../animation/BallAnimation.js';
import Question from '../textbook/Question.js';
import Table from '../textbook/Table.js';
export var DramaType;
(function (DramaType) {
    DramaType["Ball"] = "Ball";
    DramaType["Function"] = "Function";
    DramaType["Image"] = "Image";
})(DramaType || (DramaType = {}));
;
export const classList = Object.freeze({
    BallAnimation, Table, Question
});
export var AnimationState;
(function (AnimationState) {
    AnimationState["IDLE"] = "idle";
    AnimationState["TYPING"] = "typing";
    AnimationState["EXECUTING_FUNCTION"] = "executing_function";
})(AnimationState || (AnimationState = {}));
;
