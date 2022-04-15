import { BooleanControl, VectorControl } from "../Control"
import { Device } from "./Device"

export type KeyCode = string

export class KeyboardDevice extends Device {
  private keyState: Record<KeyCode, boolean> = {}

  start = () => {
    window.addEventListener("keydown", this.handleKeyDown)
    window.addEventListener("keyup", this.handleKeyUp)
    return this
  }

  stop = () => {
    window.removeEventListener("keydown", this.handleKeyDown)
    window.removeEventListener("keyup", this.handleKeyUp)
    return this
  }

  update() {}

  isPressed = (code: KeyCode | KeyCode[]) => {
    const keys = Array.isArray(code) ? code : [code]
    return keys.some((c) => this.keyState[c]) ? 1 : 0
  }

  handleKeyDown = (event: KeyboardEvent) => {
    this.keyState[event.code] = true
    this.onActivity.emit()
  }

  handleKeyUp = (event: KeyboardEvent) => {
    this.keyState[event.code] = false
  }

  static whenKeyPressed = (key: KeyCode | KeyCode[]) => (
    control: BooleanControl
  ) => {
    if (control.controller.activeDevice instanceof KeyboardDevice) {
      control.value = !!control.controller.activeDevice.isPressed(key)
    }
  }

  static compositeVector = (
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
}
