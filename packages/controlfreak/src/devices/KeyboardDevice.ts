import { Device } from "./Device"

export class KeyboardDevice extends Device {
  private keyState: Record<string, boolean> = {}

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

  isPressed = (code: string) => (this.keyState[code] ? 1 : 0)

  handleKeyDown = (event: KeyboardEvent) => {
    this.keyState[event.code] = true
    this.onActivity.emit()
  }

  handleKeyUp = (event: KeyboardEvent) => {
    this.keyState[event.code] = false
  }
}
