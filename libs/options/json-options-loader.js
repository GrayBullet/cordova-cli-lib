'use strict';

var fs = require('fs');

var loader = {
  load: function (optFilename) {
    var filename = optFilename || '.cordova-clirc';

    if (fs.existsSync(filename)) {
      return JSON.parse(fs.readFileSync(filename, 'utf-8'));
    }

    return undefined;
  }
};

module.exports = loader;
