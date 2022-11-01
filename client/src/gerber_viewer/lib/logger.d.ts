import { Logger } from './types';
import { Middleware } from './state';
declare const log: Logger;
export default log;
export declare const createLogMiddleware: () => Middleware;
