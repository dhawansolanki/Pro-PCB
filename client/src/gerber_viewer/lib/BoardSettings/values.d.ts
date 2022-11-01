import { BoardRender, BoardUpdate, Logger } from '../types';
import { Values } from './types';
export declare const MASK_ALPHA = "bf";
export declare const GAP_FILL_DEFAULT = 0.00011;
export declare function valuesToBoardUpdate(values: Values, log: Logger): BoardUpdate;
export declare function boardRenderToValues(board: BoardRender): Values;
