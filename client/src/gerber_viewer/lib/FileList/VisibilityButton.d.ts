/// <reference types="react" />
import { LayerRender } from '../types';
declare type Props = {
    className: string;
    id: LayerRender['id'];
    side: LayerRender['side'];
    type: LayerRender['type'];
    converter: LayerRender['converter'];
    color: LayerRender['color'];
};
export default function VisibilityButton(props: Props): JSX.Element;
export {};
