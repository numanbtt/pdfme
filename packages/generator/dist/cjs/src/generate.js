"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfLib = __importStar(require("@pdfme/pdf-lib"));
const common_1 = require("@pdfme/common");
const schemas_1 = require("@pdfme/schemas");
const helper_js_1 = require("./helper.js");
const generate = async (props) => {
    (0, common_1.checkGenerateProps)(props);
    const { inputs, template, options = {}, plugins: userPlugins = {} } = props;
    const basePdf = template.basePdf;
    if (inputs.length === 0) {
        throw new Error('inputs should not be empty');
    }
    const { pdfDoc, renderObj } = await (0, helper_js_1.preprocessing)({ template, userPlugins });
    const _cache = new Map();
    for (let i = 0; i < inputs.length; i += 1) {
        const input = inputs[i];
        const dynamicTemplate = await (0, common_1.getDynamicTemplate)({
            template,
            input,
            options,
            _cache,
            modifyTemplate: (arg) => {
                return (0, schemas_1.modifyTemplateForTable)(arg);
            },
            getDynamicHeight: (value, args) => {
                if (args.schema.type !== 'table')
                    return Promise.resolve(args.schema.height);
                return (0, schemas_1.getDynamicHeightForTable)(value, args);
            },
        });
        const { basePages, embedPdfBoxes } = await (0, helper_js_1.getEmbedPdfPages)({
            template: dynamicTemplate,
            pdfDoc,
        });
        const keys = dynamicTemplate.schemas.flatMap((schemaObj) => Object.keys(schemaObj));
        for (let j = 0; j < basePages.length; j += 1) {
            const basePage = basePages[j];
            const embedPdfBox = embedPdfBoxes[j];
            const page = (0, helper_js_1.insertPage)({ basePage, embedPdfBox, pdfDoc });
            for (let l = 0; l < keys.length; l += 1) {
                const key = keys[l];
                const schemaObj = dynamicTemplate.schemas[j] || {};
                const schema = schemaObj[key];
                if (!schema) {
                    continue;
                }
                const render = renderObj[schema.type];
                if (!render) {
                    continue;
                }
                const value = schema.readOnly ? schema.content || '' : input[key];
                await render({ key, value, schema, basePdf, pdfLib, pdfDoc, page, options, _cache });
            }
        }
    }
    (0, helper_js_1.postProcessing)({ pdfDoc, options });
    return pdfDoc.save();
};
exports.default = generate;
//# sourceMappingURL=generate.js.map