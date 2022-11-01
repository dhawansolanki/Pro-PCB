import { __awaiter, __rest } from "tslib";
import { NotFoundError } from './errors';
export * from './types';
export function createBoardDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return import('dexie').then(({ default: Dexie }) => {
            const db = new Dexie('BoardDatabase');
            db.version(1).stores({
                boards: 'id, &sourceUrl',
                layers: 'id, sourceId',
                sources: 'id',
            });
            return db;
        });
    });
}
export function createAppDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        return import('dexie').then(({ default: Dexie }) => {
            const db = new Dexie('AppDatabase');
            db.version(1).stores({ preferences: '++' });
            return db;
        });
    });
}
export function ensureAppPreferences(db) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.transaction('rw', db.preferences, () => __awaiter(this, void 0, void 0, function* () {
            return db.preferences.toArray().then(results => {
                if (results.length === 0) {
                    const prefs = {};
                    return db.preferences.add(prefs).then(() => prefs);
                }
                return results[0];
            });
        }));
    });
}
export function updateAppPreferences(db, update) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.preferences.toCollection().modify(update);
    });
}
export function saveBoard(db, board) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.transaction('rw', db.boards, db.layers, db.sources, () => __awaiter(this, void 0, void 0, function* () {
            const { layers } = board, dbBoard = __rest(board, ["layers"]);
            const dbLayers = dbBoard.layerIds.map(lyId => {
                const _a = layers[lyId], { source: _source } = _a, dbLayer = __rest(_a, ["source"]);
                return dbLayer;
            });
            const dbSources = dbBoard.layerIds.map(lyId => {
                const { sourceId: id, source: contents } = layers[lyId];
                return { id, contents };
            });
            db.sources.bulkPut(dbSources);
            db.layers.bulkPut(dbLayers);
            return db.boards.put(dbBoard);
        }));
    });
}
export function getBoard(db, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.transaction('r', db.boards, db.layers, db.sources, () => __awaiter(this, void 0, void 0, function* () {
            return db.boards.get(id).then(board => {
                if (!board)
                    throw new NotFoundError(`board ${id} not found`);
                return getFullBoard(db, board);
            });
        }));
    });
}
export function getBoards(db) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.boards.toArray().then(boards => boards.map(b => {
            const { id, name, options, thumbnail } = b;
            return { id, name, options, thumbnail };
        }));
    });
}
export function findBoardByUrl(db, url) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.transaction('r', db.boards, db.layers, db.sources, () => __awaiter(this, void 0, void 0, function* () {
            return db.boards
                .get({ sourceUrl: url })
                .then(board => (board ? getFullBoard(db, board) : Promise.resolve(null)));
        }));
    });
}
export function deleteBoard(db, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.transaction('rw', db.boards, db.layers, db.sources, () => getBoard(db, id).then(board => {
            const sourceIds = Object.values(board.layers).map(ly => ly.sourceId);
            db.boards.delete(id);
            db.layers
                .bulkDelete(board.layerIds)
                .then(() => db.layers.orderBy('sourceId').uniqueKeys())
                .then(sourceIdsToKeep => {
                const sourceIdsToDelete = sourceIds.filter(id => !sourceIdsToKeep.includes(id));
                db.sources.bulkDelete(sourceIdsToDelete);
            });
        }));
    });
}
export function deleteAllBoards(db) {
    return __awaiter(this, void 0, void 0, function* () {
        return db.transaction('rw', db.boards, db.layers, db.sources, () => {
            db.sources.clear();
            db.layers.clear();
            db.boards.clear();
        });
    });
}
function getFullBoard(db, board) {
    return __awaiter(this, void 0, void 0, function* () {
        const layersQuery = db.layers
            .where('id')
            .anyOf(board.layerIds)
            .toArray();
        const sourcesQuery = layersQuery.then(layers => db.sources
            .where('id')
            .anyOf(layers.map(ly => ly.sourceId))
            .toArray());
        return Promise.all([layersQuery, sourcesQuery]).then(([layers, sources]) => {
            const layersMap = layers.reduce((result, layer) => {
                const source = sources.find(s => s.id === layer.sourceId);
                return source
                    ? Object.assign(Object.assign({}, result), { [layer.id]: Object.assign(Object.assign({}, layer), { source: source.contents }) }) : result;
            }, {});
            return Object.assign(Object.assign({}, board), { layers: layersMap });
        });
    });
}
//# sourceMappingURL=index.js.map