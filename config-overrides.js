module.exports = {
  webpack: (config, env) => {
    return config;
  },
  devServer: configFunction => (proxy, allowedHost) => {
    const config = configFunction(proxy, allowedHost);
    return config;
  },
};
