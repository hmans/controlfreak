export declare class Signal<T extends (...args: any[]) => any = (...args: any[]) => any> {
    private subscribers;
    on(subscriber: T): void;
    off(subscriber: T): void;
    emit(...args: Parameters<T>): void;
    clear(): void;
}
