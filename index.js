module.exports = init;

const chalk = require('chalk'),
  cliWidth = require('cli-width'),
  util = require('util'),
  firstSeperator = chalk.gray(' ┬ '),
  seperator = chalk.gray(' ─ '),
  middleSeperator = chalk.gray(' ├ '),
  lastSeperator = chalk.gray(' └ ');

const defaultInfoLevel = chalk.bgGreen('INFO') + ' ';

function fill(length, char) {
  if (length <= 0) return '';
  let s = char;
  for (var i = 1; i < length; i++) s += char;
  return s;
}

function init() {
  const levels = {
      'trace': chalk.magenta('TRACE'),
      'debug': chalk.bgMagenta('DEBUG'),
      'info': defaultInfoLevel,
      'warn': chalk.bgYellow('WARN') + ' ',
      'error': chalk.bold.red('ERROR'),
      'fatal': chalk.bgRed.bold('FATAL')
    },
    callbacks = [];

  function formatLevel(level) {
    return levels[level] || defaultInfoLevel;
  }

  function formatTime(date) {
    return date.toISOString();
  }

  var error = function(){
    return function(){
        let args = Array.prototype.slice.call(arguments);
        args.unshift('error');
        this.log.apply(this, args);
    }	
  }
  
  return {
    log: function log(level) {
      const date = new Date();
      const lf = formatLevel(level) + ' ',
        df = formatTime(date),
        spaces = fill(df.length, ' ');
      const msg = util.format.apply(this, Array.prototype.slice.call(arguments, 1));
      let event = {
        level: level,
        time: date,
        message: msg
      };
      for (let i = 0; i < callbacks.length; i++) {
        callbacks[i].call(this, event);
      }
      const splitMsg = msg.split('\n');
      for (var i = 0; i < splitMsg.length; i++) {
        let s = df + seperator;
        if (splitMsg.length > 1) {
          if (i == 0) s = df + firstSeperator;
          else if (i == splitMsg.length - 1) s = spaces + lastSeperator;
          else s = spaces + middleSeperator;
        }
        splitMsg[i] = lf + s + splitMsg[i];
      }
      const finalMsg = splitMsg.join('\n');
      console.log(finalMsg);
    },

    line: function line() {
      console.log(fill(cliWidth(), '─'));
    },
    emptyLine: function emptyLine() {
      console.log();
    },

    trace: function trace() {
      let args = Array.prototype.slice.call(arguments);
      args.unshift('trace');
      this.log.apply(this, args);
    },

    debug: function debug() {
      let args = Array.prototype.slice.call(arguments);
      args.unshift('debug');
      this.log.apply(this, args);
    },

    info: function info() {
      let args = Array.prototype.slice.call(arguments);
      args.unshift('info');
      this.log.apply(this, args);
    },

    warn: function warn() {
      let args = Array.prototype.slice.call(arguments);
      args.unshift('warn');
      this.log.apply(this, args);
    },

    err : error(),

    error:  error(),

    fatal: function fatal() {
      let args = Array.prototype.slice.call(arguments);
      args.unshift('fatal');
      this.log.apply(this, args);
    },

    addCallback: function addCallback(callback) {
      callbacks.push(callback);
    }
  };
}
