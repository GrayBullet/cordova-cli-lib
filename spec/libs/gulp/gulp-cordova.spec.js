var gulpCordova = require('../../../libs/gulp/gulp-cordova');
var cordova = gulpCordova();

describe('gulpCordova', function () {
  describe('buildArgs', function () {
    it('Pattern A', function () {
      var result = cordova.buildArgs('build', [
        '--cordova-platforms=android',
        '--cordova-build=release',
        '--cordova-device=emulator',
        '--cordova-platforms=ios'
      ]);

      expect(result).toEqual([
        'build',
        'android',
        'ios',
        '--emulator',
        '--release'
      ]);
    });
  });
});
