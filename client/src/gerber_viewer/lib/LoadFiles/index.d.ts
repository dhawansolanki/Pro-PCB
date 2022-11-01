/// <reference types="react" />
import { FileEvent } from '../types';
export declare type LoadFilesProps = {
    handleFiles: (event: FileEvent) => void;
    handleUrl: (url: string) => void;
};
export default function LoadFiles(props: LoadFilesProps): JSX.Element;
