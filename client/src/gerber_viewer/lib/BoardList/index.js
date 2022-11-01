import React, { useState, useEffect } from 'react';
import { useAppState, getBoard } from '../state';
import { usePrevious } from '../hooks';
import { Fade, Slide } from '../ui';
import ShowButton from './ShowButton';
import SavedBoardList from './SavedBoardList';
export default function BoardList() {
    const { mode, loading, board, savedBoards, dispatch } = useAppState();
    const [show, setShow] = useState(mode === null);
    const [selected, setSelected] = useState(board ? board.id : null);
    const prevLoading = usePrevious(loading);
    useEffect(() => {
        if (prevLoading && !loading && board) {
            setShow(false);
            setSelected(board.id);
        }
    }, [prevLoading, loading, board]);
    const haveBoards = savedBoards.length > 0;
    const showList = haveBoards && show;
    return (React.createElement(React.Fragment, null,
        React.createElement(Fade, { in: haveBoards },
            React.createElement(ShowButton, { show: showList, toggle: () => setShow(!show) })),
        React.createElement(Slide, { in: showList, from: "right" },
            React.createElement(SavedBoardList, { selectedId: selected, boards: savedBoards, onItemClick: (id) => {
                    dispatch(getBoard(id));
                    setSelected(id);
                } }))));
}
//# sourceMappingURL=index.js.map