import React from 'react';
import { useAppState } from '../state';
import { Icon, Fade } from '../ui';
import FileInput from './FileInput';
import UrlInput from './UrlInput';
const UPLOAD_MESSAGE = 'Upload your Gerber and drill files to render your board';
const UPLOAD_SUBMESSAGE = 'ZIP files work, too';
const URL_MESSAGE = 'or enter the URL of a ZIP archive';
const WRAPPER_STYLE = 'absolute absolute--center near-black tc';
const MESSAGE_STYLE = 'mt3 mb0 f4 lh-copy';
const SUBMESSAGE_STYLE = 'f5 fw3';
export default function LoadFiles(props) {
    const { mode, loading } = useAppState();
    return (React.createElement(React.Fragment, null,
        React.createElement(Fade, { in: loading },
            React.createElement(Icon, { className: `${WRAPPER_STYLE} f1 brand`, name: "spinner", faProps: { pulse: true } })),
        React.createElement(Fade, { in: !mode && !loading },
            React.createElement("div", { className: WRAPPER_STYLE },
                React.createElement(FileInput, { handleFiles: props.handleFiles },
                    React.createElement("p", { className: MESSAGE_STYLE },
                        UPLOAD_MESSAGE,
                        React.createElement("br", null),
                        React.createElement("span", { className: SUBMESSAGE_STYLE },
                            "(",
                            UPLOAD_SUBMESSAGE,
                            ")"))),
                // React.createElement(UrlInput, { handleUrl: props.handleUrl }, URL_MESSAGE)
                ))));
}
//# sourceMappingURL=index.js.map