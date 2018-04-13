const _ = require('lodash');
const createVariants = require('parallel-webpack').createVariants;
const createWebpackConfig = require('./createWebpackConfig');

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const baseOptions = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
};

const variants = {
  target: _.split(process.env.TARGET || 'var,umd', ','),
};

module.exports = createVariants(baseOptions, variants, createWebpackConfig);
