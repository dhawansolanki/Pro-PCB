import React from 'react';
import { useTimeout } from '../hooks';
import { Button, Icon } from '../ui';
const STYLE = 'dib center fixed top-1 left-0 right-0 tc';
const WRAPPER_STYLE = 'inline-flex items-center justify-center pl3 pv1 pr1 br2 bg-red white shadow';
const MESSAGE_STYLE = 'mv0 mr2';
const DISMISS_TIMEOUT = 4000;
export default function Toast(props) {
    const { dismiss, children } = props;
    useTimeout(dismiss, DISMISS_TIMEOUT);
    return (React.createElement("div", { className: STYLE },
        React.createElement("div", { className: WRAPPER_STYLE },
            React.createElement("p", { className: MESSAGE_STYLE },
                'Error: ',
                children),
            React.createElement(Button, { onClick: dismiss },
                React.createElement(Icon, { name: "times" })))));
}
//# sourceMappingURL=Toast.js.map