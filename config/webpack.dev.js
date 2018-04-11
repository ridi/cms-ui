const createVariants = require('parallel-webpack').createVariants;
const createWebpackConfig = require('./createWebpackConfig');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const baseOptions = {
  mode: process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
};

const variants = {
  target: ['var', 'umd'],
};

module.exports = createVariants(baseOptions, variants, createWebpackConfig);
