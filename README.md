# detect-python-interpreter

[![](https://img.shields.io/npm/v/detect-python-interpreter)](https://www.npmjs.org/package/detect-python-interpreter)
[![](https://img.shields.io/github/workflow/status/XadillaX/detect-python-interpreter/Node.js%20CI?event=push)](https://github.com/XadillaX/detect-python-interpreter)
[![](https://img.shields.io/coveralls/github/XadillaX/detect-python-interpreter/master)](https://coveralls.io/github/XadillaX/detect-python-interpreter)

Detect the executable python interpreter cmd in $PATH.

## Installation

```shell
$ npm install --save detect-python-interpreter
```

## Usage

```js
const { detect } = require('detect-python-interpreter');

const executable = detect();  // 'python', 'python2', 'python3' or throw an Error.
```

## Contribution

PRs and Issues are welcomed.
