'use strict';

const assert = require('assert');
const cp = require('child_process');

const mm = require('mm');

const detector = require('../index');

describe('index.test.js', () => {
  let hasPython = [];

  beforeEach(() => {
    detector.clearCache();
    hasPython = [];
    mm(cp, 'spawnSync', command => {
      if (hasPython.includes(command)) {
        return {
          status: 0,
          stdout: '',
          stderr: '',
        };
      }

      return {
        status: 1,
      };
    });
  });

  afterEach(() => {
    mm.restore();
    detector.clearCache();
  });

  const pythons = [{
    hit: 'python3',
    has: [ 'python3' ],
  }, {
    hit: 'python',
    has: [ 'python' ],
  }, {
    hit: 'python2',
    has: [ 'python2' ],
  }, {
    has: [ 'python3', 'python2' ],
    hit: 'python3',
  }, {
    has: [ 'python3', 'python' ],
    hit: 'python3',
  }, {
    has: [ 'python2', 'python' ],
    hit: 'python',
  }, {
    has: [ 'python', 'python2', 'python3' ],
    hit: 'python3',
  }, {
    has: [ 'python:)' ],
    hit: null,
  }];

  pythons.forEach(({ has, hit }) => {
    it(`should find ${hit} with ${has.join(', ')}`, () => {
      hasPython = has;

      if (hit) {
        assert.strictEqual(detector.detect(), hit);
      } else {
        assert.throws(() => detector.detect(), /^Error: Python interpreter not found$/);
      }
    });
  });
});
