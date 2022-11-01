// @ts-nocheck
import React from "react";
import cx from "classnames";
import { ColorPill, HiddenInput, Label } from "../ui";
import { SIDE_ALL, ALL_TYPES, typeToValidSides } from "../layers";
export function LayerList(props) {
    return React.createElement("ul", { className: "list pl0 mv0" }, props.children);
}
export function LayerItem(props) {
    const { filename } = props;
    return (React.createElement("li", { className: "flex items-center mb3" },
        React.createElement("p", { className: "code f5 lh-title mv0 mr-auto" }, filename),
        props.children));
}
export function LayerTypeSelect(props) {
    const { layerId, form, field } = props;
    return (React.createElement("select", Object.assign({}, field, { className: "dib flex-none f5 w4 mr2", onChange: (event) => {
            const type = event.target.value || "";
            const layer = form.values.layers[layerId];
            const validSides = typeToValidSides(type);
            const side = validSides.includes(layer.side)
                ? layer.side
                : validSides[0] || "";
            form.setValues(Object.assign(Object.assign({}, form.values), { layers: Object.assign(Object.assign({}, form.values.layers), { [layerId]: Object.assign(Object.assign({}, layer), { type, side }) }) }));
        } }),
        ALL_TYPES.map((t) => (React.createElement("option", { key: t, value: t }, t))),
        React.createElement("option", { value: "" }, "n/a")));
}
export function LayerSideSelect(props) {
    const { layerId, field, form } = props;
    const { type } = form.values.layers[layerId];
    const options = typeToValidSides(type);
    const disabled = options.length < 2;
    if (options.length < 1)
        options.push("");
    return (React.createElement("select", Object.assign({ className: "dib flex-none f5 w4 mr2", disabled: disabled }, field), options.map((opt) => (React.createElement("option", { key: opt, value: opt }, opt === SIDE_ALL || opt === "" ? "n/a" : opt)))));
}
export function LayerColorInput(props) {
    const { layerId, field, form } = props;
    const { type } = form.values.layers[layerId];
    const disabled = type === "";
    return (React.createElement(Label, { className: "h2", disabled: disabled },
        React.createElement(HiddenInput, Object.assign({ type: "color", disabled: disabled }, field)),
        React.createElement(ColorPill, { color: field.value, className: cx({ "o-40": disabled }) })));
}
//# sourceMappingURL=layers.js.map