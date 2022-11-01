import React from 'react';
import cx from 'classnames';
export const BUTTON_CLASSNAME = 'br2';
export function getButtonStyle(props) {
    return cx({
        'o-40': props.disabled,
        'pointer bg-animate hover-bg-black-20': !props.disabled,
    }, BUTTON_CLASSNAME, props.className);
}
export function Button(props) {
    const { onClick, title, children } = props;
    const type = props.type || 'button';
    const disabled = Boolean(props.disabled);
    const className = getButtonStyle(props);
    return (React.createElement("button", { type: type, onClick: onClick, disabled: disabled, className: className, title: title, suppressHydrationWarning: true }, children));
}
//# sourceMappingURL=Button.js.map