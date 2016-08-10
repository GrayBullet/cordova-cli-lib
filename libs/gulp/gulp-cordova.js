var inputArgsParser = require('./input-args-parser');
var argsBuilder = require('./args-builder');

/**
 * Build cordova arguments from command line arguments.
 * @param {String} [optCommand] Cordova command.
 * @param {Array.<String>} [optArgs] Command line arguments.
 * @return {Array.<String>} Cordova arguments.
 */
function buildArgs(optCommand, optArgs) {
  var input = inputArgsParser.fromArgs(optArgs);
  return argsBuilder(optCommand)
    .append(input.platforms())
    .append(input.device())
    .append(input.build())
    .append(input.target())
    .toArray();
}

/**
 * Create gulp-cordova instance.
 * @return {Object} gulp-cordova instance.
 */
function gulpCordova() {
  var cli = this;

  return {
    run: function (optCommand) {
      return cli.run(buildArgs(optCommand));
    },
    buildArgs: buildArgs
  };
}

module.exports = gulpCordova;
