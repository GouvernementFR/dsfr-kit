import { Model as ModelInterface, ComponentModel as ComponentModelInterface } from './src/model/index';

declare module '@gouvfr/dsfr-kit' {
  export function schemaToArgTypes(schema: any): any;
  export function schemaToArgs(schema: any): any;
  export function docStory(component: any, schema: any): any;
  export function deepFreeze(obj: any): any;
  export type Model = ModelInterface;
  export type ComponentModel = ComponentModelInterface;
}

declare module '@gouvfr/dsfr-kit/react' {
  export function rxSchemaToDefaultProps(schema: any): any;
  export function rxSchemaToPropTypes(schema: any): any;
}

declare module '@gouvfr/dsfr-kit/vue' {
  export function setupProps(props: any, Model: any, reactive :Function, computed: Function): any;
  export function vueSchemaToDefineProps(schema: any): any;
}
