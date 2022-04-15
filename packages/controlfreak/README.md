[![Tests](https://github.com/hmans/controlfreak/actions/workflows/tests.yml/badge.svg)](https://github.com/hmans/controlfreak/actions/workflows/tests.yml)
[![Version](https://img.shields.io/npm/v/@hmans/controlfreak)](https://www.npmjs.com/package/@hmans/controlfreak)
[![Downloads](https://img.shields.io/npm/dt/@hmans/controlfreak.svg)](https://www.npmjs.com/package/@hmans/controlfreak)
[![Bundle Size](https://img.shields.io/bundlephobia/min/@hmans/controlfreak?label=bundle%20size)](https://bundlephobia.com/result?p=@hmans/controlfreak)

# CONTROL FREAK

## tl;dr

Add it to your project:

```sh
yarn add @hmans/controlfreak
```

Write a module that composes and exports your game controller, eg `controller.ts`:

```ts
import {
  BooleanControl,
  clampVector,
  compositeKeyboardVector,
  Controller,
  gamepadAxisVector,
  normalizeVector,
  VectorControl,
  whenButtonPressed,
  whenKeyPressed
} from "@hmans/controlfreak"

export const controller = new Controller()

controller
  .addControl("move", VectorControl)
  .addStep(compositeKeyboardVector("KeyW", "KeyS", "KeyA", "KeyD"))
  .addStep(gamepadAxisVector(0, 1))
  .addStep(clampVector(1))

controller
  .addControl("fire", BooleanControl)
  .addStep(whenKeyPressed("Space"))
  .addStep(whenButtonPressed(0))

controller
  .addControl("aim", VectorControl)
  .addStep(
    compositeKeyboardVector("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight")
  )
  .addStep(gamepadAxisVector(2, 3))
  .addStep(normalizeVector)
```

Then use it in your game loop:

```ts
import { controller } from "./controller"

/* Very likely within some sort of loop...: */
controller.update()
console.log(controller.controls.move.value)
```
