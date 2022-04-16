import {
  BooleanControl,
  Controller,
  ControlStep,
  GamepadDevice,
  KeyboardDevice,
  processors,
  TouchDevice,
  VectorControl,
  Signal
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

const pressInteraction = (): ControlStep<boolean> => {
  let pressed = false

  return (control) => {
    if (control.value) {
      if (!pressed) {
        pressed = true
        console.log(
          "OMG THE BUTTON WHAT PRESSED. LET'S INVOKE SOME CALLBACKS HERE"
        )
      }
    } else {
      pressed = false
    }
  }
}

const holdInteraction = (
  duration: number,
  callbacks: {
    onPerformed?: Function
    onCancelled?: Function
    onStarted?: Function
  } = {}
): ControlStep<boolean> => {
  let started: number | null = null
  let completed = false

  return (control) => {
    if (control.value) {
      if (!started) {
        started = performance.now()
        callbacks.onStarted?.()
      }

      if (!completed && performance.now() > started + duration) {
        callbacks.onPerformed?.()
        completed = true
      }
    } else {
      if (started && !completed) {
        callbacks.onCancelled?.()
      }

      started = null
      completed = false
    }
  }
}

controller
  .addControl("fire", BooleanControl)
  .addStep(keyboard.whenKeyPressed(["Space", "Enter"]))
  .addStep(gamepad.whenButtonPressed(0))
  .addStep(
    holdInteraction(500, {
      onPerformed: () => console.log("The button was held!"),
      onCancelled: () => console.log("The button wasn't held long enough :(")
    })
  )

controller
  .addControl("aim", VectorControl)
  .addStep(
    keyboard.compositeVector("ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight")
  )
  .addStep(gamepad.axisVector(2, 3))
  .addStep(processors.deadzone(0.15))
  .addStep(processors.normalizeVector)

controller.onDeviceChange.add((d) => console.log("new device:", d))
