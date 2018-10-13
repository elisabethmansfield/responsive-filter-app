/**
 * PRODUCTION WEBPACK CONFIGURATION
 */
 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const OfflinePlugin = require('offline-plugin');
const { HashedModuleIdsPlugin } = require('webpack');

module.exports = require('./webpack.base.babel')({
  mode: 'production',

  // In production, skip all hot-reloading 
  entry: [path.join(process.cwd(), 'src/app.js')],

  // Utilize long-term caching by adding content hashes to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    nodeEnv: 'production',
    sideEffects: true,
    concatenateModules: true,
    splitChunks: { chunks: 'all' },
    runtimeChunk: true,
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      appShell: '/',

      caches: {
        main: [':rest:'],
        additional: ['*.chunk.js']
      },

      // Remove warning for about `additional` section usage
      safeToUseOptionalCaches: true,
    }),

    new WebpackPwaManifest({
      name: 'Responsive Filter App',
      short_name: 'RFA',
      description: 'A responsive web application that allows the user to quick filter a list of things',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('src/images/icon-512x512.png'),
          sizes: [72, 96, 120, 128, 144, 152, 167, 180, 192, 384, 512],
        },
      ],
    }),

    new HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20,
    }),
  ],

  performance: {
    assetFilter: assetFilename =>
      !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
