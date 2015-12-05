module.exports = {
  entry: './client/main.js',
  output: {
    path: __dirname + '/client/build',
    filename: 'bundle.js',
  },
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
