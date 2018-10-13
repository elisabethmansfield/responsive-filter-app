/**
 * Loadable.js
 * Use React Loadable to asynchronously load the HomePage container.
 */
 
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./HomePage'),
  loading: () => null,
});
