/// <reference types="node" />
import React from "react";
import { CoordinateFormat, ZeroSuppression } from "gerber-parser";
import { Units } from "gerber-plotter";
import { ConverterResult } from "gerber-to-svg";
import { Color } from "pcb-stackup-core";
import { ViewBox } from "viewbox";
import { GerberSide, GerberType } from "whats-that-gerber";
export type { CoordinateFormat, ZeroSuppression, Units, GerberType, GerberSide, };
export declare type AppPreferences = Optional<{
    analyticsOptIn: boolean;
}>;
export declare type Mode = null | "top" | "bottom" | "layers";
export declare type SvgSource = string | null;
export declare type Board = {
    id: string;
    name: string;
    layerIds: Array<string>;
    layers: LayersMap;
    options: BoardOptions;
    gerberOptions: Optional<LayerOptions>;
    drillOptions: Optional<LayerOptions>;
    thumbnail: string;
    sourceUrl?: string;
};
export declare type Layer = {
    id: string;
    filename: string;
    sourceId: string;
    source: Buffer;
    side: GerberSide;
    type: GerberType;
    color: string;
    initialOptions: LayerOptions;
};
export declare type LayersMap = {
    [id: string]: Layer;
};
export declare type BoardSummary = Pick<Board, "id" | "name" | "options" | "thumbnail">;
export declare type BoardUpdate = Partial<{
    id: Board["id"];
    name: Board["name"];
    options: Board["options"];
    gerberOptions: Board["gerberOptions"];
    drillOptions: Board["drillOptions"];
    layers: Partial<LayerUpdatesMap>;
}>;
export declare type BoardRender = {
    id: string;
    name: string;
    options: BoardOptions;
    gerberOptions: Optional<LayerOptions>;
    drillOptions: Optional<LayerOptions>;
    viewBox: ViewBox;
    top: SvgSource;
    bottom: SvgSource;
    layers: Array<LayerRender>;
    sourceIds: Array<string>;
    sourceUrl: string | null;
};
export declare type LayerRender = {
    id: string;
    filename: string;
    type: GerberType;
    side: GerberSide;
    converter: ConverterResult;
    initialOptions: LayerOptions;
    color: string;
    scale: number;
};
export declare type BoardOptions = {
    useOutline: boolean;
    outlineGapFill: number;
    color: Pick<Color, "sm" | "ss" | "cf">;
};
export declare type LayerOptions = {
    coordinateFormat: CoordinateFormat;
    zeroSuppression: ZeroSuppression;
    units: Units;
};
export declare type LayerUpdatesMap = {
    [id: string]: {
        side: GerberSide;
        type: GerberType;
        color: string;
    };
};
export declare type LayerVisibilityMap = {
    [id: string]: boolean;
};
export declare type ErrorObject = {
    name: string;
    message: string;
    error: string;
};
export declare type FileEvent = React.DragEvent<HTMLElement> | React.ChangeEvent<HTMLInputElement>;
export declare type LogLevel = "debug" | "info" | "warn" | "error";
export declare type LogHandler = (message: string, ...meta: Array<unknown>) => void;
export declare type Logger = {
    [Level in LogLevel]: LogHandler;
};
export declare type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export declare type Optional<T> = {
    [P in keyof T]?: T[P] | null | undefined;
};
