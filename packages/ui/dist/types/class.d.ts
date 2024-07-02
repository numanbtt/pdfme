import { Template, Size, Plugins, UIProps, UIOptions, PreviewProps } from '@pdfme/common';
export declare abstract class BaseUIClass {
    protected domContainer: HTMLElement | null;
    protected template: Template;
    protected size: Size;
    private lang;
    private font;
    private pluginsRegistry;
    private options;
    private readonly setSize;
    resizeObserver: ResizeObserver;
    constructor(props: UIProps);
    protected getLang(): "en" | "th" | "pl" | "zh" | "ja" | "ko" | "ar" | "it" | "de" | "es" | "fr";
    protected getFont(): Record<string, {
        data: (string | ArrayBuffer | Uint8Array) & (string | ArrayBuffer | Uint8Array | undefined);
        fallback?: boolean | undefined;
        subset?: boolean | undefined;
    }>;
    protected getPluginsRegistry(): Plugins;
    protected getOptions(): {};
    getTemplate(): import("zod").objectOutputType<{
        schemas: import("zod").ZodArray<import("zod").ZodRecord<import("zod").ZodString, import("zod").ZodObject<{
            type: import("zod").ZodString;
            icon: import("zod").ZodOptional<import("zod").ZodString>;
            content: import("zod").ZodOptional<import("zod").ZodString>;
            position: import("zod").ZodObject<{
                x: import("zod").ZodNumber;
                y: import("zod").ZodNumber;
            }, "strip", import("zod").ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            rotate: import("zod").ZodOptional<import("zod").ZodNumber>;
            opacity: import("zod").ZodOptional<import("zod").ZodNumber>;
            readOnly: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, "passthrough", import("zod").ZodTypeAny, import("zod").objectOutputType<{
            type: import("zod").ZodString;
            icon: import("zod").ZodOptional<import("zod").ZodString>;
            content: import("zod").ZodOptional<import("zod").ZodString>;
            position: import("zod").ZodObject<{
                x: import("zod").ZodNumber;
                y: import("zod").ZodNumber;
            }, "strip", import("zod").ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            rotate: import("zod").ZodOptional<import("zod").ZodNumber>;
            opacity: import("zod").ZodOptional<import("zod").ZodNumber>;
            readOnly: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, import("zod").ZodTypeAny, "passthrough">, import("zod").objectInputType<{
            type: import("zod").ZodString;
            icon: import("zod").ZodOptional<import("zod").ZodString>;
            content: import("zod").ZodOptional<import("zod").ZodString>;
            position: import("zod").ZodObject<{
                x: import("zod").ZodNumber;
                y: import("zod").ZodNumber;
            }, "strip", import("zod").ZodTypeAny, {
                x: number;
                y: number;
            }, {
                x: number;
                y: number;
            }>;
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            rotate: import("zod").ZodOptional<import("zod").ZodNumber>;
            opacity: import("zod").ZodOptional<import("zod").ZodNumber>;
            readOnly: import("zod").ZodOptional<import("zod").ZodBoolean>;
        }, import("zod").ZodTypeAny, "passthrough">>>, "many">;
        basePdf: import("zod").ZodUnion<[import("zod").ZodString, import("zod").ZodType<ArrayBuffer, import("zod").ZodTypeDef, ArrayBuffer>, import("zod").ZodType<Uint8Array, import("zod").ZodTypeDef, Uint8Array>, import("zod").ZodObject<{
            width: import("zod").ZodNumber;
            height: import("zod").ZodNumber;
            padding: import("zod").ZodTuple<[import("zod").ZodNumber, import("zod").ZodNumber, import("zod").ZodNumber, import("zod").ZodNumber], null>;
        }, "strip", import("zod").ZodTypeAny, {
            width: number;
            height: number;
            padding: [number, number, number, number];
        }, {
            width: number;
            height: number;
            padding: [number, number, number, number];
        }>]>;
        pdfmeVersion: import("zod").ZodOptional<import("zod").ZodString>;
    }, import("zod").ZodTypeAny, "passthrough">;
    updateTemplate(template: Template): void;
    updateOptions(options: UIOptions): void;
    destroy(): void;
    protected abstract render(): void;
}
export declare abstract class PreviewUI extends BaseUIClass {
    protected inputs: {
        [key: string]: string;
    }[];
    constructor(props: PreviewProps);
    getInputs(): {
        [key: string]: string;
    }[];
    setInputs(inputs: {
        [key: string]: string;
    }[]): void;
    protected abstract render(): void;
}
