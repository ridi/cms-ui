const path = require('path');
const pkg = require('./package.json');

process.env.NODE_ENV = 'production';

const SRC_PATH = path.resolve(__dirname, 'src');
const OUTPUT_PATH = path.resolve(__dirname, 'lib');
const OUTPUT_FILENAME = 'cms-ui.js';

const styleLoaderOptions = {};

const cssLoaderOptions = {
  minimize: true,
};

const postcssLoaderOptions = {
  ident: 'postcss',
  plugins: () => [
    require('postcss-import')(),
    require('postcss-cssnext')(),
  ],
};

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: SRC_PATH,
  output: {
    library: undefined,
    libraryTarget: 'commonjs',
    path: OUTPUT_PATH,
    filename: OUTPUT_FILENAME,
  },
  externals: Object.assign(
    ...Object.keys(pkg.dependencies).map(key => ({
      [key]: `commonjs ${key}`,
    })),
  ),
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
        test: /\.css$/,
        exclude: /\.module\.css$/,
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
        ],
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: styleLoaderOptions,
          },
          {
            loader: 'css-loader',
            options: {
              ...cssLoaderOptions,
              importLoaders: 1,
              modules: true,
              localIdentName: '[local]___[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: postcssLoaderOptions,
          },
        ],
      },
    ],
  },
};
