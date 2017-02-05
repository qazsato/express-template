const webpack = require('webpack');

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
  devtool: 'source-map',
  resolve: {
    extensions: ['.js']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: (process.env.NODE_ENV !== 'production'),
      compress: {
        warnings: false
      }
    })
  ]
};
