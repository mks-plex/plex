var webpack = require('webpack');

module.exports = {
  entry: './client/main.js',
  output: {
    path: __dirname + '/client/build',
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      mangle: true,
      compress: {
        warnings: false
      },
      minimize: true
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ]
  }
};
