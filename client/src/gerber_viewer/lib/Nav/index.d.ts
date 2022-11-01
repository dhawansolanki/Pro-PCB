/// <reference types="react" />
import { FileEvent } from '../types';
declare type Props = {
    handleFiles: (event: FileEvent) => void;
    handleUrl: (url: string) => void;
};
export default function Nav(props: Props): JSX.Element;
export {};
