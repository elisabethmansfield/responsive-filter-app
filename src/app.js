/**
 * app.js
 * Set up entry into the React application.
 */

// Import React and the root app.
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'containers/App';

// Webpack loaders for images and stylesheets.
import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import '!!style-loader!css-loader!./stylesheets/bootstrap.min.css';
import 'bootstrap';
import 'babel-polyfill';

// Render React app into the DOM.
const APP_NODE = document.getElementById('react_app');
const render = () => {
  ReactDOM.render( <App />, APP_NODE );
};
render();

// Set up hot reloading for React components.
if (module.hot) {
  module.hot.accept('containers/App', () => {
    ReactDOM.unmountComponentAtNode(APP_NODE);
    render();
  });
}

// Install ServiceWorker and AppCache.
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}