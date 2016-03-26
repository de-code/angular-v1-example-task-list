var path = require('path');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    files: [
      // using a single bundle is more performant (@see karma-webpack, "Alternative usage")
      'spec/tests.webpack.js'
    ],
    frameworks: [
      'jasmine'
    ],
    preprocessors: {
      'spec/tests.webpack.js': ['webpack', 'sourcemap'],
    },
    reporters: ['progress'],
    webpack: {
      cache: true,
      devtool: 'inline-source-map',
      module: {
        loaders: [{
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          loader: 'babel-loader',
          query: {
            presets: ['es2015'],
            cacheDirectory: true
          }
        }],
      },
    },
  });
};