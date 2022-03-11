import { Control } from "."
import {
  Device,
  GamepadDevice,
  KeyboardDevice
} from "./devices"

export class Controller {
  devices: Device[] = [
    new KeyboardDevice().start(),
    new GamepadDevice().start()
  ]
  activeDevice: Device = null!

  controls: Record<string, Control> = {}

  constructor() {
    for (const device of this.devices) {
      device.onActivity.on(
        () => (this.activeDevice = device)
      )
    }
  }

  update() {
    for (const device of this.devices) device.update()
    for (const control of Object.values(this.controls))
      control.update()
  }
}
