import { deepFreeze } from '../utility/index.js';

const schema = deepFreeze({
  id: {
    type: String,
    description: 'Attribut id de l’élément'
  }
});

export { schema as componentSchema };
