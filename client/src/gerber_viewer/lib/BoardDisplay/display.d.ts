import { DisplayState } from './types';
export declare const SCALE_INITIAL = 0.5;
export declare const SCALE_LIMIT_FACTOR = 40;
export declare const SCALE_STEP_COUNT = 16;
export declare const SCALE_MIN: number;
export declare const SCALE_MAX: number;
export declare const INITIAL_STATE: DisplayState;
export declare const SCALE_STEPS: number[];
export declare function zoom(prevState: DisplayState, delta: number, centerX?: number, centerY?: number): DisplayState;
export declare function pan(prevState: DisplayState, deltaX: number, deltaY: number): DisplayState;
export declare function getScale(step: number): {
    step: number;
    scale: number;
};
export declare function stepToScale(step: number): number;
export declare function scaleToStep(scale: number): number;
