const path = require('path');
const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireCss = require('./rewires/css');
const { initPaths } = require('./utils');

initPaths(path.resolve(__dirname, '..'));

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
      (config, env) => rewireCss(config, env,
        cssLoaderOptions => ({
          ...cssLoaderOptions,
          sourceMap: true,
        }),
        postcssLoaderOptions => ({
          ...postcssLoaderOptions,
          sourceMap: true,
        }),
      ),
      (config) => {
        config.resolve.plugins = [];
        return config;
      },
    );
    return rewires(config, env);
  },
};
