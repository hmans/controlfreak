import { IVector2 } from "../lib/vectorish"
import { Control } from "./Control"

export class VectorControl extends Control<IVector2> {
  value: IVector2 = { x: 0, y: 0 }

  reset() {
    this.value.x = 0
    this.value.y = 0
  }
}
