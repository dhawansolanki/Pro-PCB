import React from 'react';
import FileItem from './FileItem';
const HEADING_STYLE = 'mv2 pl3 lh-title f5 b';
const SUBLIST_STYLE = 'list pl0 mv0 near-black';
export default function SideList(props) {
    const { label, layers, showFilenames } = props;
    if (layers.length === 0)
        return null;
    return (React.createElement("li", null,
        React.createElement("h3", { className: HEADING_STYLE }, label),
        React.createElement("ul", { className: SUBLIST_STYLE }, layers.map(layer => (React.createElement(FileItem, Object.assign({ key: layer.id }, layer, { showFilenames: showFilenames })))))));
}
//# sourceMappingURL=SideItem.js.map