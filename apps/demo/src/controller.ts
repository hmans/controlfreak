import {
  BooleanControl,
  Controller,
  ControlStep,
  GamepadDevice,
  KeyboardDevice,
  processors,
  TouchDevice,
  VectorControl,
  Signal,
  Step,
  Control
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

class ClassyHoldInteraction extends Step<boolean> {
  private started: number | null = null
  private completed = false

  onStarted = new Signal()
  onPerformed = new Signal()
  onCancelled = new Signal()

  constructor(public duration: number) {
    super()
  }

  apply(control: Control<boolean>): void {
    if (control.value) {
      if (!this.started) {
        this.started = performance.now()
        this.onStarted.emit()
      }

      if (!this.completed && performance.now() > this.started + this.duration) {
        this.onPerformed.emit()
        this.completed = true
      }
    } else {
      if (this.started && !this.completed) {
        this.onCancelled.emit()
      }

      this.started = null
      this.completed = false
    }
  }
}

const holdInteraction = (duration: number) => {
  let started: number | null = null
  let completed = false

  const onPerformed = new Signal()
  const onCancelled = new Signal()
  const onStarted = new Signal()

  type HoldInteractionStep = ControlStep<boolean> & {
    onStarted: (fn: () => void) => HoldInteractionStep
    onCancelled: (fn: () => void) => HoldInteractionStep
    onPerformed: (fn: () => void) => HoldInteractionStep
  }

  const step: HoldInteractionStep = (control) => {
    if (control.value) {
      if (!started) {
        started = performance.now()
        onStarted.emit()
      }

      if (!completed && performance.now() > started + duration) {
        onPerformed.emit()
        completed = true
      }
    } else {
      if (started && !completed) {
        onCancelled.emit()
      }

      started = null
      completed = false
    }
  }

  step.onStarted = (fn: () => void) => {
    onStarted.add(fn)
    return step
  }

  step.onCancelled = (fn: () => void) => {
    onCancelled.add(fn)
    return step
  }

  step.onPerformed = (fn: () => void) => {
    onPerformed.add(fn)
    return step
  }

  return step
}

controller
  .addControl("fire", BooleanControl)
  .addStep(keyboard.whenKeyPressed(["Space", "Enter"]))
  .addStep(gamepad.whenButtonPressed(0))
  .addStep(
    holdInteraction(500)
      .onPerformed(() => console.log("YES! The button was held long enough!"))
      .onCancelled(() => console.log("The button wasn't held long enough :("))
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
