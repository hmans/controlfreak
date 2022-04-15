import { Device } from "./Device";
export declare class KeyboardDevice extends Device {
    private keyState;
    start: () => this;
    stop: () => this;
    update(): void;
    isPressed: (key: string) => 0 | 1;
    handleKeyDown: (event: KeyboardEvent) => void;
    handleKeyUp: (event: KeyboardEvent) => void;
}
