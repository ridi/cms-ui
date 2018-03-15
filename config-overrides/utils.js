const { paths } = require('react-app-rewired');
const path = require('path');

const pathsPath = paths.scriptVersion + '/config/paths';

const initPaths = (dirname) => {
  const resolvePath = relativePath => path.resolve(dirname, relativePath);
  replacePaths({
    dotenv: resolvePath('.env'),
    appPath: resolvePath('.'),
    appBuild: resolvePath('build'),
    appPublic: resolvePath('public'),
    appHtml: resolvePath('public/index.html'),
    appIndexJs: resolvePath('src/index.js'),
    appPackageJson: resolvePath('package.json'),
    appSrc: resolvePath('src'),
    yarnLockFile: resolvePath('yarn.lock'),
    testsSetup: resolvePath('src/setupTests.js'),
    appNodeModules: resolvePath('node_modules'),
  });
};

const replacePaths = (paths = {}) => {
  const pathsModulePath = require.resolve(pathsPath);
  if (!require.cache[pathsModulePath]) {
    require(pathsPath);
  }
  const pathsModule = require.cache[pathsModulePath];
  pathsModule.exports = {
    ...pathsModule.exports,
    ...paths,
  };
};

module.exports = {
  initPaths,
  replacePaths,
};
