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
