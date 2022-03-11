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

  isPressed = (key: string) => (this.keyState[key] ? 1 : 0)

  handleKeyDown = (event: KeyboardEvent) => {
    this.keyState[event.key] = true
    this.onActivity.emit()
  }

  handleKeyUp = (event: KeyboardEvent) => {
    this.keyState[event.key] = false
  }
}
