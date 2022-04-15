import { Signal } from "../lib/signal";
export declare abstract class Device {
    onActivity: Signal<(...args: any[]) => any>;
    abstract start(): this;
    abstract stop(): this;
    abstract update(): void;
}
