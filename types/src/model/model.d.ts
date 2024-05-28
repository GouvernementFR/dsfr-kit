export class Model {
    static get schema(): any;
    static registerSchema(schema: any): void;
    constructor(props: any, context?: any);
    _internals: {
        state: number;
        context: any;
        props: {};
    };
    get schema(): any;
    init(props: any): void;
    normalize(props: any): {};
    assign(props: any, getters?: {}): void;
    parse(classes?: any[], attributes?: {}, properties?: {}, ...elementsArgs: any[]): void;
    get classes(): any;
    get className(): any;
    get attributes(): any;
    get elements(): any;
    get props(): {};
}
export namespace Model {
    export { ModelContext as Context };
}
import { ModelContext } from './model-context.js';
