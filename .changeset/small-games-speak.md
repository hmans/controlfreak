---
"@hmans/controlfreak": minor
---

**Breaking Change:** All of the device-specific steps have been moved into instance methods on devices themselves, and a `processors` object has been introduced to group processor-style steps:

```ts
const keyboard = new KeyboardDevice()
const gamepad = new GamepadDevice()

controller.addDevice(keyboard)
controller.addDevice(gamepad)

controller
  .addControl("move", VectorControl)
  .addStep(keyboard.compositeVector("KeyW", "KeyS", "KeyA", "KeyD"))
  .addStep(gamepad.axisVector(0, 1))
  .addStep(processors.clampVector(1))
```
