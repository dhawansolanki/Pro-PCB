import React from 'react';
import { VERSION } from '../pkg';
import { getAnalyticsUserId } from '../analytics';
import { select } from '../events';
import { useAppState, deleteAllBoards, updateAppPreferences } from '../state';
import { DeleteButton, Drawer, Checkbox, Label } from '../ui';
const TITLE = 'app settings';
const FOOTER = `tracespace v${VERSION}`;
const DELETE_SAVED_COPY = 'delete all saved boards';
const USAGE_TRACKING_COPY = 'send usage data to tracespace';
const USER_ID_COPY = 'analytics user id';
const SETTINGS_ITEM_STYLE = 'mv2';
const LABEL_COPY_STYLE = 'mr-auto';
const USER_ID_LABEL_STYLE = 'flex-none mr2';
const USER_ID_INPUT_STYLE = 'w-100 bn bg-transparent';
const DELETE_BUTTON_STYLE = 'nr2';
const FOOTER_STYLE = 'mt3 mb1 f7 lh-copy';
export default function SettingsDrawer(props) {
    const { appPreferences, dispatch } = useAppState();
    const { open, close } = props;
    const handleTrackingChange = (event) => {
        dispatch(updateAppPreferences({ analyticsOptIn: event.target.checked }));
    };
    const handleDeleteAllClick = () => {
        dispatch(deleteAllBoards());
        close();
    };
    return (React.createElement(Drawer, { title: TITLE, open: open, close: close },
        React.createElement(Checkbox, { checked: appPreferences.analyticsOptIn || false, className: SETTINGS_ITEM_STYLE, onChange: handleTrackingChange }, USAGE_TRACKING_COPY),
        React.createElement(Label, { className: SETTINGS_ITEM_STYLE },
            React.createElement("span", { className: LABEL_COPY_STYLE }, DELETE_SAVED_COPY),
            React.createElement(DeleteButton, { className: DELETE_BUTTON_STYLE, onClick: handleDeleteAllClick })),
        React.createElement("footer", { className: FOOTER_STYLE },
            React.createElement(Label, null,
                React.createElement("span", { className: USER_ID_LABEL_STYLE },
                    USER_ID_COPY,
                    ":"),
                React.createElement("input", { className: USER_ID_INPUT_STYLE, type: "text", value: getAnalyticsUserId() || 'N/A', onFocus: select, readOnly: true })),
            FOOTER)));
}
//# sourceMappingURL=SettingsDrawer.js.map