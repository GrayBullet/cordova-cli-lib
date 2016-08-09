'use strict';

var os = require('os');
var spawn = require('child_process').spawn;
var path = require('path');
var _ = require('underscore');
var Promise = require('./promise');
var ProjectRootSearcher = require('./project-root-searcher');

/**
 * Execute cordova command.
 * @param {Array} args Command line arguments.
 * @param {Object} optOptions Options.
 * @return {Promise} Promise object.
 */
function cordova(args, optOptions) {
  var options = optOptions || {};

  return Promise.resolve()
    .then(function () {
      return getCmd(options);
    })
    .then(function (cmd) {
      return invoke(cmd, args, optOptions);
    });
}

/**
 * Execute command.
 * @param {String} cmd Execute command path.
 * @param {Array} args Command line arguments.
 * @param {Object} optOptions Options.
 * @return {Promise} Promise object.
 */
function invoke(cmd, args, optOptions) {
  return new Promise(function (resolve, reject) {
    var options = _.assign({}, {env: process.env, stdio: 'inherit'}, optOptions);

    try {
      spawn(cmd, args, options)
        .on('close', resolve);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Get project local `cordova` command path.
 * @return {Promise.<String>} Project local `cordova` command path.
 */
function getCmdFromSearcher() {
  return ProjectRootSearcher.search()
    .then(function (dir) {
      return path.join(dir.bin, getCmdName());
    });
}

/**
 * Get project local `cordova`command path.
 * From options or searcher.
 * @param {Object} options Options.
 * @return {Promise.<String>} Project local `cordova` commandpath.
 */
function getCmd(options) {
  if (options && options.cmd) {
    return Promise.resolve(options.cmd);
  }

  return getCmdFromSearcher();
}

/**
 * Get cordova command name.
 * @param {String} [optPlatform] Platform.
 * @return {String} 'cordova' or 'cordova.cmd'.
 */
function getCmdName(optPlatform) {
  var platform = optPlatform || os.platform();

  return platform === 'win32' ? 'cordova.cmd' : 'cordova';
}

cordova.getCmdName = getCmdName;

module.exports = cordova;
