const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const { initPaths } = require('../config-overrides/utils');

initPaths(__dirname);

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
    );
    return rewires(config, env);
  },
  devServer: configFunction => (proxy, allowedHost) => {
    return configFunction(proxy, allowedHost);
  },
};
