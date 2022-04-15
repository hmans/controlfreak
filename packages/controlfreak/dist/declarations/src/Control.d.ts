import { Vector } from ".";
import { Controller } from "./Controller";
export declare type ControlStep<T = any> = (control: Control<T>) => void;
export declare abstract class Control<T = any> {
    controller: Controller;
    abstract value: T;
    steps: ControlStep<T>[];
    abstract reset(): void;
    constructor(controller: Controller);
    addStep(step: ControlStep<T>): this;
    removeStep(step: ControlStep<T>): void;
    update(): void;
}
export declare class VectorControl extends Control<Vector> {
    value: Vector;
    reset(): void;
}
export declare class BooleanControl extends Control<boolean> {
    value: boolean;
    reset(): void;
}
