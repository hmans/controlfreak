import { Device } from "./Device";
export declare class GamepadDevice extends Device {
    deviceIndex?: number;
    device?: Gamepad;
    private lastTimestamp;
    private handleGamepadConnected;
    private handleGamepadDisconnected;
    start: () => this;
    stop: () => this;
    update: () => void;
}
