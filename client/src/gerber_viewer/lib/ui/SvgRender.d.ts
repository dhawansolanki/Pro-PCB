import React from 'react';
import { SvgSource } from '../types';
export declare type SvgRenderProps = {
    source: SvgSource;
    className?: string;
};
export declare const SvgRender: React.MemoExoticComponent<typeof _SvgRender>;
declare function _SvgRender(props: SvgRenderProps): JSX.Element | null;
export {};
