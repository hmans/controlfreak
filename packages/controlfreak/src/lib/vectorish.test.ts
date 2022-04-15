import { divide, magnitude, multiply, normalize } from "./vectorish"

describe(magnitude, () => {
  it("calculates the length of the given vector", () => {
    expect(magnitude({ x: 0, y: 0 })).toEqual(0)
    expect(magnitude({ x: 1, y: 0 })).toEqual(1)
    expect(magnitude({ x: 0, y: -1 })).toEqual(1)
    expect(magnitude({ x: 1, y: 1 })).toEqual(1.4142135623730951)
  })
})

describe(multiply, () => {
  it("multiplies the given vector by a scalar value", () => {
    expect(multiply({ x: 1, y: -2 }, 2)).toEqual({ x: 2, y: -4 })
    expect(multiply({ x: 1, y: -2 }, 0)).toEqual({ x: 0, y: -0 })
  })
})

describe(divide, () => {
  it("divides the given vector by a scalar value", () => {
    expect(divide({ x: 1, y: -2 }, 2)).toEqual({ x: 0.5, y: -1 })
    expect(divide({ x: 1, y: -2 }, 0)).toEqual({ x: Infinity, y: -Infinity })
  })

  it("mutates the vector object", () => {
    const vector = { x: 1, y: -2 }
    divide(vector, 2)
    expect(vector).toEqual({ x: 0.5, y: -1 })
  })

  it("returns the same object", () => {
    const vector = { x: 1, y: -2 }
    expect(divide(vector, 2)).toBe(vector)
  })
})

describe(normalize, () => {
  it("normalizes the given vector, mutating it", () => {
    const vector = { x: 1, y: 1 }
    normalize(vector)
    expect(vector).toEqual({ x: 0.7071067811865475, y: 0.7071067811865475 })
  })
})
