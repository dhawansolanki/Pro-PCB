import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import cx from 'classnames';
import { useAppState } from '../state';
import { usePrevious } from '../hooks';
import { Fade, Slide, SvgRender } from '../ui';
import { INITIAL_STATE, pan, zoom, getScale } from './display';
import PanZoom from './PanZoom';
import Controls from './Controls';
import LayersRender from './LayersRender';
const percent = (n) => `${n * 100}%`;
const getId = (b) => (b ? b.id : null);
export default function BoardDisplay() {
    const { mode, board, loading, layerVisibility } = useAppState();
    const [displayState, setDisplayState] = useState(INITIAL_STATE);
    const prevBoard = usePrevious(board);
    const containerRef = useRef(null);
    const show = !loading && board !== null;
    const controllerProps = {
        step: displayState.step,
        reset: () => setDisplayState(INITIAL_STATE),
        pan: (...args) => setDisplayState(pan(displayState, ...args)),
        zoom: (...args) => setDisplayState(zoom(displayState, ...args)),
        zoomIn: () => setDisplayState(zoom(displayState, 1)),
        zoomOut: () => setDisplayState(zoom(displayState, -1)),
    };
    useLayoutEffect(() => {
        if (containerRef.current) {
            const { x, y, step } = displayState;
            const { scale } = getScale(step);
            const transform = `translate(${percent(x)},${percent(y)}) scale(${scale})`;
            containerRef.current.style.transform = transform;
        }
    });
    useEffect(() => {
        if (getId(board) !== getId(prevBoard))
            controllerProps.reset();
    }, [board, prevBoard]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Fade, { in: show },
            React.createElement(PanZoom, Object.assign({}, controllerProps, { containerRef: containerRef }), board && (React.createElement(React.Fragment, null,
                React.createElement(SvgRender, { className: cx("w-100", { dn: mode !== "top" }), source: board.top }),
                React.createElement(SvgRender, { className: cx("w-100", { dn: mode !== "bottom" }), source: board.bottom }),
                React.createElement(LayersRender, { className: cx("w-100", { clip: mode !== "layers" }), viewBox: board.viewBox, layers: board.layers, layerVisibility: layerVisibility }))))),
        React.createElement(Slide, { in: show, from: "bottom" },
            React.createElement(Controls, Object.assign({}, controllerProps)))));
}
//# sourceMappingURL=index.js.map