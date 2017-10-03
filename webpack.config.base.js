const webpack = require('webpack');
const path = require('path');
const env = process.env.NODE_ENV || 'development';
const conf = require('./config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpackConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: [
      'webpack-hot-middleware/client',
      'webpack/hot/dev-server',
      './main.js'
    ],
  },
	output: {
		path: path.resolve(__dirname, 'public'), // Output directory
    filename: conf.path.js + '[name].js',
    publicPath: '/', // avoid requesting server route instead of client route when hitting refresh /Cannot GET /route
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
	module: {
	  rules: [
	  {
		  test: /\.js$/,
		  use: [{
        loader: 'babel-loader',
        options: {
          'presets': [['es2015', { 'modules': false }]]
       }
			}],
			exclude: /node_modules/,
		},
		{
			test: /\.js$/,
			use: [{
				loader: 'eslint-loader',
				options: {fix: true, configFile: '.eslintrc', failOnError: false },
			}],
			exclude: /(node_modules)/,
		},
		{
      test: /\.(jpg|png|gif|svg)$/,
      include: [
        path.resolve(__dirname, 'src')
      ],
			use: [{
        loader: 'url-loader',
        options: {
           // Convert images < 10k to base64 strings
          limit: 10240,
          name: '[path][name].[ext]'
        }
			}]
    },
		{
      test: /\.(eot|otf|ttf|woff2?|svg)(\?.+)?$/,
      include: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'src/assets/fonts')
      ],
			use: [{
				loader: 'file-loader',
        options: {
          publicPath: '',
          outputPath: '/assets/fonts/',
          name: '[name].[ext]'
        }
			}]
    },
		],
  },
	resolve: {
		extensions: ['.js', '.css', '.scss'],
		modules: [
      'node_modules'
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/styles/[name].css',
      disable: false,
      allChunks: true
    }),
		//new webpack.optimize.CommonsChunkPlugin({
      //name: 'commons',
      //filename: 'commons.js',
      //chunks: ['app', ''],
      //minChunks: 2,
    //}),
  ],
};

module.exports = webpackConfig;
