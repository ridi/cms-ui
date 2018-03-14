const { paths } = require('react-app-rewired');

const pathsPath = paths.scriptVersion + '/config/paths';
const originalPaths = require(pathsPath);

module.exports = (paths = {}) => {
  require.cache[require.resolve(pathsPath)].exports = {
    ...originalPaths,
    ...paths,
  };
};
