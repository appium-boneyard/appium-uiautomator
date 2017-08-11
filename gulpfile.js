"use strict";

const gulp = require('gulp');
const boilerplate = require('appium-gulp-plugins').boilerplate.use(gulp);

boilerplate({
  build: 'appium-uiautomator',
  e2eTest: { android: true },
  coverage: {
    files: ['./test/unit/**/*-specs.js', '!./test/functional/**', '!./test/fixtures/**'],
    verbose: true
  },
});
