var chai = require('chai')
var expect = chai.expect

import { progress } from '../src/index'

describe('console functions', function() {
  console.header('test header')
  console.task('task')
  console.complete('custom message')

  progress.create(2)
  progress.tick()

  it('is an object', function() {
    expect(typeof cf).to.equal('object')
  })
})
