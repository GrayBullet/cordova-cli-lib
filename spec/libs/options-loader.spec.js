'use strict';

var optionsLoader = require('../../libs/options-loader');

/**
 * Build return obj function.
 * @param {Object} obj Object.
 * @return {Function} Return obj function.
 */
function buildFunction(obj) {
  return function () {
    return obj;
  };
}

describe('options-loader', function () {
  describe('load', function () {
    it('load from two sources', function () {
      var result = optionsLoader.load([
        {load: buildFunction({a: 1, b: 2})},
        {load: buildFunction({b: 3, c: 4})}
      ]);

      expect(result).toEqual({
        a: 1,
        b: 3,
        c: 4
      });
    });

    it('return value is copy', function () {
      var obj = {a: 1};

      var result = optionsLoader.load([{load: buildFunction(obj)}]);

      expect(result).not.toBe(obj);
    });
  });
});
