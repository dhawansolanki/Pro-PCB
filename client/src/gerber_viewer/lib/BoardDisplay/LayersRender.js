import React from 'react';
import cx from 'classnames';
import vb from 'viewbox';
export function LayersRender(props) {
    const { layerVisibility, viewBox, className } = props;
    const layers = props.layers.filter(ly => ly.converter.layer.length > 0);
    return (React.createElement("svg", { className: cx(className, 'overflow-visible'), strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "0", fillRule: "evenodd", viewBox: vb.asString(viewBox) },
        layers.map(ly => (React.createElement("defs", { key: ly.id, dangerouslySetInnerHTML: { __html: ly.converter.defs.join('') } }))),
        React.createElement("g", { transform: `translate(0,${viewBox[3] + 2 * viewBox[1]}) scale(1, -1)` }, layers.map(ly => {
            const { converter, scale } = ly;
            const groupProps = {
                id: ly.id,
                dangerouslySetInnerHTML: { __html: converter.layer.join('') },
            };
            if (scale !== 1)
                groupProps.transform = `scale(${scale})`;
            return (React.createElement("g", { key: ly.id, fill: ly.color, stroke: ly.color, className: layerVisibility[ly.id] ? 'o-40' : 'o-0' },
                React.createElement("g", Object.assign({}, groupProps))));
        }))));
}
export default React.memo(LayersRender);
//# sourceMappingURL=LayersRender.js.map