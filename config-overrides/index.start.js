const { compose } = require('react-app-rewired');
const rewireBabelLoader = require('react-app-rewire-babel-loader');
const path = require('path');

const dirName = 'example';

const resolveOwn = relativePath => path.resolve(__dirname, '..', relativePath);

const overrides = require(`../${dirName}/config-overrides`);

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      overrides.webpack,
      config => {
        config.module.rules.unshift({
          ...config.module.rules[0],
          include: resolveOwn('lib/src'),
        });
        return config;
      },
      config => rewireBabelLoader.include(
        config,
        resolveOwn('lib/src'),
      ),
    );
    return rewires(config, env);
  },
  devServer: createDevServerConfig => (proxy, allowedHost) => {
    return overrides.devServer(createDevServerConfig)(proxy, allowedHost);
  },
};
