import React from 'react';
import { FileEvent } from '../types';
export declare type FileInputProps = {
    children?: React.ReactNode;
    handleFiles: (event: FileEvent) => unknown;
};
export default function FileInput(props: FileInputProps): JSX.Element;
