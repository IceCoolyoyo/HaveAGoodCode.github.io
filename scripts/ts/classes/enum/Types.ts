import BallAnimation from '../animation/BallAnimation.js';
import Question from '../textbook/Question.js';
import Table from '../textbook/Table.js';

export enum DramaType {
    Ball = 'Ball',
    Function = 'Function',
    Image = 'Image',
    Code = 'Code'
};

export const classList = Object.freeze({
    BallAnimation, Table, Question
});