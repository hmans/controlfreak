---
"@hmans/controlfreak": minor
---

The Keyboard device's `isPressed` function now optionally accepts an array of keys to check. This allows step implementations for keyboard controls to support more than a single key per axis/input. For example:

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
