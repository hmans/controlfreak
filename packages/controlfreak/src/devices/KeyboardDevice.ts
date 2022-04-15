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
}
