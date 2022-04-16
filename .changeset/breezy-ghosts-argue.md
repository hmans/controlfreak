---
"@hmans/controlfreak": minor
---

**Breaking Change:** Controllers now provide `addDevice` and `removeDevice` functions, and devices need to be explicitly instantiated and added to controllers:

```ts
export const controller = new Controller()

const keyboard = new KeyboardDevice()
const gamepad = new GamepadDevice()

controller.addDevice(keyboard)
controller.addDevice(gamepad)
```
