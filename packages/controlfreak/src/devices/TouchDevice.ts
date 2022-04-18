import { Signal } from "@hmans/signal"
import { Device } from "./Device"

export class TouchDevice extends Device {
  onTouchStart = new Signal<TouchEvent>()
  onTouchEnd = new Signal<TouchEvent>()
  onTouchMove = new Signal<TouchEvent>()

  start() {
    document.addEventListener("touchstart", this.handleTouchStart)
    document.addEventListener("touchend", this.handleTouchEnd)
    document.addEventListener("touchmove", this.handleTouchMove)
    return this
  }

  stop() {
    document.removeEventListener("touchstart", this.handleTouchStart)
    document.removeEventListener("touchend", this.handleTouchEnd)
    document.removeEventListener("touchmove", this.handleTouchMove)
    return this
  }

  handleTouchStart = (e: TouchEvent) => {
    this.onActivity.emit()
    this.onTouchStart.emit(e)
  }

  handleTouchEnd = (e: TouchEvent) => {
    this.onActivity.emit()
    this.onTouchEnd.emit(e)
  }

  handleTouchMove = (e: TouchEvent) => {
    this.onActivity.emit()
    this.onTouchMove.emit(e)
  }

  update() {}
}
