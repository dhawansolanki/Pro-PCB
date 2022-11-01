export const MASK_ALPHA = 'bf';
export const GAP_FILL_DEFAULT = 0.00011;
export function valuesToBoardUpdate(values, log) {
    let outlineGapFill = values.options.outlineGapFill !== ''
        ? Number(values.options.outlineGapFill)
        : GAP_FILL_DEFAULT;
    if (!Number.isFinite(outlineGapFill))
        outlineGapFill = GAP_FILL_DEFAULT;
    return {
        name: values.name,
        options: parseFormBoardOptions(values.options),
        gerberOptions: parseFormLayerOptions(values.gerberOptions, log),
        drillOptions: parseFormLayerOptions(values.drillOptions, log),
        layers: parseFormLayerUpdates(values.layers),
    };
}
export function boardRenderToValues(board) {
    return {
        name: board.name,
        options: boardOptionsToFormValue(board.options),
        gerberOptions: layerOptionsToFormValue(board.gerberOptions),
        drillOptions: layerOptionsToFormValue(board.drillOptions),
        layers: board.layers.reduce((result, ly) => (Object.assign(Object.assign({}, result), { [ly.id]: { side: ly.side || '', type: ly.type || '', color: ly.color } })), {}),
    };
}
function parseFormBoardOptions(formOptions) {
    let color = formOptions.color;
    let outlineGapFill = formOptions.outlineGapFill !== ''
        ? Number(formOptions.outlineGapFill)
        : GAP_FILL_DEFAULT;
    if (!Number.isFinite(outlineGapFill))
        outlineGapFill = GAP_FILL_DEFAULT;
    color = Object.assign(Object.assign({}, color), { sm: `${color.sm.slice(0, 7)}${MASK_ALPHA}` });
    return Object.assign(Object.assign({}, formOptions), { color, outlineGapFill });
}
function parseFormLayerOptions(formOptions, log) {
    const { coordinateFormat, zeroSuppression, units } = formOptions;
    const result = {};
    if (Array.isArray(coordinateFormat)) {
        const parsed = coordinateFormat.map(Number);
        if (Number.isInteger(parsed[0]) && Number.isInteger(parsed[1])) {
            result.coordinateFormat = [parsed[0], parsed[1]];
        }
        else {
            log.warn('Invalid coordinateFormat:', coordinateFormat);
        }
    }
    if (zeroSuppression)
        result.zeroSuppression = zeroSuppression;
    if (units)
        result.units = units;
    return result;
}
function parseFormLayerUpdates(formUpdates) {
    return Object.keys(formUpdates).reduce((result, id) => {
        const update = formUpdates[id];
        return Object.assign(Object.assign({}, result), { [id]: {
                type: update.type || null,
                side: update.side || null,
                color: update.color,
            } });
    }, {});
}
function boardOptionsToFormValue(options) {
    return Object.assign(Object.assign({}, options), { color: Object.assign(Object.assign({}, options.color), { sm: options.color.sm.slice(0, 7) }) });
}
function layerOptionsToFormValue(options) {
    return {
        coordinateFormat: options.coordinateFormat || '',
        zeroSuppression: options.zeroSuppression || '',
        units: options.units || '',
    };
}
//# sourceMappingURL=values.js.map