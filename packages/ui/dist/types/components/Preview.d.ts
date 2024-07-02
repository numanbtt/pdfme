import React from 'react';
import { PreviewProps, Size } from '@pdfme/common';
declare const Preview: ({ template, inputs, size, onChangeInput, }: Omit<PreviewProps, "domContainer"> & {
    onChangeInput?: ((args: {
        index: number;
        value: string;
        key: string;
    }) => void) | undefined;
    size: Size;
}) => React.JSX.Element;
export default Preview;
