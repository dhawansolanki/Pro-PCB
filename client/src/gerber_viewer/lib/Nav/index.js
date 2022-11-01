import React from 'react';
import { useAppState } from '../state';
import { PageTitle, Slide } from '../ui';
import AppSettings from '../AppSettings';
import BoardSettings from '../BoardSettings';
import FileControls from './FileControls';
import Footer from './Footer';
const STYLE = 'flex items-start justify-between relative w-100 h3';
const TITLE_STYLE = 'w-third flex-none';
const BUTTON_WRAPPER_STYLE = 'flex-none flex items-start justify-end w-third';
const BUTTON_STYLE = 'ml1 pa1 f3';
export default function Nav(props) {
    const { board, loading, updating } = useAppState();
    const { handleFiles, handleUrl } = props;
    const show = !loading && board !== null;
    return (React.createElement("nav", { className: STYLE },
        React.createElement(PageTitle, { subtitle: "view", className: TITLE_STYLE }),
        board && (React.createElement(Slide, { in: show, from: "top" },
            React.createElement(BoardSettings, { board: board, updating: updating }))),
        React.createElement("div", { className: BUTTON_WRAPPER_STYLE },
            React.createElement(FileControls, { buttonClassName: BUTTON_STYLE, handleFiles: handleFiles, handleUrl: handleUrl }),
            React.createElement(AppSettings, { buttonClassName: BUTTON_STYLE })),
        React.createElement(Footer, null)));
}
//# sourceMappingURL=index.js.map