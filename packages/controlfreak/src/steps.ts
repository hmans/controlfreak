import { BooleanControl, VectorControl } from "."
import { KeyboardDevice, GamepadDevice, KeyCode } from "./devices"
import * as vector from "./lib/vectorish"

export const normalizeVector = ({ value }: VectorControl) =>
  vector.normalize(value)

export const clampVector = (maxLength = 1) => ({ value }: VectorControl) => {
  const length = vector.magnitude(value) || 1

  if (length > maxLength) {
    const factor = maxLength / length
    value.x *= factor
    value.y *= factor
  }
}

export const compositeKeyboardVector = (
  up: KeyCode | KeyCode[],
  down: KeyCode | KeyCode[],
  left: KeyCode | KeyCode[],
  right: KeyCode | KeyCode[]
) => ({ value, controller }: VectorControl) => {
  if (controller.activeDevice instanceof KeyboardDevice) {
    const { isPressed } = controller.activeDevice

    value.x = isPressed(right) - isPressed(left)
    value.y = isPressed(up) - isPressed(down)
  }
}

export const gamepadAxisVector = (horizontalAxis = 0, verticalAxis = 1) => ({
  value,
  controller
}: VectorControl) => {
  if (controller.activeDevice instanceof GamepadDevice) {
    const { device } = controller.activeDevice

    if (device) {
      value.x = device.axes[horizontalAxis]
      value.y = -device.axes[verticalAxis]
    }
  }
}

export const whenKeyPressed = (key: KeyCode | KeyCode[]) => (
  control: BooleanControl
) => {
  if (control.controller.activeDevice instanceof KeyboardDevice) {
    control.value = !!control.controller.activeDevice.isPressed(key)
  }
}

export const whenButtonPressed = (button: number) => (
  control: BooleanControl
) => {
  if (control.controller.activeDevice instanceof GamepadDevice) {
    control.value = control.controller.activeDevice.device!.buttons[
      button
    ].pressed
  }
}
