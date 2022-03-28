const path = require('path');
const pkg = require('../package.json');

module.exports = (options) => {
  const SRC_PATH = path.resolve(__dirname, '../src');
  const OUTPUT_PATH = path.resolve(__dirname, '../dist');
  const OUTPUT_FILENAME = `cms-ui.${options.target}.js`;

  const isProduction = options.mode === 'production';

  const sourceMap = !isProduction;

  const styleLoaderOptions = {
    sourceMap,
    hmr: !isProduction,
  };

  const cssLoaderOptions = {
    sourceMap,
  };

  const postcssLoaderOptions = {
    sourceMap,
    ident: 'postcss',
    plugins: () => [
      require('postcss-easy-import')(),
      require('postcss-cssnext')(),
      require('cssnano')(),
    ],
  };

  const sassLoaderOptions = {
    sourceMap,
    implementation: require("sass"),
  };

  const externals = (() => {
    switch (options.target) {
      case 'var':
      case 'assign':
        return undefined;
      default:
        return Object.assign(
          ...Object.keys(pkg.dependencies).map(key => ({
            [key]: `${options.target} ${key}`,
          })),
        );
    }
  })();

  return {
    mode: options.mode,
    devtool: options.devtool,
    entry: SRC_PATH,
    output: {
      library: 'CmsUi',
      libraryTarget: options.target,
      path: OUTPUT_PATH,
      filename: OUTPUT_FILENAME,
    },
    externals,
    resolve: {
      modules: ['node_modules'],
      extensions: ['.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          enforce: 'pre',
          include: SRC_PATH,
          loader: 'eslint-loader',
        },
        {
          test: /\.(js|jsx)$/,
          include: SRC_PATH,
          loader: 'babel-loader',
        },
        {
          test: /\.(css|s[ac]ss)$/,
          exclude: /\.module\.(css|s[ac]ss)$/,
          use: [
            {
              loader: 'style-loader',
              options: styleLoaderOptions,
            },
            {
              loader: 'css-loader',
              options: cssLoaderOptions,
            },
            {
              loader: 'postcss-loader',
              options: postcssLoaderOptions,
            },
            {
              loader: 'sass-loader',
              options: sassLoaderOptions,
            },
          ],
        },
        {
          test: /\.module\.(css|s[ac]ss)$/,
          use: [
            {
              loader: 'style-loader',
              options: styleLoaderOptions,
            },
            {
              loader: 'css-loader',
              options: {
                ...cssLoaderOptions,
                importLoaders: 2,
                modules: true,
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
              options: postcssLoaderOptions,
            },
            {
              loader: 'sass-loader',
              options: sassLoaderOptions,
            },
          ],
        },
      ],
    },
    plugins: [
      ...(options.plugins || []),
    ],
    performance: {
      hints: false,
    },
    stats: isProduction ? 'normal' : 'minimal',
  };
};
