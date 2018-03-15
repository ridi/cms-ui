const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireBabelLoader = require('react-app-rewire-babel-loader');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
      config => rewireBabelLoader.include(
        config,
        resolveApp('../lib'),
        resolveApp('node_modules/@ridi/cms-ui'),
      ),
    );
    return rewires(config, env);
  },
  devServer: configFunction => (proxy, allowedHost) => {
    return configFunction(proxy, allowedHost);
  },
};
