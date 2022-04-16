import { VectorControl } from "."
import * as vector from "./lib/vectorish"

export const normalizeVector = ({ value }: VectorControl) =>
  vector.normalize(value)

export const clampVector = (maxLength = 1) => ({ value }: VectorControl) => {
  const length = vector.magnitude(value) || 1

  if (length > maxLength) {
    const factor = maxLength / length
    value.x *= factor
    value.y *= factor
  }
}

export const deadzone = (threshold = 0.1) => ({ value }: VectorControl) => {
  const length = vector.magnitude(value)

  if (length < threshold) {
    value.x = 0
    value.y = 0
  } else {
    vector.multiply(value, (length - threshold) / (length - length * threshold))
  }
}
