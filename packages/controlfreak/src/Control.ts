import { Controller } from "./Controller"
import { IVector2 } from "./lib/vectorish"

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

export class VectorControl extends Control<IVector2> {
  value: IVector2 = { x: 0, y: 0 }

  reset() {
    this.value.x = 0
    this.value.y = 0
  }
}

export class BooleanControl extends Control<boolean> {
  value: boolean = false

  reset() {
    this.value = false
  }
}
