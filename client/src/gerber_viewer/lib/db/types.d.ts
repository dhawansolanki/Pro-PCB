/// <reference types="node" />
import Dexie from 'dexie';
import { Board, Layer, Omit, AppPreferences } from '../types';
export declare type DbBoard = Omit<Board, 'layers'>;
export declare type DbLayer = Omit<Layer, 'source'>;
export declare type DbSource = {
    id: string;
    contents: Buffer;
};
export declare type DbLayersMap = {
    [id: string]: DbLayer;
};
export interface BoardDatabase extends Dexie {
    boards: Dexie.Table<DbBoard, string>;
    layers: Dexie.Table<DbLayer, string>;
    sources: Dexie.Table<DbSource, string>;
}
export declare type DbAppPreferences = AppPreferences;
export interface AppDatabase extends Dexie {
    preferences: Dexie.Table<DbAppPreferences, number>;
}
