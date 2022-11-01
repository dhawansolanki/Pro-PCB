// root component
import React from "react";
// import { hot } from "react-hot-loader/root";
import StoreProvider from "./state/StoreProvider";
import { useAppState, createBoard, createBoardFromUrl } from "./state";
import BoardDisplay from "./BoardDisplay";
import FileList from "./FileList";
import BoardList from "./BoardList";
import Nav from "./Nav";
import LoadFiles from "./LoadFiles";
import ErrorToast from "./ErrorToast";
import { preventDefault } from "./events";
import { Main } from "./ui";
function App() {
    const { dispatch } = useAppState();
    const handleFiles = (event) => {
        const files = "dataTransfer" in event
            ? Array.from(event.dataTransfer.files)
            : Array.from(event.target.files || []);
        if (files.length > 0)
            dispatch(createBoard(files, "dataTransfer" in event));
        if ("value" in event.target)
            event.target.value = "";
        preventDefault(event);
    };
    const handleUrl = (url) => {
        if (url)
            dispatch(createBoardFromUrl(url));
    };
    return (React.createElement(Main, { onDragOver: preventDefault, onDrop: handleFiles },
        React.createElement(BoardDisplay, null),
        React.createElement(FileList, null),
        React.createElement(BoardList, null),
        React.createElement(Nav, { handleFiles: handleFiles, handleUrl: handleUrl }),
        React.createElement(LoadFiles, { handleFiles: handleFiles, handleUrl: handleUrl }),
        React.createElement(ErrorToast, null)));
}
const GerberViewer = () => (React.createElement(StoreProvider, null,
    React.createElement(App, null)));
export default GerberViewer;
//# sourceMappingURL=App.js.map