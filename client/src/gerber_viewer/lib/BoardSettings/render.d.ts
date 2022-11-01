/// <reference types="react" />
import { CoordinateFormat, ZeroSuppression, Units } from "../types";
import { FieldProps } from "./types";
export declare function UseOutlineInput(props: FieldProps): JSX.Element;
export declare function GapFillInput(props: FieldProps): JSX.Element;
declare type RenderSettingProps<Value> = {
    fieldName: string;
    renderName: string;
    overridden: boolean;
    defaultValue: Value | null | undefined;
};
export declare function CoordFormatFields(props: RenderSettingProps<CoordinateFormat>): JSX.Element;
export declare function ZeroSuppressionFields(props: RenderSettingProps<ZeroSuppression>): JSX.Element;
export declare function UnitsFields(props: RenderSettingProps<Units>): JSX.Element;
export {};
