const compose = (...fns) => fns.reduce((fns, fn) => (...args) => fns(fn(...args)), x => x)

const map = fn => f => f.map(fn)

const dimap = (left, right) => t => t.dimap(left, right)

const uncurry = f => t => t.uncurry(f)

module.exports = {
  compose,
  dimap,
  map,
  uncurry
}
