import { RefObject } from 'react';
import { Template, Size, SchemaForUI, ChangeSchemas } from '@pdfme/common';
export declare const usePrevious: <T>(value: T) => T | null;
type UIPreProcessorProps = {
    template: Template;
    size: Size;
    zoomLevel: number;
};
export declare const useUIPreProcessor: ({ template, size, zoomLevel }: UIPreProcessorProps) => {
    backgrounds: string[];
    pageSizes: {
        width: number;
        height: number;
    }[];
    scale: number;
    error: Error | null;
    refresh: (template: Template) => Promise<void>;
};
type ScrollPageCursorProps = {
    ref: RefObject<HTMLDivElement>;
    pageSizes: Size[];
    scale: number;
    pageCursor: number;
    onChangePageCursor: (page: number) => void;
};
export declare const useScrollPageCursor: ({ ref, pageSizes, scale, pageCursor, onChangePageCursor, }: ScrollPageCursorProps) => void;
export declare const useMountStatus: () => boolean;
interface UseInitEventsParams {
    pageCursor: number;
    pageSizes: Size[];
    activeElements: HTMLElement[];
    template: Template;
    schemasList: SchemaForUI[][];
    changeSchemas: ChangeSchemas;
    commitSchemas: (newSchemas: SchemaForUI[]) => void;
    removeSchemas: (ids: string[]) => void;
    onSaveTemplate: (t: Template) => void;
    past: React.MutableRefObject<SchemaForUI[][]>;
    future: React.MutableRefObject<SchemaForUI[][]>;
    setSchemasList: React.Dispatch<React.SetStateAction<SchemaForUI[][]>>;
    onEdit: (targets: HTMLElement[]) => void;
    onEditEnd: () => void;
}
export declare const useInitEvents: ({ pageCursor, pageSizes, activeElements, template, schemasList, changeSchemas, commitSchemas, removeSchemas, onSaveTemplate, past, future, setSchemasList, onEdit, onEditEnd, }: UseInitEventsParams) => void;
export {};
