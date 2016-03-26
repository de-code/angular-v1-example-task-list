'use strict';

require('babel-register')({
  presets: [ 'es2015' ]
});

exports.config = require('./e2e/protractor-config.js').default;
