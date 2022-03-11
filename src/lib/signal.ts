export class Signal<T extends (...args: any[]) => any = (...args: any[]) => any> {
  private subscribers = new Set<T>()

  on(subscriber: T) {
    this.subscribers.add(subscriber)
  }

  off(subscriber: T) {
    this.subscribers.delete(subscriber)
  }

  emit(...args: Parameters<T>) {
    this.subscribers.forEach((l) => l(...args))
  }

  clear() {
    this.subscribers.clear()
  }
}
