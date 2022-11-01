/// <reference types="react" />
import { ButtonProps } from '../ui';
declare type Props = {
    open: boolean;
    onClick: ButtonProps['onClick'];
};
export default function ToggleOpenButton(props: Props): JSX.Element;
export {};
