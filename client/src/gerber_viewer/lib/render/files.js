import { __awaiter } from "tslib";
import { Transform } from 'readable-stream';
import fileReaderStream from 'filereader-stream';
import MD5 from 'md5.js';
import pump from 'pump';
import { isZip } from '../util';
import { baseName, promiseFlatMap } from './util';
const READER_OPTIONS = { chunkSize: 2048 };
export function readFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        return promiseFlatMap(files, (file) => isZip(file) ? zipReader(file) : [fileReader(file)]);
    });
}
export function fetchZipFile(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return fetch(url)
            .then(response => {
            if (response.ok)
                return response.blob();
            throw new Error(`Could not fetch ${url}: ${response.status}`);
        })
            .then(blob => {
            if (isZip(blob))
                return zipReader(blob);
            throw new Error(`${url} is not a zip file`);
        });
    });
}
export function writeFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        return import('jszip').then(ZipModule => {
            const zip = ZipModule.default();
            files.forEach(f => zip.file(f.name, f.contents));
            return zip.generateAsync({ type: 'blob' });
        });
    });
}
export class FileStream extends Transform {
    constructor(filename) {
        super();
        this._hasher = new MD5();
        this._chunks = [];
        this.name = baseName(filename);
        this.digest = null;
        this.contents = null;
    }
    _transform(chunk, _, next) {
        this._hasher.update(chunk);
        this._chunks.push(chunk);
        next(undefined, chunk);
    }
    _flush(next) {
        this.digest = this._hasher.digest('hex');
        this.contents = Buffer.concat(this._chunks);
        next();
    }
}
function fileReader(file) {
    const reader = fileReaderStream(file, READER_OPTIONS);
    const collector = new FileStream(file.name);
    return pump(reader, collector);
}
function zipReader(file) {
    return __awaiter(this, void 0, void 0, function* () {
        return import('jszip')
            .then(ZipModule => ZipModule.loadAsync(file))
            .then(zip => Object.keys(zip.files)
            .filter(name => !zip.files[name].dir)
            .map(name => pump(zip.files[name].nodeStream(), new FileStream(name))));
    });
}
//# sourceMappingURL=files.js.map