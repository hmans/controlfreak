import { Device as BaseDevice } from "./Device"

export class Device extends BaseDevice {
  start() {
    document.addEventListener("touchstart", this.handleTouchStart)
    return this
  }

  stop() {
    document.removeEventListener("touchstart", this.handleTouchStart)
    return this
  }

  update() {}

  handleTouchStart = () => {
    this.onActivity.emit()
  }
}
