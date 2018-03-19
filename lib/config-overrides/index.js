const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireReactLibrary = require('react-app-rewire-react-library');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const { initPaths, replacePaths } = require('../config-overrides/utils');
const pkg = require('../package.json');

const appDirectory = path.resolve(__dirname, '..');
const resolveOwn = relativePath => path.resolve(appDirectory, relativePath);

initPaths(appDirectory);

replacePaths({
  appBuild: resolveOwn('lib'),
  appPublic: resolveOwn('lib'),
  appHtml: resolveOwn(''),
});

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
      (config, env) => {
        const options = {
          ...pkg,
          module: resolveOwn(pkg.module),
          main: resolveOwn(pkg.main),
        };
        config = rewireReactLibrary(config, env, options, true);
        config.entry = options.module;
        config.output.library = undefined;
        config.plugins = [
          new ExtractTextPlugin({
            filename: `${path.basename(pkg.main, '.js')}.css`,
          }),
        ];
        return config;
      },
    );
    return rewires(config, env);
  },
};
