import React from 'react';
export declare type ButtonProps = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
    children?: React.ReactNode;
    title?: string;
    type?: 'button' | 'submit' | 'reset';
};
export declare const BUTTON_CLASSNAME = "br2";
export declare function getButtonStyle(props: ButtonProps): string;
export declare function Button(props: ButtonProps): JSX.Element;
