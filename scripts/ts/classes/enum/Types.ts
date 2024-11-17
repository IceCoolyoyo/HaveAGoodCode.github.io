import BallAnimation from '../animation/BallAnimation.js';
import Table from '../textbook/Table.js';

export enum DramaType {
    Ball = 'Ball',
    Function = 'Function',
    Image = 'Image'
};

export const classList = Object.freeze({
    BallAnimation, Table
});

export enum AnimationState {
    IDLE = 'idle',
    TYPING = 'typing',
    EXECUTING_FUNCTION = 'executing_function',
};