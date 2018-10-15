/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

process.noDeprecation = true;

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        // Transform all .js files required somewhere with Babel
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery
        }
      },
      {
        // Preprocess .css files
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
              },
              gifsicle: {
                interlaced: false
              },
              optipng: {
                optimizationLevel: 7
              }
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main']
  },
  devtool: options.devtool,
  // Make web variables accessible to webpack, e.g. window
  target: 'web',
  performance: options.performance || {}
});
