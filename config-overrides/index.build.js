const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireCss = require('./rewires/css');
const rewireReactLibrary = require('react-app-rewire-react-library');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const { replacePaths } = require('./utils');
const pkg = require('../package.json');

const appDirectory = path.resolve(__dirname, '..');
const resolveOwn = (...relativePaths) => path.resolve(appDirectory, ...relativePaths);

const paths = replacePaths({
  appBuild: resolveOwn('lib'),
  appPublic: resolveOwn('lib'),
  appHtml: resolveOwn(''),
});

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
      (config, env) => rewireCss(config, env, options => ({
        ...options,
        localIdentName: '[local]___[hash:base64:5]',
      })),
      (config, env) => {
        const options = {
          module: paths.appIndexJs,
          ...pkg,
        };
        config = rewireReactLibrary(config, env, options, true);
        config.entry = options.module;
        config.output.library = undefined;
        config.plugins = [
          new ExtractTextPlugin({
            filename: `${path.basename(pkg.main, '.js')}.css`,
            disable: true,
          }),
        ];
        return config;
      },
    );
    return rewires(config, env);
  },
};
