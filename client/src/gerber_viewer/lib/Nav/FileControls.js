import React, { useState } from 'react';
import { useAppState, getBoardPackage } from '../state';
import { Button, Icon } from '../ui';
import OpenFileDrawer from './OpenFileDrawer';
const DOWNLOAD_TOOLTIP = 'Download SVG renders';
const UPLOAD_TOOLTIP = 'Upload Gerber/drill files';
export default function FileControls(props) {
    const { board, loading, downloading, dispatch } = useAppState();
    const [open, setOpen] = useState(false);
    const { buttonClassName } = props;
    const toggleUploadOpen = () => setOpen(!open);
    const handleFiles = (event) => {
        setOpen(false);
        props.handleFiles(event);
    };
    const handleUrl = (url) => {
        setOpen(false);
        props.handleUrl(url);
    };
    const downloadBoard = () => {
        if (board) {
            dispatch(getBoardPackage(board.id));
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Button, { className: buttonClassName, onClick: toggleUploadOpen, disabled: loading, title: UPLOAD_TOOLTIP },
            React.createElement(Icon, { name: "plus" })),
        React.createElement(Button, { className: buttonClassName, onClick: downloadBoard, disabled: !board || downloading, title: DOWNLOAD_TOOLTIP },
            React.createElement(Icon, { name: downloading ? 'spinner' : 'file-download', faProps: { pulse: downloading } })),
        React.createElement(OpenFileDrawer, { open: open, handleFiles: handleFiles, handleUrl: handleUrl, close: toggleUploadOpen })));
}
//# sourceMappingURL=FileControls.js.map