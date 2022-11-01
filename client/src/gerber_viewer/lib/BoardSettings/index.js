import React, { useState, useRef, useEffect } from 'react';
import { stopPropagation } from '../events';
import { Button, Icon, Fade } from '../ui';
import { BoardName } from './name';
import ModeSelect from './ModeSelect';
import SettingsForm from './SettingsForm';
const OPEN_BUTTON_TOOLTIP = 'Board settings';
const STYLE = 'dib ph3 tc v-top w-third';
const NAME_STYLE = 'flex items-center justify-center';
const OPEN_BUTTON_STYLE = 'nr4';
const MODAL_STYLE = 'fixed top-1 left-0 right-0 bottom-1 z-1 nt2';
const MODAL_CONTENTS_STYLE = 'relative w-50 mxh-100 center pt2 ph4 br3 near-black bg-white shadow overflow-y-auto scrollbar-near-black';
const FORM_STYLE = 'dib w-100';
export default function BoardSettings(props) {
    const [open, setOpen] = useState(false);
    const modalContentsRef = useRef(null);
    useEffect(() => {
        const $modalContents = modalContentsRef.current;
        if ($modalContents) {
            const { width } = $modalContents.getBoundingClientRect();
            const clientWidth = $modalContents.clientWidth;
            const shift = (width - clientWidth) / 2;
            // shift modal contents by scrollbar width if present
            $modalContents.style.transform = `translateX(${shift}px)`;
        }
    });
    const { board, updating } = props;
    const toggleOpen = () => setOpen(!open);
    return (React.createElement("div", { className: STYLE },
        React.createElement("div", { className: NAME_STYLE },
            React.createElement(BoardName, null, board.name),
            React.createElement(Button, { onClick: toggleOpen, disabled: updating, className: OPEN_BUTTON_STYLE, title: OPEN_BUTTON_TOOLTIP },
                React.createElement(Icon, { name: updating ? 'spinner' : 'cog', faProps: { pulse: updating } }))),
        React.createElement(ModeSelect, null),
        React.createElement(Fade, { in: open },
            React.createElement("div", { className: MODAL_STYLE, onWheel: stopPropagation },
                React.createElement("div", { className: MODAL_CONTENTS_STYLE, ref: modalContentsRef },
                    React.createElement(SettingsForm, { className: FORM_STYLE, board: board, close: toggleOpen }))))));
}
//# sourceMappingURL=index.js.map