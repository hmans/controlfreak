---
"@hmans/controlfreak": patch
---

Controllers now provide an `onDeviceChange` signal that emits whenever the currently active device changes. This can be used to, for example, display input method-specific UI.

```ts
controller.onDeviceChange.add((d) => console.log("new device:", d))
```
