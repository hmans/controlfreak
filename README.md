[![Version](https://img.shields.io/npm/v/@hmans/controlfreak)](https://www.npmjs.com/package/@hmans/controlfreak)
[![Downloads](https://img.shields.io/npm/dt/@hmans/controlfreak.svg)](https://www.npmjs.com/package/@hmans/controlfreak)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@hmans/controlfreak?label=bundle%20size)](https://bundlephobia.com/result?p=@hmans/controlfreak)

# CONTROL FREAK

## tl;dr

```ts
import { Device, GamepadDevice, KeyboardDevice, VectorControl } from "controlfreak"

export const devices = [new KeyboardDevice().start(), new GamepadDevice().start()]

let activeDevice: Device

for (const device of devices) {
  device.onActivity.on(() => (activeDevice = device))
}

export const stick = new VectorControl()
  .addStep(({ value }) => {
    if (activeDevice instanceof KeyboardDevice) {
      const { isPressed } = activeDevice
      value.x = isPressed("d") - isPressed("a")
      value.y = isPressed("w") - isPressed("s")
    }
  })
  .addStep(({ value }) => {
    if (activeDevice instanceof GamepadDevice) {
      const { device } = activeDevice

      if (device) {
        value.x = device.axes[0]
        value.y = -device.axes[1]
      }
    }
  })
  .addStep(({ value }) => {
    const length = Math.sqrt(value.x ** 2 + value.y ** 2) || 1
    value.x /= length
    value.y /= length
  })
```
