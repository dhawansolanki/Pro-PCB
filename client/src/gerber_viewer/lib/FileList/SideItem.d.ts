/// <reference types="react" />
import { LayerRender } from '../types';
declare type Props = {
    label: string;
    layers: Array<LayerRender>;
    showFilenames: boolean;
};
export default function SideList(props: Props): JSX.Element | null;
export {};
