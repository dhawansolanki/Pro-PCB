const MIMETYPE_ZIP = [
    'application/zip',
    'application/x-zip',
    'application/x-zip-compressed',
];
export function isZip(file) {
    return (('name' in file && file.name.endsWith('.zip')) ||
        MIMETYPE_ZIP.includes(file.type));
}
//# sourceMappingURL=util.js.map