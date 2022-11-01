// @ts-nocheck
import React from "react";
import cx from "classnames";
import { Field } from "formik";
import { Checkbox, HiddenInput, Label } from "../ui";
import { GAP_FILL_DEFAULT } from "./values";
const USE_OUTLINE_LABEL = "use outline layer for board shape";
const GAP_FILL_LABEL = "gap fill limit";
const GAP_FILL_UNITS = "mm";
const OVERRIDE_LABEL = "override";
const COORD_FORMAT_LABEL = "integer/decimal coordinate format";
const ZERO_SUPRESSION_LABEL = "zero suppression";
const UNITS_LABEL = "units";
const NUMBER_INPUT_STYLE = "bb bt-0 br-0 bl-0 bw1 tc near-black b--near-black bg-transparent code f6";
export function UseOutlineInput(props) {
    return (React.createElement(Checkbox, Object.assign({ className: "inline-flex v-mid" }, props.field), USE_OUTLINE_LABEL));
}
export function GapFillInput(props) {
    const { field, form } = props;
    const value = field.value !== "" ? field.value : GAP_FILL_DEFAULT;
    const disabled = !form.values.options.useOutline;
    const className = cx("inline-flex items-center pointer h2 v-mid fr", {
        "o-40": disabled,
    });
    return (React.createElement("label", { className: className },
        GAP_FILL_LABEL,
        React.createElement("input", Object.assign({}, field, { type: "text", className: cx(NUMBER_INPUT_STYLE, "w3 ml3 mr2"), disabled: disabled, value: value })),
        GAP_FILL_UNITS));
}
export function CoordFormatFields(props) {
    const { fieldName, renderName, overridden, defaultValue } = props;
    return (React.createElement(OverridableField, { fieldName: fieldName, label: `${OVERRIDE_LABEL} ${renderName} ${COORD_FORMAT_LABEL}`, overridden: overridden, defaultValue: defaultValue },
        React.createElement(Field, { name: `${fieldName}[0]`, placeholder: defaultValue ? defaultValue[0] : "", type: "text", className: cx(NUMBER_INPUT_STYLE, "w2") }),
        React.createElement("span", { className: "dib mh2" }, "."),
        React.createElement(Field, { name: `${fieldName}[1]`, placeholder: defaultValue ? defaultValue[1] : "", type: "text", className: cx(NUMBER_INPUT_STYLE, "w2") })));
}
function RadioGroup(props) {
    const { field, options, defaultValue } = props;
    return (React.createElement(React.Fragment, null, options.map((opt) => {
        const value = field.value || defaultValue;
        const checked = value === opt.value;
        return (React.createElement(Label, { key: opt.value },
            React.createElement(HiddenInput, Object.assign({}, field, { type: "radio", key: opt.value, value: opt.value, checked: checked })),
            React.createElement("span", { className: cx("dib ph2 ml2", { "bb bw1 b--brand": checked }) }, opt.label)));
    })));
}
export function ZeroSuppressionFields(props) {
    const { fieldName, renderName, overridden, defaultValue } = props;
    return (React.createElement(OverridableField, { fieldName: fieldName, label: `${OVERRIDE_LABEL} ${renderName} ${ZERO_SUPRESSION_LABEL}`, overridden: overridden, defaultValue: defaultValue },
        React.createElement(Field, { name: fieldName, component: RadioGroup, defaultValue: defaultValue, options: [
                { value: "L", label: "leading" },
                { value: "T", label: "trailing" },
            ] })));
}
export function UnitsFields(props) {
    const { fieldName, renderName, overridden, defaultValue } = props;
    return (React.createElement(OverridableField, { fieldName: fieldName, label: `${OVERRIDE_LABEL} ${renderName} ${UNITS_LABEL}`, overridden: overridden, defaultValue: defaultValue },
        React.createElement(Field, { name: fieldName, component: RadioGroup, defaultValue: defaultValue, options: [
                { value: "in", label: "inches" },
                { value: "mm", label: "millimeters" },
            ] })));
}
function OverrideCheckbox(props) {
    const { form, defaultValue, label } = props;
    const field = Object.assign(Object.assign({}, props.field), { checked: !!props.field.value, onBlur: () => { }, onChange: (event) => {
            const value = event.target.checked ? defaultValue : "";
            form.setFieldValue(props.field.name, value);
        } });
    return React.createElement(Checkbox, Object.assign({}, field), label);
}
function OverridableField(props) {
    const { fieldName, label, overridden, defaultValue, children } = props;
    return (React.createElement("div", { className: "flex items-center h2 mt1" },
        React.createElement(Field, { name: fieldName, component: OverrideCheckbox, defaultValue: defaultValue, label: label, className: "flex" }),
        React.createElement("div", { className: cx("flex flex-none ml-auto", { "o-40": !overridden }) }, children)));
}
//# sourceMappingURL=render.js.map