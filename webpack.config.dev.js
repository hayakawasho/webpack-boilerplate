const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(baseConfig, {
  devtool: 'inline-source-map',
  cache: true,
	module: {
	  rules: [
		{
      test: /\.(css|sass|scss)$/,
      use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader', options: { sourceMap: true } },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              sourceMapContents: true,
              plugins: () => [
                require("autoprefixer")({ browsers: ["> 5%", "last 3 versions", "not ie < 9"] }),
                require("postcss-calc"),
                require("postcss-color-function"),
                require("postcss-selector-matches"),
                require("postcss-selector-not"),
                require("postcss-will-change"),
                require("postcss-flexbugs-fixes"),
                require("css-mqpacker"),
              ]
            }
          },
          { loader: 'sass-loader', options: { sourceMap: true } },
         ],
			})),
    },
		],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});

