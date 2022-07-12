const path = require('path');
const ArcoWebpackPlugin = require('@arco-plugins/webpack-react');

module.exports = function override(config){

  config.resolve.alias['@'] =  path.resolve(__dirname, 'src')
  config.plugins.push(
    new ArcoWebpackPlugin({
      style: true
    })
  )

  return config;
};