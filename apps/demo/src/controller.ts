import {
  BooleanControl,
  Controller,
  GamepadDevice,
  KeyboardDevice,
  VectorControl,
  Processors
} from "@hmans/controlfreak"

export const controller = new Controller()

controller.addDevice(new KeyboardDevice())
controller.addDevice(new GamepadDevice())

controller
  .addControl("move", VectorControl)
  .addStep(KeyboardDevice.compositeVector("KeyW", "KeyS", "KeyA", "KeyD"))
  .addStep(GamepadDevice.axisVector(0, 1))
  .addStep(Processors.clampVector(1))

controller
  .addControl("fire", BooleanControl)
  .addStep(KeyboardDevice.whenKeyPressed(["Space", "Enter"]))
  .addStep(GamepadDevice.whenButtonPressed(0))

controller
  .addControl("aim", VectorControl)
  .addStep(
    KeyboardDevice.compositeVector(
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight"
    )
  )
  .addStep(GamepadDevice.axisVector(2, 3))
  .addStep(Processors.normalizeVector)

controller.start()
