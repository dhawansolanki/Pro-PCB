export declare type DisplayState = {
    x: number;
    y: number;
    step: number;
};
export declare type Point = {
    x: number;
    y: number;
};
export declare type PartialDisplayState<K extends keyof DisplayState = keyof DisplayState> = Pick<DisplayState, K>;
export declare type UpdateDisplayState = (partial: PartialDisplayState) => void;
export declare type HandleZoom = (delta: number, centerX?: number, centerY?: number) => void;
export declare type HandlePan = (deltaX: number, deltaY: number) => void;
export declare type DisplayControllerProps = {
    step: DisplayState['step'];
    pan: HandlePan;
    zoom: HandleZoom;
    zoomIn: () => void;
    zoomOut: () => void;
    reset: () => void;
};
