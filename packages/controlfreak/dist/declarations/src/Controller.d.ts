import { Control } from ".";
import { Device } from "./devices";
export declare class Controller {
    devices: Device[];
    activeDevice: Device;
    controls: Record<string, Control>;
    constructor();
    update(): void;
    addControl(name: string, klass: {
        new (...args: any[]): Control;
    }): Control<any>;
    removeControl(name: string): void;
}
