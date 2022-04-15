import { Control } from "."
import { BaseDevice } from "./devices"

export class Controller {
  /** A list of devices driving this controller. */
  devices = new Array<BaseDevice>()

  /** The currently active device. */
  activeDevice: BaseDevice = null!

  /** The controls defined by this controller.  */
  controls: Record<string, Control> = {}

  start() {
    for (const device of this.devices) {
      device.onActivity.on(() => (this.activeDevice = device))
      device.start()
    }
  }

  stop() {
    for (const device of this.devices) {
      device.stop()
      device.onActivity.clear()
    }
  }

  update() {
    for (const device of this.devices) device.update()
    for (const control of Object.values(this.controls)) control.update()
  }

  addControl(name: string, klass: { new (...args: any[]): Control }) {
    const instance = new klass(this)
    this.controls[name] = instance
    return instance
  }

  removeControl(name: string) {
    delete this.controls[name]
  }

  addDevice(device: BaseDevice) {
    this.devices.push(device)
  }

  removeDevice(device: BaseDevice) {
    const pos = this.devices.indexOf(device, 0)
    if (pos >= 0) this.devices.splice(pos, 1)
  }
}
