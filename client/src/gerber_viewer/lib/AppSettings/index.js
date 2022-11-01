import React, { useState } from "react";
import { VERSION } from "../pkg";
import { Button, Icon, getButtonStyle } from "../ui";
import SettingsDrawer from "./SettingsDrawer";
const HELP_TOOLTIP = "Troubleshooting";
const HELP_HREF = `https://github.com/tracespace/tracespace/blob/v${VERSION}/apps/view/HELP.md`;
const SETTINGS_TOOLTIP = "App settings";
export default function AppSettings(props) {
    const [open, setOpen] = useState(false);
    const { buttonClassName } = props;
    const toggleOpen = () => setOpen(!open);
    return (React.createElement(React.Fragment, null,
        React.createElement("a", { href: HELP_HREF, title: HELP_TOOLTIP, target: "_blank", rel: "noreferrer noopener", className: getButtonStyle({ className: buttonClassName }) },
            React.createElement(Icon, { name: "question-circle" })),
        React.createElement(Button, { onClick: toggleOpen, title: SETTINGS_TOOLTIP, className: buttonClassName },
            React.createElement(Icon, { name: "sliders-h" })),
        React.createElement(SettingsDrawer, { open: open, close: toggleOpen })));
}
//# sourceMappingURL=index.js.map