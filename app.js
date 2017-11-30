'use strict'
const LED = require('./LED')
const { run } = require('./')

const rnd = (min, max) => Math.floor(Math.random() * (max - min)) + min

const sample = n => function * (xs) {
  let ys = xs.slice(0)
  let len = xs.length
  while (n > 0 && len > 0) {
    let i = (rnd() * len) >> 0
    yield ys.splice(i, 1)[0]
    n--
    len--
  }
}

const shuffle = xs => Array.from(sample(Infinity)(xs))

const leds = [0, 1, 2, 3, 6, 7, 11, 12, 13, 14]
  .map(pin => new LED(pin))

const app = () => run(rnd(0, leds.length))(shuffle(leds))

setInterval(app, 10000)
