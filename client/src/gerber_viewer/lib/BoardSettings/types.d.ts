import { FormikProps, FieldProps as FormikFieldProps } from 'formik';
import { BoardRender, BoardOptions, LayerOptions, GerberSide, GerberType } from '../types';
export declare type Values = {
    name: BoardRender['name'];
    options: FormBoardOptions;
    gerberOptions: FormLayerOptions;
    drillOptions: FormLayerOptions;
    layers: FormLayerUpdatesMap;
};
export declare type FormProps = FormikProps<Values>;
export declare type FieldProps = FormikFieldProps<Values>;
export declare type FormBoardOptions = {
    useOutline: BoardOptions['useOutline'];
    color: BoardOptions['color'];
    outlineGapFill: BoardOptions['outlineGapFill'] | string;
};
export declare type FormLayerOptions = {
    coordinateFormat: [number | string, number | string] | '';
    zeroSuppression: LayerOptions['zeroSuppression'] | '';
    units: LayerOptions['units'] | '';
};
export declare type FormLayerUpdatesMap = {
    [id: string]: FormLayerUpdates;
};
export declare type FormLayerUpdates = {
    side: NonNullable<GerberSide> | '';
    type: NonNullable<GerberType> | '';
    color: string;
};
