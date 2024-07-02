"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_js_1 = require("../utils.js");
const constants_js_1 = require("../constants.js");
const DEFAULT_LINE_COLOR = '#000000';
const lineSchema = {
    pdf: (arg) => {
        const { page, schema, options } = arg;
        if (schema.width === 0 || schema.height === 0 || !schema.color)
            return;
        const { colorType } = options;
        const pageHeight = page.getHeight();
        const { width, height, rotate, position: { x, y }, opacity, } = (0, utils_js_1.convertForPdfLayoutProps)({ schema, pageHeight, applyRotateTranslate: false });
        const pivot = { x: x + width / 2, y: y + height / 2 };
        page.drawLine({
            start: (0, utils_js_1.rotatePoint)({ x, y: y + height / 2 }, pivot, rotate.angle),
            end: (0, utils_js_1.rotatePoint)({ x: x + width, y: y + height / 2 }, pivot, rotate.angle),
            thickness: height,
            color: (0, utils_js_1.hex2PrintingColor)(schema.color ?? DEFAULT_LINE_COLOR, colorType),
            opacity: opacity,
        });
    },
    ui: (arg) => {
        const { schema, rootElement } = arg;
        const div = document.createElement('div');
        div.style.backgroundColor = schema.color ?? 'transparent';
        div.style.width = '100%';
        div.style.height = '100%';
        rootElement.appendChild(div);
    },
    propPanel: {
        schema: ({ i18n }) => ({
            color: {
                title: i18n('schemas.color'),
                type: 'string',
                widget: 'color',
                required: true,
                rules: [{ pattern: constants_js_1.HEX_COLOR_PATTERN, message: i18n('hexColorPrompt') }],
            },
        }),
        defaultSchema: {
            type: 'line',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus"><path d="M5 12h14"/></svg>',
            position: { x: 0, y: 0 },
            width: 50,
            height: 1,
            rotate: 0,
            opacity: 1,
            readOnly: true,
            color: DEFAULT_LINE_COLOR,
        },
    },
};
exports.default = lineSchema;
//# sourceMappingURL=line.js.map