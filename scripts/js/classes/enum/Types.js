import BallAnimation from '../animation/BallAnimation.js';
import Question from '../textbook/Question.js';
import Table from '../textbook/Table.js';
export var DramaType;
(function (DramaType) {
    DramaType["Ball"] = "Ball";
    DramaType["Function"] = "Function";
    DramaType["Image"] = "Image";
    DramaType["Code"] = "Code";
})(DramaType || (DramaType = {}));
;
export const classList = Object.freeze({
    BallAnimation, Table, Question
});
