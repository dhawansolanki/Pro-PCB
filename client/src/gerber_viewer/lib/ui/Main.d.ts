import React from 'react';
export declare type MainProps = {
    children: React.ReactNode;
    onDragOver: (event: React.DragEvent<HTMLElement>) => void;
    onDrop: (event: React.DragEvent<HTMLElement>) => void;
};
export declare function Main(props: MainProps): JSX.Element;
