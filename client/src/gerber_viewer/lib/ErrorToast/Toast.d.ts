import React from 'react';
export declare type ToastProps = {
    dismiss: () => unknown;
    children: React.ReactNode;
};
export default function Toast(props: ToastProps): JSX.Element;
