/**
 * Is args help?
 * @param {Array} args Arguments.
 * @return {boolean} Is help?
 */
function isHelp(args) {
  return args.some(function (arg) {
    return /^(-h|--help)$/.test(arg);
  });
}

/**
 * Is args version?
 * @param {Array} args Arguments.
 * @return {boolean} Is version?
 */
function isVersion(args) {
  return args.some(function (arg) {
    return /^(-v|--version)$/.test(arg);
  });
}

/**
 * Remove `-` and `--` options.
 * @param {Array} args Arguments.
 * @return {Array.<String>} Arguments.
 */
function removeOptions(args) {
  return args.filter(function (arg) {
    return arg && arg[0] !== '-';
  });
}

/**
 * Is `create` command?
 * @param {Array} args Arguments.
 * @return {boolean} Is `create`?
 */
function isCreate(args) {
  if (args.length <= 0) {
    return false;
  }

  if (isHelp(args) || isVersion(args)) {
    return false;
  }

  var temp = removeOptions(args);
  if (temp.length <= 0) {
    return false;
  }

  return temp[0] === 'create';
}

/**
 * Get `cordova create`'s root.
 * @param {Array} args Arguments.
 * @return {String} Cordova root.
 */
function getRoot(args) {
  var temp = removeOptions(args);
  return temp.length > 0 ? temp[1] : undefined;
}

module.exports = {
  isCreate: isCreate,
  getRoot: getRoot
};
