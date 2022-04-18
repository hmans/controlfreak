export type KeyCode = string

const keyState = new Map<KeyCode, boolean>()

const handleKeyDown = (event: KeyboardEvent) => keyState.set(event.code, true)

const handleKeyUp = (event: KeyboardEvent) => keyState.set(event.code, false)

export default () => {
  window.addEventListener("keydown", handleKeyDown)
  window.addEventListener("keyup", handleKeyUp)

  return () => {
    window.removeEventListener("keydown", handleKeyDown)
    window.removeEventListener("keyup", handleKeyUp)
  }
}
