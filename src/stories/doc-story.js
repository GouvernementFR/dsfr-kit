import { schemaToArgTypes } from './schema-to-arg-types.js';
import { schemaToArgs } from './schema-to-args.js';

export const docStory = (component, schema) => {
  return {
    title: schema.title,
    tags: ['autodocs'],
    component: component,
    argTypes: schemaToArgTypes(schema),
    args: schemaToArgs(schema)
  };
}
