const createVariants = require('parallel-webpack').createVariants;
const createWebpackConfig = require('./createWebpackConfig');

process.env.NODE_ENV = 'production';

module.exports = createVariants({
  target: ['commonjs2'],
}, createWebpackConfig);
