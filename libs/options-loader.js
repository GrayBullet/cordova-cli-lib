'use strict';

var _ = require('underscore');

var builtinLoaders = [
  require('./options/default-options-loader'),
  require('./options/json-options-loader')
];

var loader = {
  load: function (optLoaders) {
    var loaders = optLoaders || builtinLoaders;

    var args = loaders.map(function (loader) {
      return loader.load();
    });
    args.unshift({});

    return _.assign.apply(_, args);
  }
};

module.exports = loader;
