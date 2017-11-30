const test = require('tape')
const sinon = require('sinon')

test('index', assert => {
  assert.test('index/toggleOne,', assert => {
    const { toggleOne } = require('./index.js')
    const toggle = sinon.spy()

    toggleOne(0)({ toggle })
    toggleOne(1)({ toggle })
    toggleOne(0)({ toggle })
    toggleOne(1)({ toggle })

    assert.equal(toggle.callCount, 4, 'toggle was called four times')
    assert.equal(toggle.getCall(0).args[0], 0, 'toggle was called with 0')
    assert.equal(toggle.getCall(1).args[0], 1, 'toggle was called with 1')
    assert.equal(toggle.getCall(2).args[0], 0, 'toggle was called with 0')
    assert.equal(toggle.getCall(3).args[0], 1, 'toggle was called with 1')

    assert.end()
  })

  assert.test('index/toggleAll,', assert => {
    const { toggleAll } = require('./index.js')
    const toggles = Array(4).fill(null)
      .map(() => ({ toggle: sinon.spy() }))

    toggleAll(0)(toggles)
    toggleAll(1)(toggles)
    toggleAll(0)(toggles)
    toggleAll(1)(toggles)

    toggles.map((toggle, i) => {
      assert.equal(toggle.toggle.callCount, 4, `toggle ${i} was called four times`)
      assert.equal(toggle.toggle.getCall(0).args[0], 0, `toggle ${i} was called with 0`)
      assert.equal(toggle.toggle.getCall(1).args[0], 1, `toggle ${i} was called with 1`)
      assert.equal(toggle.toggle.getCall(2).args[0], 0, `toggle ${i} was called with 0`)
      assert.equal(toggle.toggle.getCall(3).args[0], 1, `toggle ${i} was called with 1`)
    })

    assert.end()
  })

  assert.test('index/pick,', assert => {
    const { Tuple } = require('fantasy-tuples')
    const { pick } = require('./index.js')

    assert.deepEqual(Tuple([1], [2, 3]), pick([], [1, 2, 3]))

    assert.end()
  })

  assert.test('index/take', assert => {
    const { Tuple } = require('fantasy-tuples')
    const { take } = require('./index.js')

    assert.deepEqual(Tuple([], [1, 2, 3]), take(0)(Tuple([], [1, 2, 3])))
    assert.deepEqual(Tuple([1], [2, 3]), take(1)(Tuple([], [1, 2, 3])))
    assert.deepEqual(Tuple([1, 2], [3]), take(2)(Tuple([], [1, 2, 3])))
    assert.deepEqual(Tuple([1, 2, 3], []), take(3)(Tuple([], [1, 2, 3])))
    assert.deepEqual(Tuple([1, 2, 3], []), take(4)(Tuple([], [1, 2, 3])))

    assert.end()
  })

  assert.test('index/run', assert => {
    const { run } = require('./index.js')

    const leds = Array(3).fill(null)
      .map(() => ({ toggle: sinon.spy(function () { return this }) }))

    run(0)(leds)
    assert.equal(leds[0].toggle.callCount, 1, 'toggle 0 was toggled once')
    assert.equal(leds[0].toggle.getCall(0).args[0], 0, 'toggle 0 was turned off')

    assert.equal(leds[1].toggle.callCount, 1, 'toggle 1 was toggled once')
    assert.equal(leds[1].toggle.getCall(0).args[0], 0, 'toggle 1 was turned off')

    assert.equal(leds[2].toggle.callCount, 1, 'toggle 2 was toggled once')
    assert.equal(leds[2].toggle.getCall(0).args[0], 0, 'toggle 2 was turned off')

    leds.map(led => led.toggle.reset())

    run(1)(leds)
    assert.equal(leds[0].toggle.callCount, 1, 'toggle 0 was toggled once')
    assert.equal(leds[0].toggle.getCall(0).args[0], 1, 'toggle 0 was turned on')

    assert.equal(leds[1].toggle.callCount, 1, 'toggle 1 was toggled once')
    assert.equal(leds[1].toggle.getCall(0).args[0], 0, 'toggle 1 was turned off')

    assert.equal(leds[2].toggle.callCount, 1, 'toggle 2 was toggled once')
    assert.equal(leds[2].toggle.getCall(0).args[0], 0, 'toggle 2 was turned off')

    leds.map(led => led.toggle.reset())

    run(2)(leds)
    assert.equal(leds[0].toggle.callCount, 1, 'toggle 0 was toggled once')
    assert.equal(leds[0].toggle.getCall(0).args[0], 1, 'toggle 0 was turned on')

    assert.equal(leds[1].toggle.callCount, 1, 'toggle 1 was toggled once')
    assert.equal(leds[1].toggle.getCall(0).args[0], 1, 'toggle 1 was turned on')

    assert.equal(leds[2].toggle.callCount, 1, 'toggle 2 was toggled once')
    assert.equal(leds[2].toggle.getCall(0).args[0], 0, 'toggle 2 was turned off')

    leds.map(led => led.toggle.reset())

    run(3)(leds)
    assert.equal(leds[0].toggle.callCount, 1, 'toggle 0 was toggled once')
    assert.equal(leds[0].toggle.getCall(0).args[0], 1, 'toggle 0 was turned on')

    assert.equal(leds[1].toggle.callCount, 1, 'toggle 1 was toggled once')
    assert.equal(leds[1].toggle.getCall(0).args[0], 1, 'toggle 1 was turned on')

    assert.equal(leds[2].toggle.callCount, 1, 'toggle 2 was toggled once')
    assert.equal(leds[2].toggle.getCall(0).args[0], 1, 'toggle 2 was turned on')

    leds.map(led => led.toggle.reset())

    assert.end()
  })

  assert.end()
})
