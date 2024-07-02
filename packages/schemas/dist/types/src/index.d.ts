import text, { readOnlyText } from './text/index.js';
import image, { readOnlyImage } from './graphics/image.js';
import svg, { readOnlySvg } from './graphics/svg.js';
import barcodes from './barcodes/index.js';
import line from './shapes/line.js';
import { modifyTemplateForTable, getDynamicHeightForTable } from './tables/dynamicTemplate.js';
import { rectangle, ellipse } from './shapes/rectAndEllipse.js';
import { convertForPdfLayoutProps, rotatePoint } from './utils.js';
declare const tableBeta: import("@pdfme/common").Plugin<import("./tables/types.js").TableSchema>;
declare const builtInPlugins: {
    Text: import("@pdfme/common").Plugin<import("./text/types.js").TextSchema>;
};
export { text, readOnlyText, image, readOnlyImage, svg, readOnlySvg, barcodes, line, tableBeta, modifyTemplateForTable, getDynamicHeightForTable, rectangle, ellipse, builtInPlugins, convertForPdfLayoutProps, rotatePoint, };
