/// <reference types="node" />
/// <reference types="node" />
import { Transform, TransformCallback } from 'readable-stream';
import MD5 from 'md5.js';
import { PromiseArray } from './util';
export declare type FileToWrite = {
    name: string;
    contents: string;
};
export declare function readFiles(files: Array<File>): PromiseArray<FileStream>;
export declare function fetchZipFile(url: string): PromiseArray<FileStream>;
export declare function writeFiles(files: Array<FileToWrite>): Promise<Blob>;
export declare class FileStream extends Transform {
    _hasher: MD5;
    _chunks: Array<Buffer>;
    name: string;
    digest: string | null;
    contents: Buffer | null;
    constructor(filename: string);
    _transform(chunk: Buffer, _: string, next: TransformCallback): void;
    _flush(next: TransformCallback): void;
}
