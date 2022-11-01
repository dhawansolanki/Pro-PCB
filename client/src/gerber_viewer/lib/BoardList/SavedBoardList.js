import React from 'react';
import { stopPropagation } from '../events';
import BoardItem from './BoardItem';
const STYLE = 'absolute right-0 top-7 bottom-5 w-third overflow-hidden';
const WRAPPER_STYLE = 'w-100 mxh-100 ph3 overflow-y-auto scrollbar-white';
const LIST_STYLE = 'list mt1 mb0 pl0 near-black';
export default function SavedBoardList(props) {
    const { selectedId, boards, onItemClick } = props;
    return (React.createElement("div", { className: STYLE },
        React.createElement("div", { onWheel: stopPropagation, className: WRAPPER_STYLE },
            React.createElement("ul", { className: LIST_STYLE }, boards.map(b => (React.createElement(BoardItem, Object.assign({}, b, { key: b.id, selected: b.id === selectedId, onClick: onItemClick }))))))));
}
//# sourceMappingURL=SavedBoardList.js.map