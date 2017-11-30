const { Tuple } = require('fantasy-tuples')
const { compose, dimap, map, uncurry } = require('./helpers')

const toggleOne = state => led => led.toggle(state)

const toggleAll = state => map(toggleOne(state))

const pick = (ls, rs) => Tuple(ls.concat(rs.slice(0, 1)), rs.slice(1))

const take = n => Array(n).fill(0)
  .map(() => uncurry(pick))
  .reduce((fns, fn) => (...args) => fns(fn(...args)), x => x)

const run = seed => leds => compose(
  dimap(toggleAll(1), toggleAll(0)),
  take(seed),
  leds => Tuple([], leds)
)(leds)

module.exports = {
  toggleOne,
  toggleAll,
  pick,
  take,
  run
}
