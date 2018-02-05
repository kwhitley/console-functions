import progress from './progress-bar'
import colors from 'colors'

console.write = process.stdout.write.bind(process.stdout)

console.tally = (value, label) => {
  console.log('\x1b[0;32m' + value + '\x1b[0;37m ' + label)
}

console.header = (label) => {
  process.stdout.write('\n' + label.bold.white + '\n')
}

console.task = (label) => {
  process.stdout.write((label + '... '))
}

console.complete = (message = 'OK', err) => {
  process.stdout.write(message.green + '\n')
}

console.incomplete = (message) => {
  process.stdout.write('FAIL'.red + '\n')
  if (message) {
    console.log(message.yellow + '\n')
  }
}

console.warn = (message) => {
  console.log(message.yellow)
}

console.error = (...message) => console.log('ERROR:'.red, ...message)


export default {
  progress
}
