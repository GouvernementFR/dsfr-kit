import { deepFreeze } from '../utility/index.js';
export const ModelContext = deepFreeze({
  HTML: 'html',
  WEB_COMPONENT: 'web-component',
  REACT: 'react',
  VUE: 'vue',
  ANGULAR: 'angular'
});
