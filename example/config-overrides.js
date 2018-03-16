const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const paths = require('react-app-rewired/scripts/utils/paths');
const { prepareProxy } = require('react-dev-utils/WebpackDevServerUtils');
const { initPaths } = require('../lib/config-overrides/utils');

initPaths(__dirname);

const CMS_RPC_PATH = '/cms_rpc';
const CMS_RPC_URL = process.env.CMS_RPC_URL;
if (CMS_RPC_URL) {
  process.env.REACT_APP_CMS_RPC_PATH = CMS_RPC_PATH;
}

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
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
