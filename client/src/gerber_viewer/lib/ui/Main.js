import React from 'react';
const STYLE = 'sans relative overflow-hidden h-100 pa3 white bg-gradient';
export function Main(props) {
    const { children, onDragOver, onDrop } = props;
    return (React.createElement("main", { className: STYLE, onDragOver: onDragOver, onDrop: onDrop }, children));
}
//# sourceMappingURL=Main.js.map