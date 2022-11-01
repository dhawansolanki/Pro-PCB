import React, { useContext } from 'react';
export const INITIAL_STATE = {
    appPreferences: {},
    board: null,
    savedBoards: [],
    mode: null,
    loading: false,
    updating: false,
    downloading: false,
    layerVisibility: {},
    error: null,
};
export const StoreContext = React.createContext({
    getState: () => INITIAL_STATE,
    dispatch: a => a,
});
export const useAppState = () => {
    const { getState, dispatch } = useContext(StoreContext);
    return Object.assign(Object.assign({}, getState()), { dispatch });
};
//# sourceMappingURL=context.js.map