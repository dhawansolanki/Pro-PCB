import React from 'react';
import cx from 'classnames';
import { SIDE_TOP, SIDE_BOTTOM, SIDE_INNER, SIDE_ALL } from 'whats-that-gerber';
import { stopPropagation } from '../events';
import { orderLayers } from '../layers';
import SideItem from './SideItem';
const SIDES = [
    { label: 'top', side: SIDE_TOP },
    { label: 'bottom', side: SIDE_BOTTOM },
    { label: 'inner', side: SIDE_INNER },
    { label: 'mechanical', side: SIDE_ALL },
    { label: 'other', side: null },
];
const STYLE = 'absolute left-0 top-5 bottom-5 overflow-y-hidden w-animate';
const STYLE_DEFAULT = 'w-sixth';
const STYLE_EXPANDED = 'w-third';
const LIST_WRAPPER_STYLE = 'w-100 mxh-100 overflow-y-auto ph3 tf-flip-x scrollbar-white';
const LIST_STYLE = 'list mt0 mb3 pl0 tf-flip-x';
export default function SideList(props) {
    const { layers, showFilenames } = props;
    return (React.createElement("div", { className: cx(STYLE, showFilenames ? STYLE_EXPANDED : STYLE_DEFAULT) },
        React.createElement("div", { onWheel: stopPropagation, className: LIST_WRAPPER_STYLE },
            React.createElement("ul", { className: LIST_STYLE }, SIDES.map(sideProps => (React.createElement(SideItem, { key: sideProps.label, label: sideProps.label, layers: layers
                    .filter(ly => ly.side === sideProps.side)
                    .sort(orderLayers), showFilenames: showFilenames })))))));
}
//# sourceMappingURL=SideList.js.map