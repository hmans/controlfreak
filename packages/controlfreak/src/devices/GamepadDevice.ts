import { BooleanControl } from "../controls/BooleanControl"
import { VectorControl } from "../controls/VectorControl"
import { Device } from "./Device"

export class GamepadDevice extends Device {
  deviceIndex?: number
  device?: Gamepad

  private lastTimestamp = 0

  private handleGamepadConnected = (e: GamepadEvent) => {
    console.debug("New gamepad connected:", e.gamepad.id)
    this.deviceIndex = e.gamepad.index
  }

  private handleGamepadDisconnected = (e: GamepadEvent) => {
    console.debug("Gamepad disconnected:", e.gamepad.id)
    delete this.deviceIndex
  }

  start = () => {
    window.addEventListener("gamepadconnected", this.handleGamepadConnected)
    window.addEventListener(
      "gamepaddisconnected",
      this.handleGamepadDisconnected
    )
    return this
  }

  stop = () => {
    window.removeEventListener("gamepadconnected", this.handleGamepadConnected)
    window.removeEventListener(
      "gamepaddisconnected",
      this.handleGamepadDisconnected
    )
    return this
  }

  update = () => {
    this.device =
      this.deviceIndex !== undefined
        ? navigator.getGamepads()[this.deviceIndex]!
        : undefined

    if (this.device && this.device.timestamp > this.lastTimestamp) {
      this.lastTimestamp = this.device.timestamp
      this.onActivity.emit()
    }
  }

  whenButtonPressed = (button: number) => (control: BooleanControl) => {
    if (control.controller.activeDevice === this) {
      control.value = this.device!.buttons[button].pressed
    }
  }

  axisVector = (horizontalAxis = 0, verticalAxis = 1) => ({
    value,
    controller
  }: VectorControl) => {
    if (controller.activeDevice === this) {
      const { device } = this

      if (device) {
        value.x = device.axes[horizontalAxis]
        value.y = -device.axes[verticalAxis]
      }
    }
  }
}
