import React from 'react';
export declare type DrawerProps = {
    title: string;
    open: boolean;
    children: React.ReactNode;
    close: () => unknown;
};
export declare function Drawer(props: DrawerProps): JSX.Element;
