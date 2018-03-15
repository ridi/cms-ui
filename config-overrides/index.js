module.exports = (() => {
  switch (process.env.npm_lifecycle_event) {
    case 'start':
      return require('./index.start');
    case 'build':
      return require('./index.build');
    default:
      return undefined;
  }
})();
