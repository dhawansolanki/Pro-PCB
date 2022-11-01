// tracespace components library
import React from 'react';
export const SvgRender = React.memo(_SvgRender);
function _SvgRender(props) {
    const { source, className } = props;
    return source ? (React.createElement("div", { className: className, dangerouslySetInnerHTML: { __html: source } })) : null;
}
//# sourceMappingURL=SvgRender.js.map