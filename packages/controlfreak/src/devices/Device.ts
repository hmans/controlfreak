import { Signal } from "../lib/signal"

export abstract class Device {
  public onActivity = new Signal()

  abstract start(): this
  abstract stop(): this
  abstract update(): void
}
