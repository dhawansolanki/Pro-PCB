import React from "react";
import { FieldProps } from "./types";
declare type LayerListProps = {
    children: React.ReactNode;
};
export declare function LayerList(props: LayerListProps): JSX.Element;
declare type LayerItemProps = {
    filename: string;
    children: React.ReactNode;
};
export declare function LayerItem(props: LayerItemProps): JSX.Element;
declare type LayerFieldProps = FieldProps & {
    layerId: string;
};
export declare function LayerTypeSelect(props: LayerFieldProps): JSX.Element;
export declare function LayerSideSelect(props: LayerFieldProps): JSX.Element;
export declare function LayerColorInput(props: LayerFieldProps): JSX.Element;
export {};
