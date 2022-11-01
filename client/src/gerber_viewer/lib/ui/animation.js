// @ts-nocheck
import React from "react";
import { CSSTransition } from "react-transition-group";
const FADE_STYLE = "fade";
export function Fade(props) {
    return (React.createElement(CSSTransition, { in: Boolean(props.in), classNames: FADE_STYLE, timeout: 500, mountOnEnter: true, unmountOnExit: true }, props.children));
}
const SLIDE_STYLE = "slide";
export function Slide(props) {
    return (React.createElement(CSSTransition, { in: Boolean(props.in), classNames: `${SLIDE_STYLE}-${props.from}`, timeout: 500, mountOnEnter: true, unmountOnExit: true }, props.children));
}
//# sourceMappingURL=animation.js.map