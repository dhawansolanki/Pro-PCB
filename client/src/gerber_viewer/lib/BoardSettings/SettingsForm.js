import React from 'react';
import { Formik, Form, Field } from 'formik';
import log from '../logger';
import { getDefaultLayerOptions, orderLayers } from '../layers';
import { useAppState, updateBoard, deleteBoard } from '../state';
import { TitledSection, SectionColumnLeft, SectionColumnRight } from '../ui';
import { boardRenderToValues, valuesToBoardUpdate } from './values';
import BoardUrl from './BoardUrl';
import SettingsButtons from './SettingsButtons';
import { BoardNameInput } from './name';
import { ColorPresetsField, ColorFields } from './color';
import { UseOutlineInput, GapFillInput, CoordFormatFields, ZeroSuppressionFields, UnitsFields, } from './render';
import { LayerList, LayerItem, LayerTypeSelect, LayerSideSelect, LayerColorInput, } from './layers';
export default function SettingsForm(props) {
    const { dispatch } = useAppState();
    const { board, close, className } = props;
    const { id, sourceUrl, layers } = board;
    const defaultGerberOptions = getDefaultLayerOptions(layers, 'gerber');
    const defaultDrillOptions = getDefaultLayerOptions(layers, 'drill');
    const handleSubmit = (values) => {
        dispatch(updateBoard(id, valuesToBoardUpdate(values, log)));
        close();
    };
    const handleDelete = () => {
        dispatch(deleteBoard(id));
        close();
    };
    return (React.createElement(Formik, { initialValues: boardRenderToValues(board), onSubmit: handleSubmit, onReset: close }, formProps => (React.createElement(Form, { className: className },
        React.createElement(SettingsButtons, { delete: handleDelete }),
        React.createElement(Field, { name: "name", component: BoardNameInput }),
        sourceUrl && React.createElement(BoardUrl, { url: sourceUrl }),
        React.createElement(TitledSection, { title: "colors" },
            React.createElement(SectionColumnLeft, null,
                React.createElement(ColorPresetsField, { fieldName: "options.color" })),
            React.createElement(SectionColumnRight, null,
                React.createElement(ColorFields, { fieldName: "options.color" }))),
        React.createElement(TitledSection, { title: "render options" },
            React.createElement("div", null,
                React.createElement(Field, { name: "options.useOutline", component: UseOutlineInput }),
                React.createElement(Field, { name: "options.outlineGapFill", component: GapFillInput })),
            React.createElement(CoordFormatFields, { fieldName: "gerberOptions.coordinateFormat", renderName: "gerber", defaultValue: defaultGerberOptions.coordinateFormat, overridden: !!formProps.values.gerberOptions.coordinateFormat }),
            React.createElement(ZeroSuppressionFields, { fieldName: "gerberOptions.zeroSuppression", renderName: "gerber", defaultValue: defaultGerberOptions.zeroSuppression, overridden: !!formProps.values.gerberOptions.zeroSuppression }),
            React.createElement(UnitsFields, { fieldName: "gerberOptions.units", renderName: "gerber", defaultValue: defaultGerberOptions.units, overridden: !!formProps.values.gerberOptions.units }),
            React.createElement(CoordFormatFields, { fieldName: "drillOptions.coordinateFormat", renderName: "drill", defaultValue: defaultDrillOptions.coordinateFormat, overridden: !!formProps.values.drillOptions.coordinateFormat }),
            React.createElement(ZeroSuppressionFields, { fieldName: "drillOptions.zeroSuppression", renderName: "drill", defaultValue: defaultDrillOptions.zeroSuppression, overridden: !!formProps.values.drillOptions.zeroSuppression }),
            React.createElement(UnitsFields, { fieldName: "drillOptions.units", renderName: "drill", defaultValue: defaultDrillOptions.units, overridden: !!formProps.values.drillOptions.units })),
        React.createElement(TitledSection, { title: "layers" },
            React.createElement(LayerList, null, layers
                .slice(0)
                .sort(orderLayers)
                .map(ly => (React.createElement(LayerItem, { key: ly.id, filename: ly.filename },
                React.createElement(Field, { name: `layers.${ly.id}.type`, component: LayerTypeSelect, layerId: ly.id }),
                React.createElement(Field, { name: `layers.${ly.id}.side`, component: LayerSideSelect, layerId: ly.id }),
                React.createElement(Field, { name: `layers.${ly.id}.color`, component: LayerColorInput, layerId: ly.id }))))))))));
}
//# sourceMappingURL=SettingsForm.js.map