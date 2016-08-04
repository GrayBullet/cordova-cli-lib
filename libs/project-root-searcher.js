var fs = require('fs');
var path = require('path');
var promisify = require('es6-promisify');
var Promise = require('./promise');

var stat = promisify(fs.stat);

/**
 * Project root search object.
 * @constructor
 */
function ProjectRootSearcher() {
}

ProjectRootSearcher.prototype.stat = function () {
  var args = Array.prototype.slice.apply(arguments);
  // noinspection JSUnresolvedFunction
  return stat.apply(null, args);
};

ProjectRootSearcher.prototype.exists = function () {
  var args = Array.prototype.slice.apply(arguments);
  return this.stat.apply(this, args)
    .then(function (stats) {
      return stats.isDirectory();
    })
    .catch(function (error) {
      if (error.code === 'ENOENT') {
        return false;
      }

      return Promise.reject(error);
    });
};

ProjectRootSearcher.prototype.search = function (optDir) {
  var dir = optDir || process.cwd();
  var that = this;

  return new Promise(function (resolve) {
    var nodeModules = path.join(dir, 'node_modules');
    return that.exists(nodeModules)
      .then(function (exists) {
        if (exists) {
          resolve({
            root: dir,
            nodeModules: nodeModules,
            bin: path.join(nodeModules, '.bin')
          });
          return;
        }

        var parent = path.dirname(dir);
        if (parent === dir) {
          // search finish if root directory;
          resolve();
          return;
        }

        resolve(that.search(parent));
      });
  });
};

ProjectRootSearcher.search = function (optDir) {
  return new ProjectRootSearcher().search(optDir);
};

module.exports = ProjectRootSearcher;
