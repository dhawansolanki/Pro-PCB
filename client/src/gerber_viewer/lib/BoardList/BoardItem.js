import React from 'react';
import cx from 'classnames';
import { LazyThumbnail } from '../ui';
// TODO(mc, 2018-12-26): dedupe this logic
const DEFAULT_COLOR = 'rgba(00, 66, 00, 0.75)';
export default function BoardItem(props) {
    const { id, name, selected, options, thumbnail } = props;
    const color = options.color.sm || DEFAULT_COLOR;
    const handleClick = () => !selected && props.onClick(id);
    return (React.createElement("li", { className: cx('dib w-50 pl3 pb3 fr', { pointer: !selected }), onClick: handleClick },
        React.createElement("div", { className: cx('relative overflow-hidden w-100 h4 br3 shadow') },
            React.createElement("div", { className: "w-100 h-100 bg-white" },
                React.createElement("p", { className: cx('f6 lh-title mv0 mh4 pt2 tc truncate', {
                        b: selected,
                    }) }, name),
                React.createElement(LazyThumbnail, { url: thumbnail, spinnerColor: color, className: "absolute top-2 bottom-1 left-1 right-1" })))));
}
//# sourceMappingURL=BoardItem.js.map