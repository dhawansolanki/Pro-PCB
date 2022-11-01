import React from 'react';
export declare type LabelProps = {
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;
export declare const LABEL_CLASSNAME = "flex items-center";
export declare function Label(props: LabelProps): JSX.Element;
export declare type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export declare function HiddenInput(props: InputProps): JSX.Element;
export declare function Checkbox(props: InputProps): JSX.Element;
