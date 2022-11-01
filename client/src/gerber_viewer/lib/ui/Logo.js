// tracespace logo component
import React from 'react';
import cx from 'classnames';
export function Logo(props) {
    const width = props.width || props.height || '32px';
    const height = props.height || width || '32px';
    const fill = props.color || 'currentColor';
    return (
        React.createElement("svg", { width: `${width}`, height: `${height}`, fill: fill, viewBox: "0 0 36 36", xmlns: "http://www.w3.org/2000/svg", className: cx('dib', props.className) },
        React.createElement("path", { d: "M22 14H36V0H16L0 16V36H14V22L22 14Z M36 28C36 32.4183 32.4183 36 28 36C23.5817 36 20 32.4183 20 28C20 23.5817 23.5817 20 28 20C32.4183 20 36 23.5817 36 28Z" }))
        );
}
//# sourceMappingURL=Logo.js.map