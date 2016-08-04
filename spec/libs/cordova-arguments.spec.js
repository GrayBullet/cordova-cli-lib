var cordovaArguments = require('../../libs/cordova-arguments');

describe('cordovaArguments', function () {
  describe('isCreate', function () {
    it('`cordova create foo bar` is create', function () {
      var result = cordovaArguments.isCreate(['create', 'foo', 'bar']);

      expect(result).toBeTruthy();
    });

    it('`cordova CREATE foo bar` is not create', function () {
      var result = cordovaArguments.isCreate(['CREATE', 'foo', 'bar']);

      expect(result).toBeFalsy();
    });

    it('`cordova help create` is not create', function () {
      var result = cordovaArguments.isCreate(['help', 'create']);

      expect(result).toBeFalsy();
    });

    it('`cordova create help` is create', function () {
      var result = cordovaArguments.isCreate(['create', 'help']);

      expect(result).toBeTruthy();
    });

    it('`cordova create --help` is not create', function () {
      var result = cordovaArguments.isCreate(['create', '--help']);

      expect(result).toBeFalsy();
    });

    it('`cordova create -h` is not create', function () {
      var result = cordovaArguments.isCreate(['create', '-h']);

      expect(result).toBeFalsy();
    });

    it('`cordova create --version` is not create', function () {
      var result = cordovaArguments.isCreate(['create', '--version']);

      expect(result).toBeFalsy();
    });

    it('`cordova create -v` is not create', function () {
      var result = cordovaArguments.isCreate(['create', '-v']);

      expect(result).toBeFalsy();
    });

    it('`cordova --help create` is not create', function () {
      var result = cordovaArguments.isCreate(['--help', 'create']);

      expect(result).toBeFalsy();
    });

    it('`cordova -h create` is not create', function () {
      var result = cordovaArguments.isCreate(['-h', 'create']);

      expect(result).toBeFalsy();
    });

    it('`cordova --verbose create abc` is create', function () {
      var result = cordovaArguments.isCreate(['--verbose', 'create', 'abc']);

      expect(result).toBeTruthy();
    });

    it('`cordova -d create abc` is create', function () {
      var result = cordovaArguments.isCreate(['-d', 'create', 'abc']);

      expect(result).toBeTruthy();
    });

    it('`cordova --arg1 -a create abc` is create', function () {
      var result = cordovaArguments.isCreate(['--arg1', '-a', 'create', 'abc']);

      expect(result).toBeTruthy();
    });

    it('`cordova --create --arg1 -create` is not create', function () {
      var result = cordovaArguments.isCreate(['--create', '--arg1', '-create']);

      expect(result).toBeFalsy();
    });
  });

  describe('getRoot', function () {
    it('`cordova create foo` is `foo', function () {
      var result = cordovaArguments.getRoot(['create', 'foo']);

      expect(result).toEqual('foo');
    });

    it('`cordova create .` is `.', function () {
      var result = cordovaArguments.getRoot(['create', '.']);

      expect(result).toEqual('.');
    });

    it('`cordova --verbose create bar` is `bar', function () {
      var result = cordovaArguments.getRoot(['--verbose', 'create', 'bar']);

      expect(result).toEqual('bar');
    });

    it('`cordova create --verbose bar` is `bar', function () {
      var result = cordovaArguments.getRoot(['create', '-d', 'bar']);

      expect(result).toEqual('bar');
    });
  });
});
