/**
 * server/index.js
 * Initialize the server in development or production mode.
 */

const express = require('express');
const app = express();
const argv = require('minimist')(process.argv.slice(2));
const prodMiddleware = require('./middleware/prodMiddleware');
const devMiddleware = require('./middleware/devMiddleware');

// Use localhost and port 3000 if Host and Port not provided.
const port = parseInt(argv.port || process.env.PORT || '3000', 10);
const host = argv.host || process.env.HOST || process.env.IP || "0.0.0.0"; 

// Middleware: set mode to development or production.
const path = require('path');
const mode = process.env.NODE_ENV;
if (mode === 'production') {
  const options = {
    outputPath: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  };
  prodMiddleware(app, options);
} 
else {
  const webpack = require('../internals/webpack/webpack.dev.babel');
  devMiddleware(app, webpack);
}

// Bind and listen for connections on the specified host and port.
app.listen(port, host, err => {
  if (err) {
    console.error(err.message);
  }

  console.log("Server started!");
  console.log("Localhost: http://" + host + ":" + port);
  console.log("Press 'CTRL-C' to stop");
});