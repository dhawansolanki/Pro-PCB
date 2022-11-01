import { __rest } from "tslib";
import React from 'react';
import cx from 'classnames';
import { Icon } from './Icon';
export const LABEL_CLASSNAME = 'flex items-center';
export function Label(props) {
    const { className, disabled, children } = props, rest = __rest(props, ["className", "disabled", "children"]);
    const style = cx(LABEL_CLASSNAME, className, { pointer: !disabled });
    return (React.createElement("label", Object.assign({ className: style }, rest), children));
}
export function HiddenInput(props) {
    return React.createElement("input", Object.assign({ className: "clip" }, props));
}
export function Checkbox(props) {
    const { className, children } = props, inputProps = __rest(props, ["className", "children"]);
    const iconName = props.value || props.checked === true ? 'check-square' : 'square';
    return (React.createElement(Label, { className: className },
        React.createElement(HiddenInput, Object.assign({ type: "checkbox" }, inputProps)),
        React.createElement(Icon, { className: "nl2", name: iconName }),
        children));
}
//# sourceMappingURL=inputs.js.map