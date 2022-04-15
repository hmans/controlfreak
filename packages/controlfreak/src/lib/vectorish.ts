export interface IVector2 {
  x: number
  y: number
}

export const magnitude = ({ x, y }: IVector2) => Math.sqrt(x * x + y * y)

export const normalize = (v: IVector2) => {
  const length = magnitude(v) || 1
  v.x /= length
  v.y /= length
  return v
}
