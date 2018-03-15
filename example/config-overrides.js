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
      config => {
        config.module.rules.unshift({
          ...config.module.rules[0],
          include: resolveApp('../lib/src'),
        });
        return config;
      },
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
