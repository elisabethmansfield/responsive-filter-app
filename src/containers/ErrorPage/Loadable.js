/**
 * Loadable.js
 * Use React Loadable to asynchronously load the ErrorPage container.
 */
 
import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./ErrorPage'),
  loading: () => null,
});
