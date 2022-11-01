import React from 'react';
import { DisplayControllerProps } from './types';
declare type Props = DisplayControllerProps & {
    containerRef: React.RefObject<HTMLDivElement>;
    children?: React.ReactNode;
};
export default function PanZoom(props: Props): JSX.Element;
export {};
