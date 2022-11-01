import React, { useState, useRef, useEffect } from 'react';
import cx from 'classnames';
import { Icon } from './Icon';
const STYLE = 'flex items-center justify-center';
export function LazyThumbnail(props) {
    const imageRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const handleLoad = () => setLoaded(true);
        if (imageRef.current) {
            if (!imageRef.current.complete) {
                setLoaded(false);
                imageRef.current.addEventListener('load', handleLoad);
            }
            else {
                handleLoad();
            }
        }
        return () => {
            if (imageRef.current) {
                imageRef.current.removeEventListener('load', handleLoad);
            }
        };
    });
    const { url, spinnerColor } = props;
    const className = cx(STYLE, props.className);
    const background = loaded
        ? `url("${url}") no-repeat center/contain`
        : 'transparent';
    return (React.createElement("div", { className: className, style: { background } },
        React.createElement("img", { className: "clip", ref: imageRef, src: url }),
        !loaded && (React.createElement(Icon, { name: "spinner", className: "f2", style: { color: spinnerColor }, faProps: { pulse: true } }))));
}
//# sourceMappingURL=LazyThumbnail.js.map