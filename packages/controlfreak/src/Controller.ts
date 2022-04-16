import { Control } from "."
import { Device } from "./devices"
import { Signal } from "@hmans/signal"

export class Controller {
  /** A list of devices driving this controller. */
  devices = new Array<Device>()

  /** The currently active device. */
  activeDevice: Device = null!

  /** The controls defined by this controller.  */
  controls: Record<string, Control> = {}

  onDeviceChange = new Signal<Device>()

  start() {
    for (const device of this.devices) {
      device.onActivity.add(() => {
        if (this.activeDevice === device) return

        this.activeDevice = device
        this.onDeviceChange.emit(device)
      })

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

  addDevice(device: Device) {
    this.devices.push(device)
  }

  removeDevice(device: Device) {
    const pos = this.devices.indexOf(device, 0)
    if (pos >= 0) this.devices.splice(pos, 1)
  }
}
