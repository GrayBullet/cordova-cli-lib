var util = require('./util');

/**
 * Create cordova command arguments builder.
 * @param {String} optCommand Cordova command, like 'build'.
 * @return {Object} Arguments builder.
 */
function argsBuilder(optCommand) {
  const args = [];

  if (optCommand) {
    args.push(optCommand);
  }

  return {
    append: function (optStrings) {
      var strings = util.makeArray(optStrings);

      args.push.apply(args, strings);

      return this;
    },

    toArray: function () {
      return args.slice();
    }
  };
}

module.exports = argsBuilder;
