import React, { useState } from 'react';
import { useAppState } from '../state';
import { Fade, Slide } from '../ui';
import SideList from './SideList';
import ShowFilenamesButton from './ShowFilenamesButton';
export default function FileList() {
    const { loading, board } = useAppState();
    const [showFilenames, setShowFilenames] = useState(false);
    const layers = board ? board.layers : [];
    const show = !loading && board !== null;
    return (React.createElement(React.Fragment, null,
        React.createElement(Slide, { in: show, from: "left" },
            React.createElement(SideList, { layers: layers, showFilenames: showFilenames })),
        React.createElement(Fade, { in: show },
            React.createElement(ShowFilenamesButton, { showFilenames: showFilenames, toggle: () => setShowFilenames(!showFilenames) }))));
}
//# sourceMappingURL=index.js.map