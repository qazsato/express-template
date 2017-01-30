const webpack = require('webpack');
const ENV = process.env.NODE_ENV;
const devtool = ENV === 'development' ? 'source-map' : '';

module.exports = {
  entry: {
    'index': __dirname + '/public/src/scripts/index.js'
  },
  output: {
    filename: __dirname + '/public/dist/scripts/[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query:{
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: devtool,
  resolve: {
    extensions: ['', '.js']
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
