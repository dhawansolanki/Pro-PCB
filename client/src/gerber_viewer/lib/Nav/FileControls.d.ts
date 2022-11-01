/// <reference types="react" />
import { FileEvent } from '../types';
export declare type FileControlsProps = {
    buttonClassName: string;
    handleFiles: (event: FileEvent) => void;
    handleUrl: (url: string) => void;
};
export default function FileControls(props: FileControlsProps): JSX.Element;
