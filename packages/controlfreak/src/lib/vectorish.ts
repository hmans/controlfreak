export interface Vector {
  x: number
  y: number
}

export const magnitude = ({ x, y }: Vector) => Math.sqrt(x * x + y * y)
