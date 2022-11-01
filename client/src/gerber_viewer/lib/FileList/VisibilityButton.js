import React from 'react';
import contrast from 'contrast';
import { SIDE_TOP, SIDE_BOTTOM, SIDE_ALL } from 'whats-that-gerber';
import { useAppState, toggleVisibility } from '../state';
import { Button, Icon } from '../ui';
const TOP_SIDES = [SIDE_TOP, SIDE_ALL];
const BOTTOM_SIDES = [SIDE_BOTTOM, SIDE_ALL];
const TOOLTIP = 'Toggle layer visibility (shift+click to toggle other layers)';
const BOARD_MODE_TOOLTIP = 'Cannot change visibility in board mode';
const NO_RENDER_TOOLTIP = 'Unable to render file';
const layerVisible = (mode, type, side, converter, layerVisibility) => type !== null &&
    converter.layer.length !== 0 &&
    ((mode === 'layers' && layerVisibility) ||
        (mode === 'top' && TOP_SIDES.includes(side)) ||
        (mode === 'bottom' && BOTTOM_SIDES.includes(side)));
const layerTooltip = (mode, disabled) => {
    if (mode !== 'layers')
        return BOARD_MODE_TOOLTIP;
    if (disabled)
        return NO_RENDER_TOOLTIP;
    return TOOLTIP;
};
export default function VisibilityButton(props) {
    const { mode, layerVisibility, dispatch } = useAppState();
    const { id, side, type, converter, color, className } = props;
    const disabled = type === null || converter.layer.length === 0 || mode !== 'layers';
    const visible = layerVisible(mode, type, side, converter, layerVisibility[id]);
    const tooltip = layerTooltip(mode, disabled);
    const iconProps = { name: visible ? 'eye' : 'eye-slash' };
    if (mode === 'layers' && visible) {
        iconProps.style = {
            backgroundColor: color,
            color: contrast(color) === 'dark' ? 'white' : 'currentColor',
        };
    }
    return (React.createElement(Button, { className: className, title: tooltip, disabled: disabled, onClick: event => dispatch(toggleVisibility(id, event.shiftKey)) },
        React.createElement(Icon, Object.assign({}, iconProps))));
}
//# sourceMappingURL=VisibilityButton.js.map