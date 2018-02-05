import ProgressBar from 'progress-barjs'
import humanizeDuration from 'humanize-duration'

const progressDraw = (bar, stream) => {
    let percent = bar.counter / bar.total
    let percentStr = Math.round(percent * 100) + '%'
    let on = bar.counter + ' of ' + bar.total
    let elapsed = new Date().valueOf() - bar.timer
    let eta = (1 / percent * elapsed) - elapsed
    let str = `\r${bar.defaultFormats('bar')}${percentStr} [${on}] `
    if (Math.round(percent * 1000) < 1000) {
      str += '\x1b[0;33m' + humanizeDuration(eta, { round: true, delimiter: ' and ', largest: 2 }) + ' remaining...              \b\b\b\b\b\b\b\b\b\b\b\b\b\b'
    } else {
      str += '\x1b[0;32m' + humanizeDuration(elapsed, { largest: 2, delimiter: ' and ' }) + '                                '
    }

    str += '\x1b[0;37m'

    stream.write(str); //show
}

export default {
  bar: null,
  create(total) {
    if (!this.bar) {
      this.bar = ProgressBar({
        total,
        show:{
          active: {
            date: true,
            percent: true,
            count: true
          },
          bar: {
            color: '\x1b[0;37m',
            completed:'#',
            incompleted: '.',
            length: 40
          }
        }
      }, progressDraw)
    } else {
      this.bar
        .setTotal(total)
        .reset()
    }
  },

  tick() {
    return this.bar.tick()
  }
}
