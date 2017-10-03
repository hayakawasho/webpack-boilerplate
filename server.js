const browserSync = require('browser-sync');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config.dev');
const bundler = webpack(webpackConfig);

browserSync({
  server: {
    baseDir: 'public',
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: {
          colors: true
        },
        // for other settings see
        // http://webpack.github.io/docs/webpack-dev-middleware.html
      }),
      // bundler should be the same as above
      webpackHotMiddleware(bundler)
    ]
  },
  // no need to watch '*.js' here, webpack will take care of it for us,
  // including full page reloads if HMR won't work
  files: [
    'public/**/*.html'
  ]
});


