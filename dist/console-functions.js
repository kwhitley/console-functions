'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var ProgressBar = _interopDefault(require('progress-barjs'));
var humanizeDuration = _interopDefault(require('humanize-duration'));
require('colors');

var progressDraw = function progressDraw(bar, stream) {
  var percent = bar.counter / bar.total;
  var percentStr = Math.round(percent * 100) + '%';
  var on = bar.counter + ' of ' + bar.total;
  var elapsed = new Date().valueOf() - bar.timer;
  var eta = 1 / percent * elapsed - elapsed;
  var str = '\r' + bar.defaultFormats('bar') + percentStr + ' [' + on + '] ';
  if (Math.round(percent * 1000) < 1000) {
    str += '\x1b[0;33m' + humanizeDuration(eta, { round: true, delimiter: ' and ', largest: 2 }) + ' remaining...              \b\b\b\b\b\b\b\b\b\b\b\b\b\b';
  } else {
    str += '\x1b[0;32m' + humanizeDuration(elapsed, { largest: 2, delimiter: ' and ' }) + '                                ';
  }

  str += '\x1b[0;37m';

  stream.write(str); //show
};

var progress = {
  bar: null,
  create: function create(total) {
    if (!this.bar) {
      this.bar = ProgressBar({
        total: total,
        show: {
          active: {
            date: true,
            percent: true,
            count: true
          },
          bar: {
            color: '\x1b[0;37m',
            completed: '#',
            incompleted: '.',
            length: 40
          }
        }
      }, progressDraw);
    } else {
      this.bar.setTotal(total).reset();
    }
  },
  tick: function tick() {
    return this.bar.tick();
  }
};

console.write = process.stdout.write.bind(process.stdout);

console.tally = function (value, label) {
  console.log('\x1b[0;32m' + value + '\x1b[0;37m ' + label);
};

console.header = function (label) {
  process.stdout.write('\n' + label.bold.white + '\n');
};

console.task = function (label) {
  process.stdout.write(label + '... ');
};

console.complete = function () {
  var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'OK';
  process.stdout.write(message.green + '\n');
};

console.incomplete = function (message) {
  process.stdout.write('FAIL'.red + '\n');
  if (message) {
    console.log(message.yellow + '\n');
  }
};

console.warn = function (message) {
  console.log(message.yellow);
};

console.error = function () {
  var _console;

  for (var _len = arguments.length, message = Array(_len), _key = 0; _key < _len; _key++) {
    message[_key] = arguments[_key];
  }

  return (_console = console).log.apply(_console, ['ERROR:'.red].concat(message));
};

var index = {
  progress: progress
};

module.exports = index;
