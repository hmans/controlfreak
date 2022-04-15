export interface IVector2 {
  x: number
  y: number
}

export const magnitude = ({ x, y }: IVector2) => Math.sqrt(x * x + y * y)

export const normalize = (v: IVector2) => divide(v, magnitude(v) || 1)

export const scale = (v: IVector2, f: number) => {
  v.x *= f
  v.y *= f
  return v
}

export const multiply = scale

export const divide = (v: IVector2, f: number) => scale(v, 1 / f)
