// reusable utility hooks
import { useEffect, useRef } from 'react';
export function useTimeout(handler, delay) {
    useEffect(() => {
        if (delay !== null) {
            const timeout = window.setTimeout(handler, delay);
            return () => window.clearTimeout(timeout);
        }
    }, [delay]);
}
export function usePrevious(value) {
    const valueRef = useRef(null);
    useEffect(() => {
        valueRef.current = value;
    }, [value]);
    return valueRef.current;
}
export function useWindowListener(event, handler) {
    useEffect(() => {
        window.addEventListener(event, handler);
        return () => window.removeEventListener(event, handler);
    });
}
export function useLocation() {
    const locationRef = useRef(null);
    useEffect(() => {
        locationRef.current = window.location;
    }, []);
    return locationRef.current;
}
//# sourceMappingURL=hooks.js.map