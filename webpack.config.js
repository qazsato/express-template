const webpack = require('webpack');
const ENV = process.env.NODE_ENV;
const devtool = ENV === 'development' ? 'source-map' : '';

module.exports = {
  entry: {
    'index': './public/src/scripts/index.js'
  },
  output: {
    filename: './public/dist/scripts/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool,
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
