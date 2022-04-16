import { Control } from "../controls"

export abstract class Step<T = any> {
  abstract apply(control: Control<T>): void
}
