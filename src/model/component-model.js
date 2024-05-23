import { Model } from './model.js';
import componentSchema from './component-schema.json';

class ComponentModel extends Model {
  assign (props) {
    this._id = props.id;
    super.assign(props);
  }
  parse (classes = [], attributes = {}) {
    if (this.id) attributes.id = this.id;
    super.parse(classes, attributes);
  }

  get id () {
    return this._id;
  }
}

ComponentModel.registerSchema(componentSchema);

export { ComponentModel };
