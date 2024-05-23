import { deepFreeze } from '../utility/index.js';

class Schemas {
  constructor() {
    this._schemas = {};
  }

  getSchema (schema) {
    const id = schema.$id;
    if (!this._schemas[id]) {
      const copy = { ...schema };
      if (schema.$ref) {
        const extension = this._schemas[schema.$ref];
        if (!extension) {
          throw new Error(`Schema not found: ${schema.$ref}`);
        }
        copy.properties = { ...extension.properties, ...copy.properties };
      }
      this._schemas[id] = deepFreeze(copy);
    }

    return this._schemas[id];
  }
}

const schemas = new Schemas();

export { schemas };
