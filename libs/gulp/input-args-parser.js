var minimist = require('minimist');
var _ = require('underscore');
var util = require('./util');

/**
 * Flatten comma separated list.
 * @param {Array.<String>} list Array.
 * @return {Array.<String>} Flatten array.
 */
function flatten(list) {
  return _.chain(list)
    .map(function (item) {
      return item.split(',').map(function (p) {
        return p.trim();
      });
    })
    .flatten()
    .value();
}

/**
 * Get command line arguments ignore node.
 * @return {Array.<String>} Command line arguments.
 */
function getProcessArgs() {
  return process.argv.slice(2);
}

/**
 * Get parser from minimist options.
 * @param {Object} [optOptions] Options.
 * @return {Object} Parser.
 */
function fromOptions(optOptions) {
  var options = optOptions || minimist(getProcessArgs());

  return {
    platforms: function () {
      return flatten(util.makeArray(options['cordova-platforms']));
    },

    device: function () {
      switch (options['cordova-device']) {
        case 'emulator':
          return ['--emulator'];

        case 'device':
          return ['--device'];

        default:
          return [];
      }
    },

    build: function () {
      switch (options['cordova-build']) {
        case 'debug':
          return ['--debug'];

        case 'release':
          return ['--release'];

        default:
          return [];
      }
    },

    target: function () {
      var target = options['cordova-target'];
      if (target) {
        return ['--target=' + target];
      }

      return [];
    }
  };
}

/**
 * Get parser from command line arguments.
 * @param {Array.<String>} [optArgs] Command line arguments.
 * @return {Object} Parser.
 */
function fromArgs(optArgs) {
  var args = optArgs || getProcessArgs();

  return fromOptions(minimist(args));
}

/**
 * Wrapper fromOptions.
 * @param {Object} [optOptions] Options.
 * @return {Object} Parser.
 */
function inputArgsParser(optOptions) {
  return fromOptions(optOptions);
}

inputArgsParser.fromOptions = fromOptions;
inputArgsParser.fromArgs = fromArgs;

module.exports = inputArgsParser;
