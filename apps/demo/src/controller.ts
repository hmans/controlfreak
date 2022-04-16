import {
  BooleanControl,
  Controller,
  gamepad,
  keyboard,
  VectorControl,
  processors
} from "@hmans/controlfreak"

export const controller = new Controller()

controller.addDevice(new keyboard.KeyboardDevice())
controller.addDevice(new gamepad.GamepadDevice())

controller
  .addControl("move", VectorControl)
  .addStep(keyboard.compositeVector("KeyW", "KeyS", "KeyA", "KeyD"))
  .addStep(gamepad.axisVector(0, 1))
  .addStep(processors.clampVector(1))

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
  .addStep(processors.normalizeVector)

controller.onDeviceChange.add((d) => console.log("new device:", d))
