import {
  BooleanControl,
  Controller,
  GamepadDevice,
  KeyboardDevice,
  VectorControl,
  processors
} from "@hmans/controlfreak"

const keys = new KeyboardDevice()
const pad = new GamepadDevice()

export const controller = new Controller()

controller.addDevice(keys)
controller.addDevice(pad)

controller
  .addControl("move", VectorControl)
  .addStep(keys.compositeVector("KeyW", "KeyS", "KeyA", "KeyD"))
  .addStep(pad.axisVector(0, 1))
  .addStep(processors.clampVector(1))

controller
  .addControl("fire", BooleanControl)
  .addStep(keys.whenKeyPressed(["Space", "Enter"]))
  .addStep(pad.whenButtonPressed(0))

controller
  .addControl("aim", VectorControl)
  .addStep(
    keys.compositeVector("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight")
  )
  .addStep(pad.axisVector(2, 3))
  .addStep(processors.normalizeVector)

controller.start()
