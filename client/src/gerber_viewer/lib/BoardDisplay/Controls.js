// board display controls for zoom bar and board vs layer render
import React, { useState } from 'react';
import { Button, Icon } from '../ui';
import { stepToScale, scaleToStep } from './display';
const ZOOM_RESET_TOOLTIP = 'Reset pan and zoom';
const ZOOM_OUT_TOOLTIP = 'Zoom out';
const ZOOM_IN_TOOTIP = 'Zoom in';
const CONTROLS_STYLE = 'absolute absolute--center-w-third bottom-1 z-1 w-third flex items-center f5';
const ZOOM_ICON_STYLE = 'flex-none';
const ZOOM_RESET_STYLE = 'absolute bottom-2 left-50 tf-center-x';
const ZOOM_BAR_CONTAINER_STYLE = 'relative w-100 h2 flex items-center grab';
const ZOOM_BAR_STYLE = 'dib pt2 bg-white shadow w-100';
const ZOOM_SLIDER_STYLE = 'absolute w1 h1 top-50 tf-center bg-brand o-70 left-animate';
export default function Controls(props) {
    const [grabbing, setGrabbing] = useState(false);
    const { step, reset, zoom, zoomIn, zoomOut } = props;
    const sliderLeft = `${stepToScale(step) * 100}%`;
    const handleGrabMove = (event) => {
        const { left, width } = event.currentTarget.getBoundingClientRect();
        const nextStep = scaleToStep((event.clientX - left) / width);
        zoom(nextStep - step);
    };
    return (React.createElement("div", { className: CONTROLS_STYLE },
        React.createElement(Button, { className: ZOOM_RESET_STYLE, onClick: reset, title: ZOOM_RESET_TOOLTIP },
            React.createElement(Icon, { name: "expand" })),
        React.createElement(Button, { className: ZOOM_ICON_STYLE, onClick: zoomOut, title: ZOOM_OUT_TOOLTIP },
            React.createElement(Icon, { name: "search-minus" })),
        React.createElement("span", { className: ZOOM_BAR_CONTAINER_STYLE, onMouseDown: event => {
                setGrabbing(true);
                handleGrabMove(event);
            }, onMouseUp: () => setGrabbing(false), onMouseMove: grabbing ? handleGrabMove : undefined },
            React.createElement("span", { className: ZOOM_BAR_STYLE }),
            React.createElement("span", { className: ZOOM_SLIDER_STYLE, style: { left: sliderLeft } })),
        React.createElement(Button, { className: ZOOM_ICON_STYLE, onClick: zoomIn, title: ZOOM_IN_TOOTIP },
            React.createElement(Icon, { name: "search-plus" }))));
}
//# sourceMappingURL=Controls.js.map