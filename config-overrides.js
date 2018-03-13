const rewireEslint = require('react-app-rewire-eslint');

module.exports = {
  webpack: (config, env) => {
    config = rewireEslint(config, env);
    return config;
  },
  devServer: configFunction => (proxy, allowedHost) => {
    const config = configFunction(proxy, allowedHost);
    return config;
  },
};
