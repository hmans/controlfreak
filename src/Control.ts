import { Vector } from "."

export type ControlStep<T = any> = (
  control: Control<T>
) => void

export abstract class Control<T = any> {
  abstract value: T

  steps = new Array<ControlStep<T>>()

  abstract reset(): void

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

export class VectorControl extends Control<Vector> {
  value: Vector = { x: 0, y: 0 }

  reset() {
    this.value.x = 0
    this.value.y = 0
  }
}
