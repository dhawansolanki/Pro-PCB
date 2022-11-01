// utility functions
import { basename, extname } from 'path';
export function promiseFlatMap(collection, iterator) {
    return collection.reduce((result, element) => result.then(resolvedResult => Promise.resolve(iterator(element)).then(newItems => resolvedResult.concat(newItems))), Promise.resolve([]));
}
export function baseName(filename, stripExtension) {
    return basename(filename, stripExtension ? extname(filename) : '');
}
//# sourceMappingURL=util.js.map