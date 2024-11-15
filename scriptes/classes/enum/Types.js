import BallAnimation from '../animation/BallAnimation.js';
import Table from '../textbook/Table.js';

export const DramaType = Object.freeze({
    Ball: 'Ball',
    Function: 'Function',
    Image: 'Image'
});

export const classList = Object.freeze({
    BallAnimation, Table
});

export const AnimationState = Object.freeze({
    IDLE: 'idle',
    TYPING: 'typing',
    EXECUTING_FUNCTION: 'executing_function',
});