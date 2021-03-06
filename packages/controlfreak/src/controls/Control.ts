import { Controller } from "../Controller"

export type ControlStep<T = any> = (control: Control<T>) => void

export abstract class Control<T = any> {
  abstract value: T

  steps = new Array<ControlStep<T>>()

  abstract reset(): void

  constructor(public controller: Controller) {}

  addStep(step: ControlStep<T>) {
    this.steps.push(step)
    return this
  }

  removeStep(step: ControlStep<T>) {
    const pos = this.steps.indexOf(step, 0)
    if (pos >= 0) this.steps.splice(pos, 1)
  }

  update() {
    this.reset()
    for (const step of this.steps) {
      step(this)
    }
  }
}
