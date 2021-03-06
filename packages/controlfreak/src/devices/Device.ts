import { Signal } from "@hmans/signal"

export abstract class Device {
  public onActivity = Signal()

  abstract start(): this
  abstract stop(): this
  abstract update(): void
}
