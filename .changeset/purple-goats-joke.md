---
"@hmans/controlfreak": patch
---

New processor: `deadzone`. Applies a deadzone to a `VectorControl`.

```ts
controller
  .addControl("move", VectorControl)
  .addStep(gamepad.axisVector(0, 1))
  .addStep(processors.clampVector(1))
  .addStep(processors.deadzone(0.15))
```
