const { compose } = require('react-app-rewired');
const rewireBabelLoader = require('react-app-rewire-babel-loader');
const rewireCssModules = require('./rewires/css-modules');
const path = require('path');

const resolveOwn = (...relativePaths) => path.resolve(__dirname, '..', ...relativePaths);
const libSrcDir = resolveOwn('src');
const overrides = require('../example/config-overrides');

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      overrides.webpack,
      config => {
        config.module.rules.unshift({
          ...config.module.rules[0],
          include: libSrcDir,
        });
        return config;
      },
      config => rewireBabelLoader.include(
        config,
        libSrcDir,
      ),
      (config, env) => rewireCssModules(config, env, options => ({
        ...options,
        localIdentName: 'cms-ui___[local]___[hash:base64:5]',
      })),
    );
    return rewires(config, env);
  },
  devServer: createDevServerConfig => (proxy, allowedHost) => {
    return overrides.devServer(createDevServerConfig)(proxy, allowedHost);
  },
};
