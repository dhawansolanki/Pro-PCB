import { Stackup, InputLayer } from 'pcb-stackup';
import { BoardRender, Board, BoardUpdate } from '../types';
import { FileStream } from './files';
export declare type InputLayerFromFile = InputLayer & {
    gerber: FileStream;
};
export declare type StackupFromFiles = Stackup<string, InputLayerFromFile>;
export declare function filesToStackups(files: Array<File>): Promise<[StackupFromFiles, StackupFromFiles]>;
export declare function urlToStackups(url: string): Promise<[StackupFromFiles, StackupFromFiles]>;
export declare function boardToStackups(board: Board): Promise<[Stackup, Stackup]>;
export declare function stackupToZipBlob(stackup: Stackup): Promise<Blob>;
export declare function stackupToBoard(stackup: StackupFromFiles): Board;
export declare function updateBoard(board: Board, update: BoardUpdate): Board;
export declare function updateBoardThumbnail(board: Board, stackup: Stackup): Board;
export declare function stackupToBoardRender(stackup: Stackup, board: Board): BoardRender;
