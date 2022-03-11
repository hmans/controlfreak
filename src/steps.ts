import { BooleanControl, VectorControl } from "."
import { KeyboardDevice, GamepadDevice } from "./devices"

export const normalizeVector = ({ value }: VectorControl) => {
  const length = Math.sqrt(value.x ** 2 + value.y ** 2) || 1
  value.x /= length
  value.y /= length
}

export const compositeKeyboardVector =
  (up: string, down: string, left: string, right: string) =>
  ({ value, controller }: VectorControl) => {
    if (controller.activeDevice instanceof KeyboardDevice) {
      const { isPressed } = controller.activeDevice
      value.x = isPressed(right) - isPressed(left)
      value.y = isPressed(up) - isPressed(down)
    }
  }

export const gamepadAxisVector =
  (horizontalAxis = 0, verticalAxis = 1) =>
  ({ value, controller }: VectorControl) => {
    if (controller.activeDevice instanceof GamepadDevice) {
      const { device } = controller.activeDevice

      if (device) {
        value.x = device.axes[horizontalAxis]
        value.y = -device.axes[verticalAxis]
      }
    }
  }

export const whenKeyPressed = (key: string) => (control: BooleanControl) => {
  if (control.controller.activeDevice instanceof KeyboardDevice) {
    control.value = !!control.controller.activeDevice.isPressed(key)
  }
}
