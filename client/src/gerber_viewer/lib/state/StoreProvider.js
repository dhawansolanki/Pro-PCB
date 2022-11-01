import React, { useState, useRef, useEffect } from 'react';
import reducer from './reducer';
import createMiddleware from './middleware';
import { INITIAL_STATE, StoreContext } from './context';
export default function StoreProvider(props) {
    const [state, setState] = useState(INITIAL_STATE);
    const stateRef = useRef(state);
    const dispatchRef = useRef(a => a);
    const store = {
        getState: () => stateRef.current,
        dispatch: (action) => dispatchRef.current(action),
    };
    useEffect(() => {
        dispatchRef.current = createMiddleware().reduceRight((next, handler) => handler(store)(next), function baseDispatch(action) {
            stateRef.current = reducer(stateRef.current, action);
            setState(stateRef.current);
            return action;
        });
    }, []);
    return (React.createElement(StoreContext.Provider, { value: store }, props.children));
}
//# sourceMappingURL=StoreProvider.js.map