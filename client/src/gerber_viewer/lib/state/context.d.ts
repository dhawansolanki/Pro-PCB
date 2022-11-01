import React from 'react';
import { Store, State, Dispatch } from './types';
export declare const INITIAL_STATE: State;
export declare const StoreContext: React.Context<Store>;
export declare const useAppState: () => State & {
    dispatch: Dispatch;
};
