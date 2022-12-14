// TODO(mc, 2019-03-01): tree-shake this import somehow or bundle reduction
import { TYPE_COPPER, TYPE_SOLDERMASK, TYPE_SILKSCREEN, TYPE_SOLDERPASTE, TYPE_DRILL, TYPE_OUTLINE, TYPE_DRAWING, SIDE_TOP, SIDE_BOTTOM, SIDE_INNER, SIDE_ALL, } from 'whats-that-gerber';
export { TYPE_COPPER, TYPE_SOLDERMASK, TYPE_SILKSCREEN, TYPE_SOLDERPASTE, TYPE_DRILL, TYPE_OUTLINE, TYPE_DRAWING, SIDE_TOP, SIDE_BOTTOM, SIDE_INNER, SIDE_ALL, };
// all types in priority order
export const ALL_TYPES = [
    TYPE_COPPER,
    TYPE_SOLDERMASK,
    TYPE_SILKSCREEN,
    TYPE_SOLDERPASTE,
    TYPE_DRILL,
    TYPE_OUTLINE,
    TYPE_DRAWING,
];
// all side in priority order
export const ALL_SIDES = [SIDE_TOP, SIDE_BOTTOM, SIDE_INNER, SIDE_ALL];
// copper sides/type in priority order
export const COPPER_TYPES = [TYPE_COPPER];
export const COPPER_SIDES = [SIDE_TOP, SIDE_BOTTOM, SIDE_INNER];
// copper sides in priority order
export const VISIBLE_TYPES = [
    TYPE_SOLDERMASK,
    TYPE_SILKSCREEN,
    TYPE_SOLDERPASTE,
];
export const VISIBLE_SIDES = [SIDE_TOP, SIDE_BOTTOM];
// mechanical sides in priority order
export const MECH_TYPES = [TYPE_DRILL, TYPE_OUTLINE];
export const MECH_SIDES = [SIDE_ALL];
// get list of valid sides based on type
export function typeToValidSides(type) {
    if (COPPER_TYPES.includes(type))
        return COPPER_SIDES;
    if (VISIBLE_TYPES.includes(type))
        return VISIBLE_SIDES;
    if (MECH_TYPES.includes(type))
        return MECH_SIDES;
    return [];
}
// sort by:
//  - top side > bottom side > inner side > all sides > no side
//  - copper > mask > silk > paste > drill > outline > drawing > no type
export function orderLayers(a, b) {
    // place no type and no side at the bottom
    if ((!a.type && b.type) || (!a.side && b.side))
        return 1;
    if ((a.type && !b.type) || (a.side && !b.side))
        return -1;
    let i;
    for (i = 0; i < ALL_SIDES.length; i++) {
        const side = ALL_SIDES[i];
        if (a.side === side && b.side !== side)
            return -1;
        if (a.side !== side && b.side === side)
            return 1;
    }
    for (i = 0; i < ALL_TYPES.length; i++) {
        const type = ALL_TYPES[i];
        if (a.type === type && b.type !== type)
            return -1;
        if (a.type !== type && b.type === type)
            return 1;
    }
    return 0;
}
const OPTIONS = [
    'coordinateFormat',
    'zeroSuppression',
    'units',
];
export function getDefaultLayerOptions(allLayers, type) {
    const layers = allLayers.filter(ly => ly.converter.layer.length !== 0 &&
        ((type === 'gerber' && ly.type && ly.type !== TYPE_DRILL) ||
            (type === 'drill' && ly.type === TYPE_DRILL)));
    return layers.reduce((options, ly) => {
        OPTIONS.forEach(name => {
            const layerValue = ly.initialOptions[name];
            let value = options[name];
            if (typeof value === 'undefined') {
                // set the option to the layer value if it hasn't been set yet
                value = layerValue;
            }
            else if (value !== null) {
                // if it has been set, check that every layer has the same value, and
                // null out the option if they don't
                if (Array.isArray(value)) {
                    if (!Array.isArray(layerValue) ||
                        value[0] !== layerValue[0] ||
                        value[1] !== layerValue[1]) {
                        value = null;
                    }
                }
                else if (value !== layerValue) {
                    value = null;
                }
            }
            if (value !== options[name])
                options = Object.assign(Object.assign({}, options), { [name]: value });
        });
        return options;
    }, {});
}
//# sourceMappingURL=layers.js.map