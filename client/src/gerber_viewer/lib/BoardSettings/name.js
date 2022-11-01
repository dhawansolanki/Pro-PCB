// @ts-nocheck
import React from "react";
const BASE_STYLE = "f3 lh-title normal tc";
const STYLE = `${BASE_STYLE} mv0 mh2`;
const INPUT_STYLE = `${BASE_STYLE} mb3 bb bt-0 br-0 bl-0 b--near-black`;
export function BoardName(props) {
    return React.createElement("h2", { className: STYLE }, props.children);
}
export function BoardNameInput(props) {
    return (React.createElement("input", Object.assign({ type: "text", className: INPUT_STYLE, autoComplete: "off", "data-lpignore": "true" }, props.field)));
}
//# sourceMappingURL=name.js.map