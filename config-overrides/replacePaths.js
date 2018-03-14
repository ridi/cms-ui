const _ = require('lodash');
const { paths } = require('react-app-rewired');

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const pathsPath = paths.scriptVersion + '/config/paths';
const originalPaths = require(pathsPath);

module.exports = (paths = {}) => {
  require.cache[require.resolve(pathsPath)].exports = {
    ...originalPaths,
    ..._.mapValues(paths, resolveApp),
  };
};
