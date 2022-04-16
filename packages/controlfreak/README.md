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
  Controller,
  GamepadDevice,
  KeyboardDevice,
  processors,
  TouchDevice,
  VectorControl
} from "@hmans/controlfreak"

export const controller = new Controller()

const keyboard = new KeyboardDevice()
const gamepad = new GamepadDevice()
const touch = new TouchDevice()

controller.addDevice(keyboard)
controller.addDevice(gamepad)
controller.addDevice(touch)

controller
  .addControl("move", VectorControl)
  .addStep(keyboard.compositeVector("KeyW", "KeyS", "KeyA", "KeyD"))
  .addStep(gamepad.axisVector(0, 1))
  .addStep(processors.clampVector(1))
  .addStep(processors.deadzone(0.15))

controller
  .addControl("fire", BooleanControl)
  .addStep(keyboard.whenKeyPressed(["Space", "Enter"]))
  .addStep(gamepad.whenButtonPressed(0))

controller
  .addControl("aim", VectorControl)
  .addStep(
    keyboard.compositeVector("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight")
  )
  .addStep(gamepad.axisVector(2, 3))
  .addStep(processors.deadzone(0.15))
  .addStep(processors.normalizeVector)

controller.onDeviceChange.add((d) => console.log("new device:", d))
```

Then use it in your game loop:

```ts
import { controller } from "./controller"

/* Very likely within some sort of loop...: */
controller.update()
console.log(controller.controls.move.value)
```
