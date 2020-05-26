const webpack = require("webpack");
const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
    ...defaultConfig,
    module: {
      ...defaultConfig.module,
      rules: [
        ...defaultConfig.module.rules,
        {
          test: /\.(sc|sa|c)ss$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "css/[name].css"
              }
            },
            {
              loader: "extract-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 2
              }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                plugins: () => [postcssPresetEnv({browserslist: [
                  "defaults",
                  "last 2 versions",
                  "> 0.2%",
                  "not dead"
                ]})],
                sourceMap: 'inline'
              }
            },
                          {
                            loader: "sass-loader",
                            options: {sourceMap: true}
                          },
          ]
        }
      ]
    },
    plugins: [...defaultConfig.plugins]
  };