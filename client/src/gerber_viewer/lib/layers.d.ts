import { TYPE_COPPER, TYPE_SOLDERMASK, TYPE_SILKSCREEN, TYPE_SOLDERPASTE, TYPE_DRILL, TYPE_OUTLINE, TYPE_DRAWING, SIDE_TOP, SIDE_BOTTOM, SIDE_INNER, SIDE_ALL } from 'whats-that-gerber';
import { Optional, GerberType, GerberSide, LayerRender, LayerOptions } from './types';
export { TYPE_COPPER, TYPE_SOLDERMASK, TYPE_SILKSCREEN, TYPE_SOLDERPASTE, TYPE_DRILL, TYPE_OUTLINE, TYPE_DRAWING, SIDE_TOP, SIDE_BOTTOM, SIDE_INNER, SIDE_ALL, };
declare type TypeList = Array<NonNullable<GerberType>>;
declare type SideList = Array<NonNullable<GerberSide>>;
export declare const ALL_TYPES: TypeList;
export declare const ALL_SIDES: SideList;
export declare const COPPER_TYPES: TypeList;
export declare const COPPER_SIDES: SideList;
export declare const VISIBLE_TYPES: TypeList;
export declare const VISIBLE_SIDES: SideList;
export declare const MECH_TYPES: TypeList;
export declare const MECH_SIDES: SideList;
export declare function typeToValidSides(type: unknown): SideList;
export declare function orderLayers(a: LayerRender, b: LayerRender): number;
export declare function getDefaultLayerOptions(allLayers: Array<LayerRender>, type: 'gerber' | 'drill'): Optional<LayerOptions>;
