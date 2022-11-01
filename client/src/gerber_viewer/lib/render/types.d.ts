import { Action } from '../state';
export declare type WorkerMessageEvent = {
    data: Action;
};
export declare type RenderWorkerContext = {
    onmessage: (event: WorkerMessageEvent) => void;
    postMessage(message: Action): void;
};
