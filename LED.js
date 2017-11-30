'use strict'
const Gpio = require('onoff').Gpio

module.exports = LED

function LED (pin) {
  if (!(this instanceof LED)) return new LED(pin)

  this.pin = pin
  this.led = new Gpio(this.pin, 'out')

  this.toggle(0)
}

LED.prototype.toggle = function toggle (state) {
  this.state = state
  this.led.writeSync(this.state)
  return this
}
