const _ = require('lodash');
const createVariants = require('parallel-webpack').createVariants;
const WebpackShellPlugin = require('webpack-shell-plugin-next');
const createWebpackConfig = require('./createWebpackConfig');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const baseOptions = {
  mode: process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: {
        scripts: ['npm start --prefix examples/var'],
      },
    }),
  ],
};

const variants = {
  target: _.split(process.env.TARGET || 'var', ','),
};

module.exports = createVariants(baseOptions, variants, createWebpackConfig);
