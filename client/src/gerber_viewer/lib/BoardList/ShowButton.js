import React from 'react';
import { Button, Icon } from '../ui';
export default function ShowButton(props) {
    const { show, toggle } = props;
    return (React.createElement(Button, { className: "absolute top-5 right-1 flex items-center f5", onClick: toggle },
        React.createElement("p", { className: "dib lh-title mv0 ml3 mr2" }, `${show ? 'Hide' : 'Show'} saved boards`),
        React.createElement(Icon, { name: show ? 'chevron-right' : 'chevron-left' })));
}
//# sourceMappingURL=ShowButton.js.map