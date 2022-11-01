import React from 'react';
import { Button, DeleteButton, Icon } from '../ui';
const CANCEL_TOOLTIP = 'Cancel';
const SAVE_TOOLTIP = 'Save changes';
const STYLE = 'absolute top-1 right-1 nt2 nr2 f4';
const BUTTON_STYLE = 'dib pa1';
const DELETE_BUTTON_STYLE = `${BUTTON_STYLE} absolute top-1 left-1 nt2 nl2 f4`;
export default function SettingsButtons(props) {
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: STYLE },
            React.createElement(Button, { type: "reset", className: BUTTON_STYLE, title: CANCEL_TOOLTIP },
                React.createElement(Icon, { name: "times" })),
            React.createElement(Button, { type: "submit", className: BUTTON_STYLE, title: SAVE_TOOLTIP },
                React.createElement(Icon, { name: "check", className: "green" }))),
        React.createElement(DeleteButton, { onClick: props.delete, className: DELETE_BUTTON_STYLE })));
}
//# sourceMappingURL=SettingsButtons.js.map