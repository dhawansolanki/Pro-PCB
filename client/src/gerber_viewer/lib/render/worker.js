import { __awaiter } from "tslib";
import { createBoardDatabase, saveBoard, getBoard, getBoards, findBoardByUrl, deleteBoard, deleteAllBoards, } from "../db";
import { filesToStackups, urlToStackups, stackupToBoard, stackupToBoardRender, boardToStackups, stackupToZipBlob, updateBoard, updateBoardThumbnail, } from "./models";
import { CREATE_BOARD, CREATE_BOARD_FROM_URL, GET_BOARD, GET_BOARD_PACKAGE, UPDATE_BOARD, DELETE_BOARD, DELETE_ALL_BOARDS, boardRendered, boardUpdated, boardDeleted, boardPackaged, allBoardsDeleted, workerInitialized, workerErrored, } from "../state";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ctx = self;
let db;
createBoardDatabase()
    .then((database) => {
    db = database;
    return getBoards(db);
})
    .then((boards) => ctx.postMessage(workerInitialized(boards)));
const duration = (start) => Date.now() - start;
ctx.onmessage = function receive(event) {
    const request = event.data;
    const startTime = Date.now();
    let response;
    switch (request.type) {
        case CREATE_BOARD_FROM_URL: {
            const url = request.payload;
            response = Promise.all([
                findBoardByUrl(db, url),
                urlToStackups(url),
            ]).then((result) => __awaiter(this, void 0, void 0, function* () {
                const [existingBoard, [selfContained, shared]] = result;
                let board = stackupToBoard(selfContained);
                let saveQuery;
                board.sourceUrl = url;
                if (!existingBoard) {
                    const render = stackupToBoardRender(shared, board);
                    ctx.postMessage(boardRendered(render, duration(startTime)));
                    saveQuery = saveBoard(db, board);
                }
                else {
                    board = updateBoard(board, existingBoard);
                    saveQuery = boardToStackups(board).then((stackups) => {
                        const [selfContained, shared] = stackups;
                        const render = stackupToBoardRender(shared, board);
                        board = updateBoardThumbnail(board, selfContained);
                        ctx.postMessage(boardRendered(render, duration(startTime)));
                        return saveBoard(db, board);
                    });
                }
                return saveQuery.then(() => ctx.postMessage(boardUpdated(board)));
            }));
            break;
        }
        case CREATE_BOARD: {
            const files = request.payload;
            response = filesToStackups(files).then((stackups) => __awaiter(this, void 0, void 0, function* () {
                const [selfContained, shared] = stackups;
                const board = stackupToBoard(selfContained);
                const render = stackupToBoardRender(shared, board);
                ctx.postMessage(boardRendered(render, duration(startTime)));
                return saveBoard(db, board).then(() => ctx.postMessage(boardUpdated(board)));
            }));
            break;
        }
        case GET_BOARD: {
            const id = request.payload;
            response = getBoard(db, id).then((board) => __awaiter(this, void 0, void 0, function* () {
                return boardToStackups(board).then((stackups) => {
                    const [, shared] = stackups;
                    const render = stackupToBoardRender(shared, board);
                    ctx.postMessage(boardRendered(render, duration(startTime)));
                });
            }));
            break;
        }
        case GET_BOARD_PACKAGE: {
            const id = request.payload;
            response = getBoard(db, id).then((board) => __awaiter(this, void 0, void 0, function* () {
                return boardToStackups(board)
                    .then((stackups) => {
                    const [selfContained] = stackups;
                    return stackupToZipBlob(selfContained);
                })
                    .then((blob) => ctx.postMessage(boardPackaged(id, board.name, blob)));
            }));
            break;
        }
        case UPDATE_BOARD: {
            const { id, update } = request.payload;
            response = getBoard(db, id).then((prevBoard) => __awaiter(this, void 0, void 0, function* () {
                const board = updateBoard(prevBoard, update);
                return boardToStackups(board).then((stackups) => __awaiter(this, void 0, void 0, function* () {
                    const [selfContained, shared] = stackups;
                    const render = stackupToBoardRender(shared, board);
                    const nextBoard = updateBoardThumbnail(board, selfContained);
                    ctx.postMessage(boardRendered(render, duration(startTime)));
                    return saveBoard(db, nextBoard).then(() => ctx.postMessage(boardUpdated({
                        id: nextBoard.id,
                        name: nextBoard.name,
                        options: nextBoard.options,
                        thumbnail: nextBoard.thumbnail,
                    })));
                }));
            }));
            break;
        }
        case DELETE_BOARD: {
            const id = request.payload;
            response = deleteBoard(db, id).then(() => ctx.postMessage(boardDeleted(id)));
            break;
        }
        case DELETE_ALL_BOARDS: {
            response = deleteAllBoards(db).then(() => ctx.postMessage(allBoardsDeleted()));
            break;
        }
    }
    if (response) {
        response.catch((e) => ctx.postMessage(workerErrored(request, e)));
    }
};
// declare module "./worker" {
//   export default class RenderWorker extends Worker {
//     constructor();
//     onmessage: (event: WorkerMessageEvent) => void;
//     postMessage(message: Action): void;
//   }
// }
//# sourceMappingURL=worker.js.map