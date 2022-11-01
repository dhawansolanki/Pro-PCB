import { Optional } from '../types';
export declare type FileUploadType = 'zip' | 'files' | 'mixed';
export declare type CreateBoardAnalyticsPayload = {
    source: 'url' | 'filePicker' | 'dragAndDrop';
    uploadType?: FileUploadType;
};
export declare type BoardRenderAnalyticsPayload = Optional<{
    useOutline: boolean;
    outlineGapFill: number;
    colorSoldermask: string;
    colorSilkscreen: string;
    colorCopperFinish: string;
    gerberCoordinateFormat: string;
    gerberZeroSuppression: string;
    gerberUnits: string;
    drillCoordinateFormat: string;
    drillZeroSuppression: string;
    drillUnits: string;
    sourceUrlHash: string;
    sourceFilesHash: string;
    renderTime: number;
}>;
export declare type ErrorAnalyticsPayload = {
    trigger: string;
    message: string;
};
export declare type AppOpenedAnalyticsPayload = {
    savedBoards: number;
};
export declare type AnalyticsEvent = ['appOpened', AppOpenedAnalyticsPayload] | ['createBoardRequest', CreateBoardAnalyticsPayload] | ['getBoardRequest', Record<string, never>] | ['boardRendered', BoardRenderAnalyticsPayload] | ['boardUpdated', BoardRenderAnalyticsPayload] | ['boardDeleted', BoardRenderAnalyticsPayload] | ['boardDownloaded', BoardRenderAnalyticsPayload] | ['error', ErrorAnalyticsPayload];
