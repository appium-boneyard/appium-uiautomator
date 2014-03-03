'use strict';

var path = require('path');

module.exports = {
  logger: require('./logger'),
  UiAutomator: require('./uiautomator'),
  bootstrapJar: path.resolve(__dirname, '..', 'bootstrap', 'bin', 'AppiumBootstrap.jar')
};
