import { Control } from "./Control"

export class BooleanControl extends Control<boolean> {
  value: boolean = false

  reset() {
    this.value = false
  }
}
