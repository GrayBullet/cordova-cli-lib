var argsBuilder = require('../../../libs/gulp/args-builder');

describe('argsBuilder', function () {
  describe('all', function () {
    it('`cordova`', function () {
      var result = argsBuilder()
        .toArray();

      expect(result).toEqual([]);
    });

    it('`cordova build`', function () {
      var result = argsBuilder('build')
        .toArray();

      expect(result).toEqual(['build']);
    });

    it('`cordova run android ios --device --release`', function () {
      var result = argsBuilder('run')
        .append(['android', 'ios'])
        .append(['--device'])
        .append(['--release'])
        .toArray();

      expect(result).toEqual([
        'run',
        'android',
        'ios',
        '--device',
        '--release'
      ]);
    });

    it('`cordova run android ios --device --release` (use not array)', function () {
      var result = argsBuilder('run')
        .append(['android', 'ios'])
        .append('--device')
        .append('--release')
        .toArray();

      expect(result).toEqual([
        'run',
        'android',
        'ios',
        '--device',
        '--release'
      ]);
    });
  });
});
