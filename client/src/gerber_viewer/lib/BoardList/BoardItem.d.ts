/// <reference types="react" />
import { BoardSummary } from '../types';
export declare type BoardItemProps = BoardSummary & {
    onClick: (id: string) => void;
    selected: boolean;
};
export default function BoardItem(props: BoardItemProps): JSX.Element;
