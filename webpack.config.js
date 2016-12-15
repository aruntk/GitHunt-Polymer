var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  devServer: {
    // historyApiFallback: true,
    // noInfo: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3010',
        ws: true,
      },
      "/graphiql": {
        "target": "http://localhost:3010",
        "secure": false
      },
      "/login": {
        "target": "http://localhost:3010",
        "secure": false
      },
      "/logout": {
        "target": "http://localhost:3010",
        "secure": false
      }
    }
  },
  devtool: 'eval-source-map'
};

