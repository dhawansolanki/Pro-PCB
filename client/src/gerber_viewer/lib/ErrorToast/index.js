import React from 'react';
import { useAppState, dismissError } from '../state';
import { usePrevious } from '../hooks';
import { Slide } from '../ui';
import Toast from './Toast';
export default function ErrorToast() {
    const { error, dispatch } = useAppState();
    const prevError = usePrevious(error);
    const prevErrorMessage = prevError ? prevError.message : null;
    return (React.createElement(Slide, { in: !!error, from: "top" },
        React.createElement(Toast, { dismiss: () => dispatch(dismissError()) }, error ? error.message : prevErrorMessage)));
}
//# sourceMappingURL=index.js.map