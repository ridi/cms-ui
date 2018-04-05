const { paths } = require('react-app-rewired');
const path = require('path');

const pathsPath = paths.scriptVersion + '/config/paths';

const initPaths = (appDirectory) => {
  const resolvePath = relativePath => path.resolve(appDirectory, relativePath);
  return replacePaths({
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
  return replaceModule(pathsPath, exports => ({
    ...exports,
    ...paths,
  }));
};

const replaceModule = (modulePath, override = exports => exports) => {
  const resolvedModulePath = require.resolve(modulePath);
  if (!require.cache[resolvedModulePath]) {
    require(modulePath);
  }
  const cachedModule = require.cache[resolvedModulePath];
  return cachedModule.exports = override(cachedModule.exports);
};

module.exports = {
  initPaths,
  replacePaths,
  replaceModule,
};
