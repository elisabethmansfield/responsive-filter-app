/**
 * Loadable.js
 * Use React Loadable to asynchronously load the BlockContent component. 
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./BlockContent'),
  loading: () => null,
});
