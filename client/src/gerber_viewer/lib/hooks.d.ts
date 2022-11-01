export declare function useTimeout(handler: () => unknown, delay: number | null): void;
export declare function usePrevious<Value>(value: Value): Value | null;
export declare function useWindowListener<Event extends keyof WindowEventMap>(event: Event, handler: (event: WindowEventMap[Event]) => unknown): void;
export declare function useLocation(): Location | null;
