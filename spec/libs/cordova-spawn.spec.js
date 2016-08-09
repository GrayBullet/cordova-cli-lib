var cordova = require('../../libs/cordova-spawn');

describe('cordova', function () {
  describe('getCmdName', function () {
    it('`cordova` if platform is linux', function () {
      var result = cordova.getCmdName('linux');

      expect(result).toEqual('cordova');
    });

    it('`cordova` if platform is darwin', function () {
      var result = cordova.getCmdName('darwin');

      expect(result).toEqual('cordova');
    });

    it('`cordova.cmd` if platform is win32', function () {
      var result = cordova.getCmdName('win32');

      expect(result).toEqual('cordova.cmd');
    });
  });
});
