# @hmans/controlfreak

## 0.2.0

### Minor Changes

- 1daae22: The ControlFreak repository is now a monorepo, giving us some much-needed breathing room for a small demo app and the usual goodness of `preconstruct dev`. :D
- c8df83d: **Breaking Change:** Controllers now provide `addDevice` and `removeDevice` functions, and devices need to be explicitly instantiated and added to controllers:

  ```ts
  export const controller = new Controller()

  const keyboard = new KeyboardDevice()
  const gamepad = new GamepadDevice()

  controller.addDevice(keyboard)
  controller.addDevice(gamepad)
  ```

- 1c1d119: The Keyboard device's `isPressed` function now optionally accepts an array of keys to check. This allows step implementations for keyboard controls to support more than a single key per axis/input. For example:

  ```ts
  controller
    .addControl("move", VectorControl)
    .addStep(
      keyboard.compositeVector(
        ["KeyW", "ArrowUp"],
        ["KeyS", "ArrowDown"],
        ["KeyA", "ArrowLeft"],
        ["KeyD", "ArrowRight"]
      )
    )

  controller
    .addControl("fire", BooleanControl)
    .addStep(keyboard.whenKeyPressed(["Space", "Enter"]))
  ```

- 7b5e0ca: **Breaking Change:** all keyboard input now uses key codes, not key names. Please refer to [this list of supported values](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values).
- d2cfa41: Finally, we have changesets and a changelog!
- c8df83d: **Breaking Change:** All of the device-specific steps have been moved into instance methods on devices themselves, and a `processors` object has been introduced to group processor-style steps:

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

- c8df83d: This library now uses @hmans/signal for signals instead of its own implementation.

### Patch Changes

- 0d81906: The `Vector` type has been changed to an `IVector2` interface, and some basic vector math functions have been implemented within this package. They are designed to be compatible with instances of the Vector2 class exported by Three.js (ie. `x` and `y` properties, and mutating values to not create new objects.)
- c8df83d: Controllers now provide an `onDeviceChange` signal that emits whenever the currently active device changes. This can be used to, for example, display input method-specific UI.

  ```ts
  controller.onDeviceChange.add((d) => console.log("new device:", d))
  ```

- e15ed5d: New processor: `deadzone`. Applies a deadzone to a `VectorControl`.

  ```ts
  controller
    .addControl("move", VectorControl)
    .addStep(gamepad.axisVector(0, 1))
    .addStep(processors.clampVector(1))
    .addStep(processors.deadzone(0.15))
  ```
