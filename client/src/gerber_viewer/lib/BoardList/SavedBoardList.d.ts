/// <reference types="react" />
import { BoardSummary } from '../types';
declare type Props = {
    selectedId: string | null;
    boards: Array<BoardSummary>;
    onItemClick: (id: string) => void;
};
export default function SavedBoardList(props: Props): JSX.Element;
export {};
