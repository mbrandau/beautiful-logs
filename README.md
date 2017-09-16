# beautiful-logs

[![Build Status](https://img.shields.io/travis/mbrandau/beautiful-logs.svg)](https://travis-ci.org/mbrandau/beautiful-logs) [![David](https://img.shields.io/david/mbrandau/beautiful-logs.svg)](https://david-dm.org/mbrandau/beautiful-logs) [![Coveralls](https://img.shields.io/coveralls/mbrandau/beautiful-logs.svg)](https://coveralls.io/github/mbrandau/beautiful-logs) [![npm](https://img.shields.io/npm/v/beautiful-logs.svg)](https://www.npmjs.com/package/beautiful-logs) [![npm](https://img.shields.io/npm/dt/beautiful-logs.svg)](https://www.npmjs.com/package/beautiful-logs) [![GitHub issues](https://img.shields.io/github/issues/mbrandau/beautiful-logs.svg)](https://github.com/mbrandau/beautiful-logs/issues)

Generate more beautiful-logs

## Usage

Install and save the package to your project `npm i --save beautiful-logs`

```js
const log = require('beautiful-logs')();

log.trace('Hello World');
log.debug('Starting up...');
log.info('Things just got started!');
log.warn('It\'s getting hot in here...');
log.err('Damn! It\'s burning!');
log.fatal('Shutting down... :(');
```
