const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');
const replacePaths = require('./replacePaths');

replacePaths({
  appIndexJs: 'src/index.jsx',
});

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
      rewireReactHotLoader,
    );
    return rewires(config, env);
  },
  devServer: configFunction => (proxy, allowedHost) => {
    return configFunction(proxy, allowedHost);
  },
};
