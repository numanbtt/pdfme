import { Schema, Plugins, GeneratorOptions, Template, PDFRenderProps } from '@pdfme/common';
import { PDFPage, PDFDocument, PDFEmbeddedPage } from '@pdfme/pdf-lib';
import type { EmbedPdfBox } from './types';
export declare const getEmbedPdfPages: (arg: {
    template: Template;
    pdfDoc: PDFDocument;
}) => Promise<{
    basePages: (PDFEmbeddedPage | PDFPage)[];
    embedPdfBoxes: EmbedPdfBox[];
}>;
export declare const preprocessing: (arg: {
    template: Template;
    userPlugins: Plugins;
}) => Promise<{
    pdfDoc: PDFDocument;
    renderObj: Record<string, (arg: PDFRenderProps<Schema>) => Promise<void> | void>;
}>;
export declare const postProcessing: (props: {
    pdfDoc: PDFDocument;
    options: GeneratorOptions;
}) => void;
export declare const insertPage: (arg: {
    basePage: PDFEmbeddedPage | PDFPage;
    embedPdfBox: EmbedPdfBox;
    pdfDoc: PDFDocument;
}) => PDFPage;
