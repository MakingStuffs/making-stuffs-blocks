const webpack = require("webpack");
const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  ...defaultConfig,
  entry: {
    index: './src/index.js',
    bundle: './src/js/bundle.js'
  },
  module: {
    ...defaultConfig.module,
    rules: [
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "css/[name].css",
            },
          },
          {
            loader: "extract-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 3,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [postcssPresetEnv()],
              sourceMap: "inline",
            },
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true },
          },
        ],
      },
      ...defaultConfig.module.rules,
    ],
  },
  plugins: [...defaultConfig.plugins],
};
