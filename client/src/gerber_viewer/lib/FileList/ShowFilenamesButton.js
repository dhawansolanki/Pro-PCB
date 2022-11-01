import React from 'react';
import { Button, Icon } from '../ui';
const STYLE = 'absolute left-1 bottom-2 flex items-center f5';
const LABEL_STYLE = 'dib lh-title mv0 ml2 mr3';
export default function ShowFilenamesButton(props) {
    const { showFilenames, toggle } = props;
    return (React.createElement(Button, { className: STYLE, onClick: toggle },
        React.createElement(Icon, { name: showFilenames ? 'chevron-left' : 'chevron-right' }),
        React.createElement("p", { className: LABEL_STYLE }, `${showFilenames ? 'Hide' : 'Show'} filenames`)));
}
//# sourceMappingURL=ShowFilenamesButton.js.map