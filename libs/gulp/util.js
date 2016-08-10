/**
 * Make array force.
 * @param {*} value Array or String or Undefined.
 * @return {Array.<String>} Array.
 */
function makeArray(value) {
  // No arguments.
  if (!value) {
    return [];
  }

  // Is Array.
  if (value instanceof Array) {
    return value;
  }

  // Not Array.
  return [value];
}

module.exports = {
  makeArray: makeArray
};
