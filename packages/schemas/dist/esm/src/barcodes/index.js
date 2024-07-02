import { pdfRender } from './pdfRender.js';
import { getPropPanelByBarcodeType } from './propPanel.js';
import { uiRender } from './uiRender.js';
import { BARCODE_TYPES } from './constants.js';
const barcodes = BARCODE_TYPES.reduce((acc, type) => Object.assign(acc, {
    [type]: { pdf: pdfRender, ui: uiRender, propPanel: getPropPanelByBarcodeType(type) },
}), {});
export default barcodes;
//# sourceMappingURL=index.js.map