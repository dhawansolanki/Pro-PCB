/// <reference types="react" />
import { FileEvent } from '../types';
export declare type OpenFileDrawerProps = {
    open: boolean;
    handleFiles: (event: FileEvent) => void;
    handleUrl: (url: string) => void;
    close: () => void;
};
declare function OpenFileDrawer(props: OpenFileDrawerProps): JSX.Element;
export default OpenFileDrawer;
