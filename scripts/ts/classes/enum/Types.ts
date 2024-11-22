import BallAnimation from '../animation/BallAnimation.js';
import Question from '../textbook/Question.js';
import Table from '../textbook/Table.js';

export enum DramaType {
    Ball = 'Ball',
    Function = 'Function',
    Image = 'Image'
};

export const classList = Object.freeze({
    BallAnimation, Table, Question
});

export enum AnimationState {
    IDLE = 'idle',
    TYPING = 'typing',
    EXECUTING_FUNCTION = 'executing_function',
};