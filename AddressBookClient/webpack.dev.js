const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const openBrowserPlugin = require('open-browser-webpack-plugin');

const options = {
  host:'localhost',
  port:'3000'
};

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: options.host,
    port: options.port
  },
  plugins:[
    new openBrowserPlugin({
      url: `http://${options.host}:${options.port}`
    })
  ]
});