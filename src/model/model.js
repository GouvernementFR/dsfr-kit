import { deepFreeze } from '../utility';
import { ModelContext } from './model-context.js';
import { schemas } from './schemas.js';

const STATE = {
  CONSTRUCTION: 0,
  INITIALIZATION: 1,
  NORMALIZATION: 2,
  ASSIGNMENT: 3,
  PARSING: 4
};

class Model {
  constructor (props, context = null) {
    this._internals = {
      state: STATE.CONSTRUCTION,
      context: context,
      props: {}
    };
    this.init(props);
    if (this._internals.state < STATE.INITIALIZATION) throw new Error('Model initialization failed. did you forget to call super.init(props)?');
    props = this.normalize(props);
    if (this._internals.state < STATE.NORMALIZATION) throw new Error('Model normalization failed. did you forget to call super.normalize(props)?');
    this.assign(props);
    if (this._internals.state < STATE.ASSIGNMENT) throw new Error('Model assignment failed. did you forget to call super.assign(props)?');
    this.parse();
    if (this._internals.state < STATE.PARSING) throw new Error('Model parsing failed. did you forget to call super.parse(classes, attributes)?');
  }

  get schema () {
    return this.constructor.schema;
  }

  init (props) {
    this._internals.state = STATE.INITIALIZATION;
  }

  normalize (props)  {
    this._internals.state = STATE.NORMALIZATION;
    const normalisedProps = {};
    let warning = '';
    const schemaProperties = this.schema.properties;
    const required = this.schema.required || [];
    Object.entries(schemaProperties).forEach(([key, spec]) => {
      const value = props[key];
      let isDefined = true;
      const isRequired = required.includes(key);

      if (value === undefined) {
        isDefined = false;
        if (isRequired) warning += `- property ${key} is required while not defined\n`;
      }

      if (isDefined) {
        const type = typeof value;
        switch (spec.type) {
          case 'string':
            switch (type) {
              case 'string':
                normalisedProps[key] = value;
                break;
              case 'number':
                normalisedProps[key] = String(value);
                break;
              case 'boolean':
                normalisedProps[key] = value ? 'true' : 'false';
                break;
              default:
                isDefined = false;
            }
            break;

          case 'number':
            switch (type) {
              case 'string':
                normalisedProps[key] = value.indexOf('.') ? parseFloat(value) : parseInt(value);
                break;
              case 'number':
                normalisedProps[key] = value;
                break;
              default:
                isDefined = false;
            }
            break;

          case 'array':
            switch (true) {
              case type === 'string':
                normalisedProps[key] = value.split(',');
                break;
              case type === 'number':
                normalisedProps[key] = [value];
                break;
              case type === 'boolean':
                normalisedProps[key] = value ? [true] : [false];
                break;
              case type === 'object' && Array.isArray(value):
                normalisedProps[key] = value;
                break;
              case type === 'object':
                normalisedProps[key] = value.reduce((acc, [k, v]) => {  acc[parseInt(k)] = v; return acc; }, {});
                break;
              default:
                isDefined = false;
            }
            break;
          case 'object':
            switch (type) {
              case 'string':
                try {
                  normalisedProps[key] = JSON.parse(value);
                } catch (e) {
                  isDefined = false;
                }
                break;
              case 'object':
                normalisedProps[key] = value;
                break;
              default:
                isDefined = false;
            }
            break;
          case 'boolean':
            switch (type) {
              case 'string':
                normalisedProps[key] = value === 'true';
                break;
              case 'number':
                normalisedProps[key] = value !== 0;
                break;
              case 'boolean':
                normalisedProps[key] = value;
                break;
              default:

                isDefined = false;
            }
            break;
        }
        if (!isDefined) {
          warning += `- Property '${key}' is not of type '${spec.type}'\n`;
          if (isRequired) warning += `- Property '${key}' is required\n`;
        }
      }

      if (value !== undefined && spec.enum) {
        if (spec.enum.includes(value)) normalisedProps[key] = value;
        else {
          warning += `- Property ${key} is not in enum\n`;
          isDefined = false;
        }
      }

      if (spec.default !== undefined && !isDefined) {
        normalisedProps[key] = spec.default;
        warning += `- set property '${key}' to default value\n`;
      }
    });
    if (warning !== '') console.warn(`model '${this.constructor.name}' normalization:\n${warning}`);
    Object.freeze(normalisedProps);
    return normalisedProps;
  }

  assign (props) {
    this._internals.state = STATE.ASSIGNMENT;
  }

  addProp (key, value) {
    this._internals.props[key] = value;
  }

  parse (classes = [], attributes = {}) {
    this._internals.state = STATE.PARSING;
    classes = deepFreeze(classes);
    this._internals.classes = classes;
    const className = classes.join(' ');
    this._internals.className = className;
    this._internals.attributes = deepFreeze(attributes);

    switch (this._internals.context) {
      case ModelContext.REACT:
        this._internals.props.attributes = { ...attributes, className: className };
        break;

      default:
        this._internals.props.attributes = { ...attributes, class: className };
    }

    deepFreeze(this._internals.props);
  }

  get classes () {
    return this._internals.classes;
  }

  get className () {
    return this._._internals.className;
  }

  get attributes () {
    return this._internals.attributes;
  }

  get props () {
    return this._internals.props;
  }

  static get schema () {
    return this._schema;

  }
}

Model.Context = ModelContext;

Model.registerSchema = (schema) => {
  Model._schema = schemas.getSchema(schema);
};

export { Model };
