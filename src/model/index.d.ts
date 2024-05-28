declare interface Attributes {
    readonly id?: string | undefined;
    readonly 'class'?: string | undefined
    readonly 'aria-hidden'?: string | undefined;
    readonly 'aria-label'?: string | undefined;
}

declare interface Element {
    readonly innerHTML?: string | undefined;
    readonly attributes: Attributes;
}

declare interface Elements {
    readonly [key: string]: Element;
}

declare interface Props extends Element {
    readonly elements?: Elements;
}

export declare class Model {
    constructor (props: any, context: string);
    init (props: any): any;
    assign (props: any, getters: any): any;
    parse (classes: Array<string>, attributes: any, properties: any, ...elementsArgs: any[]): any;
    readonly schema: any;
    readonly classes: Array<string>;
    readonly className: string;
    readonly attributes: Attributes;
    readonly elements: Elements;
    readonly props: Props;
}

export declare class ComponentModel extends Model {}
