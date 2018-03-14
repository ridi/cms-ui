const { compose } = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const rewireReactLibrary = require('react-app-rewire-react-library');
const path = require('path');
const fs = require('fs');
const replacePaths = require('./replacePaths');
const pkg = require('../package.json');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

replacePaths({
  appBuild: resolveApp('lib'),
  appPublic: resolveApp('lib'),
  appHtml: resolveApp(''),
});

module.exports = {
  webpack: (config, env) => {
    const rewires = compose(
      rewireEslint,
      (config, env) => {
        config = rewireReactLibrary(config, env, pkg, true);
        config.entry = resolveApp(pkg.module);
        config.output.library = undefined;
        return config;
      },
    );
    return rewires(config, env);
  },
};
