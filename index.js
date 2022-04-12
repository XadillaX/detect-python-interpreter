'use strict';

const cp = require('child_process');

let interpreter;

function doDetect() {
  const interpreterOptions = [ 'python3', 'python', 'python2' ];
  for (const opt of interpreterOptions) {
    const result = cp.spawnSync(opt, [ '--version' ], {
      encoding: 'utf-8',
    });

    if (result.status === 0) {
      return opt;
    }
  }
  return null;
}

exports.detect = function detect() {
  if (interpreter) {
    return interpreter;
  }

  interpreter = doDetect();
  if (!interpreter) {
    throw new Error('Python interpreter not found');
  }

  return interpreter;
};

exports.clearCache = function clearCache() {
  interpreter = null;
};
