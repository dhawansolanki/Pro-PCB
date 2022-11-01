import React from 'react';
import { ViewBox } from 'viewbox';
import { LayerRender, LayerVisibilityMap } from '../types';
declare type Props = {
    layers: Array<LayerRender>;
    layerVisibility: LayerVisibilityMap;
    viewBox: ViewBox;
    className?: string;
};
export declare function LayersRender(props: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof LayersRender>;
export default _default;
