'use strict';

var path = require('path');
var loader = require('../../../libs/options/json-options-loader');

describe('json-options-loader', function () {
  describe('load', function () {
    it('load from json file', function () {
      var options = loader.load(path.join(__dirname, '.cordova-clirc'));

      expect(options).toEqual({
        cwd: 'cordova',
        data: 'hoge'
      });
    });

    it('json file not exists', function () {
      var options = loader.load(path.join(__dirname, '.notexists'));

      expect(options).toBeUndefined();
    });
  });
});
