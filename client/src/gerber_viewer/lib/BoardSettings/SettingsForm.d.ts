/// <reference types="react" />
import { BoardRender } from '../types';
declare type SettingsFormProps = {
    className: string;
    board: BoardRender;
    close: () => void;
};
export default function SettingsForm(props: SettingsFormProps): JSX.Element;
export {};
