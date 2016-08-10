'use strict';

var fs = require('fs');
var promisify = require('es6-promisify');
var cordova = require('./libs/cordova-spawn');
var gulpCordova = require('./libs/gulp/gulp-cordova');
var optionsFactory = require('./libs/options-loader');
var cordovaArguments = require('./libs/cordova-arguments');

var writeFile = promisify(fs.writeFile);

/**
 * Create new .crodova-clirc.
 * @param {Object} rc Settings.
 * @return {Promise} Promise object.
 */
function createCordovaClirc(rc) {
  return writeFile('.cordova-clirc', JSON.stringify(rc), 'utf8');
}

/**
 * Run `cordova` command.
 * @param {Array} args Arguments.
 * @return {Promise} Promise object.
 */
function run(args) {
  var cliOptions = optionsFactory.load();

  var options = {
    cwd: cliOptions['cordova-root']
  };

  return cordova(args, options)
    .then(function (code) {
      // When return code is not 0, exit process.
      if (!code) {
        return;
      }

      process.exit(code);
    })
    .then(function () {
      if (cordovaArguments.isCreate(args)) {
        var root = cordovaArguments.getRoot(args);

        // Create .cordova-clirc and set `cordova-root`.
        return createCordovaClirc({'cordova-root': root});
      }
    });
}

module.exports = {
  run: run,
  gulp: gulpCordova
};
