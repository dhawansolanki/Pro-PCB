// @ts-nocheck
import React from 'react';
import cx from 'classnames';
import contrast from 'contrast';
import { Field } from 'formik';
import { ColorPill, Icon, Label } from '../ui';
import { MASK_ALPHA } from './values';
const DEFAULT_COLOR_PRESET = {
    cf: '#cc9933',
    sm: '#004200',
    ss: '#ffffff',
};
const OSH_PARK_COLOR_PRESET = {
    cf: '#cc9933',
    sm: '#4b0082',
    ss: '#ffffff',
};
const SPARKFUN_COLOR_PRESET = {
    cf: '#f5f5f5',
    sm: '#cc0000',
    ss: '#ffffff',
};
const COLOR_PRESETS = [
    { title: 'default', color: DEFAULT_COLOR_PRESET },
    { title: 'OSH Park', color: OSH_PARK_COLOR_PRESET },
    { title: 'SparkFun', color: SPARKFUN_COLOR_PRESET },
];
const COLOR_IDS = ['sm', 'ss', 'cf'];
const COLOR_NAMES = { sm: 'soldermask', ss: 'silkscreen', cf: 'copper finish' };
// TOCO(mc, 2019-03-01): move opacity entirely to pcb-stackup-core
const stripAlpha = (c) => c.slice(0, 7);
const colorsMatch = (a, b) => stripAlpha(a) === stripAlpha(b);
function ColorInput(props) {
    const { colorId, field, form } = props;
    const value = stripAlpha(`${field.value}`);
    return (React.createElement(Label, { className: "h2" },
        React.createElement("span", { className: "mr-auto" }, COLOR_NAMES[colorId]),
        React.createElement("input", Object.assign({}, field, { value: value, type: "color", className: "clip", onChange: event => {
                let value = stripAlpha(event.target.value);
                if (colorId === 'sm')
                    value += MASK_ALPHA;
                form.setFieldValue(field.name, value);
            } })),
        React.createElement(ColorPill, { color: value })));
}
export function ColorPresetsField(props) {
    return React.createElement(Field, { name: props.fieldName, component: ColorPresetInput });
}
export function ColorFields(props) {
    return (React.createElement(React.Fragment, null, COLOR_IDS.map(id => (React.createElement(Field, { key: id, name: `${props.fieldName}.${id}`, component: ColorInput, colorId: id })))));
}
function ColorPresetInput(props) {
    return (React.createElement(React.Fragment, null, COLOR_PRESETS.map(preset => (React.createElement(ColorPresetOption, Object.assign({ key: preset.title }, preset, props))))));
}
function ColorPresetOption(props) {
    const { title, color, field, form } = props;
    const value = Object.assign(Object.assign({}, color), { sm: `${stripAlpha(color.sm)}${MASK_ALPHA}` });
    const checked = COLOR_IDS.every(i => colorsMatch(color[i], field.value[i]));
    const iconName = checked ? 'dot-circle' : 'circle';
    return (React.createElement(Label, { className: "h2" },
        React.createElement("input", { type: "radio", className: "clip", checked: checked, onChange: () => form.setFieldValue(field.name, value) }),
        React.createElement(Icon, { name: iconName, className: "flex-none nl2" }),
        React.createElement("span", { className: "lh-title mr-auto" }, title),
        React.createElement(BoardColorSwatch, { boardColor: color })));
}
function BoardColorSwatch(props) {
    const { boardColor } = props;
    return (React.createElement("div", { className: "flex-none tf-skew-15" }, COLOR_IDS.map((id, index, collection) => {
        const color = boardColor[id];
        const previous = boardColor[collection[index - 1]] || null;
        const needsBorder = contrast(color) === 'light';
        const prevHasBorder = previous && contrast(previous) === 'light';
        const style = cx('border-box dib w1 h1 v-mid', {
            'bt bb br b--near-black': needsBorder,
            bl: needsBorder && !prevHasBorder,
        });
        return (React.createElement("span", { key: id, className: style, style: { backgroundColor: color } }));
    })));
}
//# sourceMappingURL=color.js.map