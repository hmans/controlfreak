interface IVector {
  x: number
  y: number
}

type Vector = IVector

const initializeBoolean = (): boolean => false

const initializeVector = (): Vector => ({ x: 0, y: 0 })

/* Define a controller */
const makeController = () => ({
  move: () => initializeVector(),
  aim: () => initializeVector(),
  fire: () => initializeBoolean()
})

const controller = makeController()

export const foo = "bar"
