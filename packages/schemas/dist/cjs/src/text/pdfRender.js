"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfRender = void 0;
const common_1 = require("@pdfme/common");
const constants_js_1 = require("./constants.js");
const helper_js_1 = require("./helper.js");
const utils_js_1 = require("../utils.js");
const embedAndGetFontObj = async (arg) => {
    const { pdfDoc, font, _cache } = arg;
    if (_cache.has(pdfDoc)) {
        return _cache.get(pdfDoc);
    }
    const fontValues = await Promise.all(Object.values(font).map(async (v) => {
        let fontData = v.data;
        if (typeof fontData === 'string' && fontData.startsWith('http')) {
            fontData = await fetch(fontData).then((res) => res.arrayBuffer());
        }
        return pdfDoc.embedFont(fontData, {
            subset: typeof v.subset === 'undefined' ? true : v.subset,
        });
    }));
    const fontObj = Object.keys(font).reduce((acc, cur, i) => Object.assign(acc, { [cur]: fontValues[i] }), {});
    _cache.set(pdfDoc, fontObj);
    return fontObj;
};
const getFontProp = async ({ value, font, schema, colorType, _cache, }) => {
    const fontSize = schema.dynamicFontSize
        ? await (0, helper_js_1.calculateDynamicFontSize)({ textSchema: schema, font, value, _cache })
        : schema.fontSize ?? constants_js_1.DEFAULT_FONT_SIZE;
    const color = (0, utils_js_1.hex2PrintingColor)(schema.fontColor || constants_js_1.DEFAULT_FONT_COLOR, colorType);
    return {
        alignment: schema.alignment ?? constants_js_1.DEFAULT_ALIGNMENT,
        verticalAlignment: schema.verticalAlignment ?? constants_js_1.DEFAULT_VERTICAL_ALIGNMENT,
        lineHeight: schema.lineHeight ?? constants_js_1.DEFAULT_LINE_HEIGHT,
        characterSpacing: schema.characterSpacing ?? constants_js_1.DEFAULT_CHARACTER_SPACING,
        fontSize,
        color,
    };
};
const pdfRender = async (arg) => {
    const { value, pdfDoc, pdfLib, page, options, schema, _cache } = arg;
    if (!value)
        return;
    const { font = (0, common_1.getDefaultFont)(), colorType } = options;
    const [pdfFontObj, fontKitFont, fontProp] = await Promise.all([
        embedAndGetFontObj({ pdfDoc, font, _cache }),
        (0, helper_js_1.getFontKitFont)(schema.fontName, font, _cache),
        getFontProp({ value, font, schema, _cache }),
    ]);
    const { fontSize, color, alignment, verticalAlignment, lineHeight, characterSpacing } = fontProp;
    const fontName = (schema.fontName ? schema.fontName : (0, common_1.getFallbackFontName)(font));
    const pdfFontValue = pdfFontObj && pdfFontObj[fontName];
    const pageHeight = page.getHeight();
    const { width, height, rotate, position: { x, y }, opacity, } = (0, utils_js_1.convertForPdfLayoutProps)({ schema, pageHeight, applyRotateTranslate: false });
    if (schema.backgroundColor) {
        const color = (0, utils_js_1.hex2PrintingColor)(schema.backgroundColor, colorType);
        page.drawRectangle({ x, y, width, height, rotate, color });
    }
    page.pushOperators(pdfLib.setCharacterSpacing(characterSpacing ?? constants_js_1.DEFAULT_CHARACTER_SPACING));
    const firstLineTextHeight = (0, helper_js_1.heightOfFontAtSize)(fontKitFont, fontSize);
    const descent = (0, helper_js_1.getFontDescentInPt)(fontKitFont, fontSize);
    const halfLineHeightAdjustment = lineHeight === 0 ? 0 : ((lineHeight - 1) * fontSize) / 2;
    const lines = (0, helper_js_1.splitTextToSize)({
        value,
        characterSpacing,
        fontSize,
        fontKitFont,
        boxWidthInPt: width,
    });
    // Text lines are rendered from the bottom upwards, we need to adjust the position down
    let yOffset = 0;
    if (verticalAlignment === constants_js_1.VERTICAL_ALIGN_TOP) {
        yOffset = firstLineTextHeight + halfLineHeightAdjustment;
    }
    else {
        const otherLinesHeight = lineHeight * fontSize * (lines.length - 1);
        if (verticalAlignment === constants_js_1.VERTICAL_ALIGN_BOTTOM) {
            yOffset = height - otherLinesHeight + descent - halfLineHeightAdjustment;
        }
        else if (verticalAlignment === constants_js_1.VERTICAL_ALIGN_MIDDLE) {
            yOffset =
                (height - otherLinesHeight - firstLineTextHeight + descent) / 2 + firstLineTextHeight;
        }
    }
    const pivotPoint = { x: x + width / 2, y: pageHeight - (0, common_1.mm2pt)(schema.position.y) - height / 2 };
    lines.forEach((line, rowIndex) => {
        const textWidth = (0, helper_js_1.widthOfTextAtSize)(line, fontKitFont, fontSize, characterSpacing);
        const rowYOffset = lineHeight * fontSize * rowIndex;
        let xLine = x;
        if (alignment === 'center') {
            xLine += (width - textWidth) / 2;
        }
        else if (alignment === 'right') {
            xLine += width - textWidth;
        }
        let yLine = pageHeight - (0, common_1.mm2pt)(schema.position.y) - yOffset - rowYOffset;
        if (rotate.angle !== 0) {
            // As we draw each line individually from different points, we must translate each lines position
            // relative to the UI rotation pivot point. see comments in convertForPdfLayoutProps() for more info.
            const rotatedPoint = (0, utils_js_1.rotatePoint)({ x: xLine, y: yLine }, pivotPoint, rotate.angle);
            xLine = rotatedPoint.x;
            yLine = rotatedPoint.y;
        }
        page.drawText(line, {
            x: xLine,
            y: yLine,
            rotate,
            size: fontSize,
            color,
            lineHeight: lineHeight * fontSize,
            font: pdfFontValue,
            opacity,
        });
    });
};
exports.pdfRender = pdfRender;
//# sourceMappingURL=pdfRender.js.map