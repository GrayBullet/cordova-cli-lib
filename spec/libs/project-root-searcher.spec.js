var Promise = require('../../libs/promise');
var ProjectRootSearcher = require('../../libs/project-root-searcher');

describe('ProjectRootSearcher', function () {
  var target;

  beforeEach(function () {
    target = new ProjectRootSearcher();
    spyOn(target, 'stat');
  });

  describe('search', function () {
    it('Find project root', function (done) {
      target.stat.and.callFake(function (dir) {
        return Promise.resolve({
          isDirectory: function () {
            return dir === '/aaa/node_modules';
          }
        });
      });

      target.search('/aaa/bbb/ccc')
        .then(function (result) {
          expect(result).toEqual({
            root: '/aaa',
            nodeModules: '/aaa/node_modules',
            bin: '/aaa/node_modules/.bin'
          });
        })
        .then(done);
    });

    it('Find project root (current is project root)', function (done) {
      target.stat.and.callFake(function (dir) {
        return Promise.resolve({
          isDirectory: function () {
            return dir === '/aaa/bbb/ccc/node_modules';
          }
        });
      });

      target.search('/aaa/bbb/ccc')
        .then(function (result) {
          expect(result).toEqual({
            root: '/aaa/bbb/ccc',
            nodeModules: '/aaa/bbb/ccc/node_modules',
            bin: '/aaa/bbb/ccc/node_modules/.bin'
          });
        })
        .then(done);
    });

    it('Cannot find project root', function (done) {
      target.stat.and.callFake(function () {
        return Promise.resolve({
          isDirectory: function () {
            return false;
          }
        });
      });

      target.search('/aaa/bbb/ccc')
        .then(function (result) {
          expect(result).toBeUndefined();
        })
        .then(done);
    });
  });
});
