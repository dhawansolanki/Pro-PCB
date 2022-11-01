import React from 'react';
import { Slide } from './animation';
import { Button } from './buttons';
import { Icon } from './Icon';
const STYLE = 'fixed top-1 right-1 z-2 w-25 nt2 nr2 pv2 ph3 br3 near-black bg-white shadow';
const TITLE_BAR_STYLE = 'flex items-center mb3';
const TITLE_STYLE = 'mr-auto f3 lh-title mv0 normal';
const BUTTON_STYLE = 'flex-none nr2 f4';
export function Drawer(props) {
    const { title, open, children, close } = props;
    return (React.createElement(Slide, { in: open, from: "right" },
        React.createElement("section", { className: STYLE },
            React.createElement("div", { className: TITLE_BAR_STYLE },
                React.createElement("h2", { className: TITLE_STYLE }, title),
                React.createElement(Button, { onClick: close, className: BUTTON_STYLE },
                    React.createElement(Icon, { name: "times" }))),
            children)));
}
//# sourceMappingURL=Drawer.js.map