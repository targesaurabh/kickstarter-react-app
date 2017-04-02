const path = require('path');

module.exports = {
  entry: {
    'index_bundle' : './client/index.js'
  },
  
  output: {
    path      : path.resolve('dist'),
    filename  : './client/dist/[name].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: "style-loader!css-loader"}      
    ]
  }

}