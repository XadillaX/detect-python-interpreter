'use strict';

const assert = require('assert');
const cp = require('child_process');

const detector = require('../');

function hasCommand(name) {
  let buf;
  try {
    buf = cp.execSync(`which ${name}`);
  } catch (e) {
    return false;
  }

  return buf.length ? name : false;
}

describe('realworld.test.js', () => {
  let pythonStandard;
  if (hasCommand('python3')) {
    pythonStandard = 'python3';
  } else if (hasCommand('python')) {
    pythonStandard = 'python';
  } else if (hasCommand('python2')) {
    pythonStandard = 'python2';
  } else {
    pythonStandard = null;
  }

  it(pythonStandard ?
    `should detect ${pythonStandard} in real world` :
    'should throw error in real world', () => {
    if (pythonStandard) {
      assert.strictEqual(detector.detect(), pythonStandard);
    } else {
      assert.throws(() => {
        detector.detect();
      }, /^Python interpreter not found$/);
    }
  });
});
