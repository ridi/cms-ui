const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
      rewireReactHotLoader,
    );
    return rewires(config, env);
  },
  devServer: configFunction => (proxy, allowedHost) => {
    const config = configFunction(proxy, allowedHost);
    return config;
  },
};
