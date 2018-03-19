const { compose } = require('react-app-rewired');
const rewireBabelLoader = require('react-app-rewire-babel-loader');
const path = require('path');
const mkdirp = require('mkdirp');
const createIfNotExist = require('create-if-not-exist');

const resolveOwn = (...relativePaths) => path.resolve(__dirname, '..', ...relativePaths);

const libDir = 'lib';
const libSrcDir = resolveOwn(libDir, 'src');
const libPath = resolveOwn(libDir, require(resolveOwn(libDir, 'package.json')).main);
mkdirp.sync(path.dirname(libPath));
createIfNotExist(libPath, '');

const overrides = require('../example/config-overrides');

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      overrides.webpack,
      config => {
        config.module.rules.unshift({
          ...config.module.rules[0],
          include: libSrcDir,
        });
        return config;
      },
      config => rewireBabelLoader.include(
        config,
        libSrcDir,
      ),
    );
    return rewires(config, env);
  },
  devServer: createDevServerConfig => (proxy, allowedHost) => {
    return overrides.devServer(createDevServerConfig)(proxy, allowedHost);
  },
};
