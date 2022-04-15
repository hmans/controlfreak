export class Signal<
  Payload extends any,
  Callback extends Function = (payload: Payload) => void
> {
  private subscribers = new Set<Callback>()

  on(subscriber: Callback) {
    this.subscribers.add(subscriber)
  }

  off(subscriber: Callback) {
    this.subscribers.delete(subscriber)
  }

  emit(payload: Payload) {
    this.subscribers.forEach((l) => l(payload))
  }

  clear() {
    this.subscribers.clear()
  }
}
