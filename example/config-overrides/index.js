const path = require('path');
const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireCss = require('./rewires/css');
const rewireBabelLoader = require('react-app-rewire-babel-loader');
const paths = require('react-app-rewired/scripts/utils/paths');
const { prepareProxy } = require('react-dev-utils/WebpackDevServerUtils');
const { initPaths } = require('./utils');

initPaths(path.resolve(__dirname, '..'));

const LIB_SRC_PATH = path.resolve(__dirname, '../../src');

const CMS_RPC_PATH = '/cms_rpc';
const CMS_RPC_URL = process.env.CMS_RPC_URL;
if (CMS_RPC_URL) {
  process.env.REACT_APP_CMS_RPC_PATH = CMS_RPC_PATH;
}

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
      (config, env) => rewireCss(config, env,
        cssLoaderOptions => ({
          ...cssLoaderOptions,
          sourceMap: true,
        }),
        postcssLoaderOptions => ({
          ...postcssLoaderOptions,
          sourceMap: true,
        }),
      ),
      config => {
        config.module.rules.unshift({
          ...config.module.rules[0],
          include: LIB_SRC_PATH,
        });
        return config;
      },
      config => rewireBabelLoader.include(
        config,
        LIB_SRC_PATH,
      ),
      (config) => {
        config.resolve.plugins = [];
        return config;
      },
    );
    return rewires(config, env);
  },
  devServer: createDevServerConfig => (proxy, allowedHost) => {
    const config = createDevServerConfig(proxy, allowedHost);

    if (CMS_RPC_URL) {
      config.proxy = prepareProxy({
        [CMS_RPC_PATH]: {
          target: CMS_RPC_URL,
          ignorePath: true,
        },
      }, paths.appPublic);
    }

    return config;
  },
};