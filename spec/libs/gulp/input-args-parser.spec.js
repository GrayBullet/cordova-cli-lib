var inputArgsParser = require('../../../libs/gulp/input-args-parser');

describe('inputArgsParser', function () {
  describe('platforms', function () {
    it('no platforms', function () {
      var result = inputArgsParser.fromArgs([]).platforms();

      expect(result).toEqual([]);
    });

    it('Single platform', function () {
      var result = inputArgsParser.fromArgs(['--cordova-platforms=android']).platforms();

      expect(result).toEqual(['android']);
    });

    it('Multiple platform', function () {
      var result = inputArgsParser.fromArgs(['--cordova-platforms=android', '--cordova-platforms=ios']).platforms();

      expect(result).toEqual(['android', 'ios']);
    });

    it('Other format A (no equal)', function () {
      var result = inputArgsParser.fromArgs(['--cordova-platforms', 'android', '--cordova-platforms=ios']).platforms();

      expect(result).toEqual(['android', 'ios']);
    });

    it('Other format B (comma)', function () {
      var result = inputArgsParser.fromArgs(['--cordova-platforms', 'android,ios']).platforms();

      expect(result).toEqual(['android', 'ios']);
    });

    it('Other format B (comma and equal)', function () {
      var result = inputArgsParser.fromArgs(['--cordova-platforms=android,ios']).platforms();

      expect(result).toEqual(['android', 'ios']);
    });

    it('platforms is none', function () {
      var result = inputArgsParser.fromArgs(['--other']).platforms();

      expect(result).toEqual([]);
    });
  });

  describe('device', function () {
    it('device is emulator', function () {
      var result = inputArgsParser.fromArgs(['--cordova-device=emulator']).device();

      expect(result).toEqual(['--emulator']);
    });

    it('device is device', function () {
      var result = inputArgsParser.fromArgs(['--cordova-device=device']).device();

      expect(result).toEqual(['--device']);
    });

    it('device is illegal', function () {
      var result = inputArgsParser.fromArgs(['--cordova-device=illegal']).device();

      expect(result).toEqual([]);
    });

    it('device is none', function () {
      var result = inputArgsParser.fromArgs(['--other']).device();

      expect(result).toEqual([]);
    });
  });

  describe('build', function () {
    it('build is debug', function () {
      var result = inputArgsParser.fromArgs(['--cordova-build=debug']).build();

      expect(result).toEqual(['--debug']);
    });

    it('build is release', function () {
      var result = inputArgsParser.fromArgs(['--cordova-build=release']).build();

      expect(result).toEqual(['--release']);
    });

    it('build is illegal', function () {
      var result = inputArgsParser.fromArgs(['--cordova-build=illegal']).build();

      expect(result).toEqual([]);
    });

    it('build is none', function () {
      var result = inputArgsParser.fromArgs(['--other']).build();

      expect(result).toEqual([]);
    });
  });

  describe('target', function () {
    it('target is emulator1', function () {
      var result = inputArgsParser.fromArgs(['--cordova-target=emulator1']).target();

      expect(result).toEqual(['--target=emulator1']);
    });

    it('target is none', function () {
      var result = inputArgsParser.fromArgs(['--other']).target();

      expect(result).toEqual([]);
    });
  });

  describe('all', function () {
    it('all', function () {
      var args = [
        '--cordova-build=release',
        '--cordova-platforms=ios',
        '--cordova-device=emulator',
        '--cordova-platforms=android',
        '--cordova-target=emulator1'
      ];
      var input = inputArgsParser.fromArgs(args);

      expect(input.platforms()).toEqual(['ios', 'android']);
      expect(input.device()).toEqual(['--emulator']);
      expect(input.build()).toEqual(['--release']);
      expect(input.target()).toEqual(['--target=emulator1']);
    });
  });
});
