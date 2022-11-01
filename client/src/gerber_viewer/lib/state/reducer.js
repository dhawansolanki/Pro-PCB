import * as actionTypes from './actions';
import { INITIAL_STATE } from './context';
export default function reducer(state, action) {
    switch (action.type) {
        case actionTypes.APP_PREFERENCES: {
            return Object.assign(Object.assign({}, state), { appPreferences: action.payload });
        }
        case actionTypes.CREATE_BOARD:
        case actionTypes.CREATE_BOARD_FROM_URL: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case actionTypes.GET_BOARD:
        case actionTypes.DELETE_BOARD:
        case actionTypes.DELETE_ALL_BOARDS: {
            return Object.assign(Object.assign({}, state), { loading: true });
        }
        case actionTypes.UPDATE_BOARD: {
            const { id, update } = action.payload;
            if (!state.board || state.board.id !== id)
                return state;
            return Object.assign(Object.assign({}, state), { updating: true, board: Object.assign(Object.assign({}, state.board), { name: update.name || state.board.name }) });
        }
        case actionTypes.GET_BOARD_PACKAGE: {
            return Object.assign(Object.assign({}, state), { downloading: true });
        }
        case actionTypes.SET_MODE: {
            return Object.assign(Object.assign({}, state), { mode: action.payload });
        }
        case actionTypes.TOGGLE_VISIBILITY: {
            const { id, solo } = action.payload;
            const { board } = state;
            let layerVisibility = Object.assign(Object.assign({}, state.layerVisibility), { [id]: solo || !state.layerVisibility[id] });
            if (solo) {
                const layers = board ? board.layers : [];
                const otherIds = layers.map(ly => ly.id).filter(lyId => lyId !== id);
                const nextVisibilty = otherIds.every(lyId => !layerVisibility[lyId]);
                layerVisibility = otherIds.reduce((result, id) => (Object.assign(Object.assign({}, result), { [id]: nextVisibilty })), layerVisibility);
            }
            return Object.assign(Object.assign({}, state), { layerVisibility });
        }
        case actionTypes.WORKER_INITIALIZED: {
            return Object.assign(Object.assign({}, state), { savedBoards: action.payload });
        }
        case actionTypes.BOARD_RENDERED: {
            const { mode, layerVisibility: prevLayerVisibility } = state;
            const board = action.payload;
            const layerVisibility = board.layers.reduce((result, ly) => {
                const prevVisibility = prevLayerVisibility[ly.id];
                return Object.assign(Object.assign({}, result), { [ly.id]: prevVisibility != null ? prevVisibility : true });
            }, {});
            return Object.assign(Object.assign({}, state), { board,
                layerVisibility, mode: mode || 'top', loading: false, updating: false });
        }
        case actionTypes.BOARD_UPDATED: {
            const updatedBoard = action.payload;
            const savedBoards = state.savedBoards.map(b => b.id === updatedBoard.id ? updatedBoard : b);
            if (savedBoards.indexOf(updatedBoard) < 0)
                savedBoards.push(updatedBoard);
            return Object.assign(Object.assign({}, state), { savedBoards });
        }
        case actionTypes.BOARD_DELETED: {
            const id = action.payload;
            const savedBoards = state.savedBoards.filter(b => b.id !== id);
            let { board, mode } = state;
            if (board && board.id === id) {
                board = null;
                mode = null;
            }
            return Object.assign(Object.assign({}, state), { mode, board, savedBoards, loading: false });
        }
        case actionTypes.BOARD_PACKAGED: {
            return Object.assign(Object.assign({}, state), { downloading: false });
        }
        case actionTypes.ALL_BOARDS_DELETED: {
            return INITIAL_STATE;
        }
        case actionTypes.DISMISS_ERROR: {
            return Object.assign(Object.assign({}, state), { error: null });
        }
        case actionTypes.WORKER_ERRORED: {
            const nextState = Object.assign(Object.assign({}, state), { error: action.payload.error });
            switch (action.payload.request.type) {
                case actionTypes.CREATE_BOARD:
                case actionTypes.CREATE_BOARD_FROM_URL:
                case actionTypes.DELETE_BOARD:
                case actionTypes.DELETE_ALL_BOARDS:
                    return Object.assign(Object.assign({}, nextState), { loading: false });
                case actionTypes.UPDATE_BOARD:
                    return Object.assign(Object.assign({}, nextState), { updating: false });
                case actionTypes.GET_BOARD_PACKAGE:
                    return Object.assign(Object.assign({}, nextState), { downloading: false });
            }
            return nextState;
        }
    }
    return state;
}
//# sourceMappingURL=reducer.js.map