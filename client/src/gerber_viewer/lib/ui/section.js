import React from 'react';
export function TitledSection(props) {
    const { title, children } = props;
    return (React.createElement("section", { className: "tl mb4" },
        React.createElement("h3", { className: "mt0 mb2 f5 lh-title b" }, title),
        children));
}
export function SectionColumnLeft(props) {
    return React.createElement("div", { className: "dib w-50 pr3 v-top br" }, props.children);
}
export function SectionColumnRight(props) {
    return React.createElement("div", { className: "dib w-50 pl3 v-top" }, props.children);
}
//# sourceMappingURL=section.js.map