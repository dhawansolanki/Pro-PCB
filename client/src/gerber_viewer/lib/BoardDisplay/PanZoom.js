import React, { useRef } from 'react';
import { useWindowListener } from '../hooks';
const WHEEL_THRESHOLD = 20;
const WHEEL_THRESHOLD_LINE = 0;
const getEventCenter = (event) => ({
    x: event.pageX / window.innerWidth,
    y: event.pageY / window.innerHeight,
});
export default function PanZoom(props) {
    const { pan, zoom, containerRef, children } = props;
    const panStart = useRef(null);
    const count = useRef(0);
    useWindowListener('wheel', function handleWheel(event) {
        const { deltaMode, deltaY } = event;
        const threshhold = deltaMode === event.DOM_DELTA_LINE
            ? WHEEL_THRESHOLD_LINE
            : WHEEL_THRESHOLD;
        // increment or decrement count based on scroll direction
        // remember that Math.sign(0) === 0
        count.current += Math.sign(deltaY);
        if (Math.abs(count.current) > threshhold) {
            const direction = Math.sign(-count.current) || 0;
            const { x, y } = getEventCenter(event);
            count.current = 0;
            zoom(direction, x, y);
        }
    });
    return (React.createElement("div", { ref: containerRef, className: "absolute absolute--fill", onMouseDown: event => (panStart.current = getEventCenter(event)), onMouseUp: () => (panStart.current = null), onMouseMove: event => {
            if (panStart.current) {
                const { x: prevX, y: prevY } = panStart.current;
                const { x, y } = getEventCenter(event);
                pan(x - prevX, y - prevY);
                panStart.current = { x, y };
            }
        } },
        React.createElement("div", { className: "absolute top-50 left-50 tf-center w-100" }, children)));
}
//# sourceMappingURL=PanZoom.js.map