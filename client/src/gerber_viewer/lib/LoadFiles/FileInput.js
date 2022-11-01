import React from 'react';
import { HiddenInput, Icon } from '../ui';
export default function FileInput(props) {
    const { children, handleFiles } = props;
    return (React.createElement("label", { className: "db pv4 pointer" },
        React.createElement(HiddenInput, { type: "file", onChange: handleFiles, multiple: true }),
        React.createElement(Icon, { name: "plus", className: "dib f1 brand" }),
        children));
}
//# sourceMappingURL=FileInput.js.map