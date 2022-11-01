import React, { useState } from 'react';
import cx from 'classnames';
import { useTimeout } from '../hooks';
import { preventDefault, select } from '../events';
import { Label, Icon } from '../ui';
const SUCCESS_TIMEOUT = 1200;
const PARAM = '?boardUrl=';
const STYLE = 'justify-center f6 lh-solid mb3';
const TEXT_STYLE = 'flex items-center mv0 lh-copy near-black bg-animate near-black';
const ICON_STYLE = 'flex-none ml1 nr4 br2 c-animate bg-animate';
export default function BoardUrl(props) {
    const [selected, setSelected] = useState(false);
    const [success, setSuccess] = useState(false);
    useTimeout(() => setSuccess(false), success ? SUCCESS_TIMEOUT : null);
    const { url } = props;
    const { origin, pathname } = window.location;
    const href = `${origin}${pathname}`;
    const copyValue = url ? `${href}${PARAM}${encodeURIComponent(url)}` : '';
    const textStyle = cx(TEXT_STYLE, selected ? 'bg-light-blue' : 'bg-white');
    const iconStyle = cx(ICON_STYLE, success ? 'white bg-brand' : 'near-black bg-white');
    return (React.createElement(Label, { className: STYLE, onCopy: event => {
            setSuccess(true);
            event.currentTarget.focus();
            event.clipboardData.setData('text/plain', copyValue);
            preventDefault(event);
        } },
        React.createElement("p", { className: textStyle },
            React.createElement("span", { className: "fw3" },
                href,
                PARAM),
            React.createElement("span", null, url)),
        React.createElement(Icon, { name: "copy", className: iconStyle }),
        React.createElement("input", { type: "text", value: copyValue, className: "clip", onClick: event => {
                select(event);
                document.execCommand('copy');
            }, onFocus: event => {
                select(event);
                setSelected(true);
            }, onBlur: () => {
                setSelected(false);
                setSuccess(false);
            }, readOnly: true })));
}
//# sourceMappingURL=BoardUrl.js.map