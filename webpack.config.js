var path = require('path');
var webpack = require('webpack');
var OfflinePlugin = require('offline-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js',
  },
  // resolveLoader: {
    // root: path.join(__dirname, 'node_modules'),
  // },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.html$/,
        loader: 'babel-loader!wc-loader?minify=true',
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new OfflinePlugin()
  ],
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
    },
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
  },
  devtool: 'eval-source-map'
};

