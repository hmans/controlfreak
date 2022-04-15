import { BooleanControl, VectorControl } from ".";
export declare const normalizeVector: ({ value }: VectorControl) => void;
export declare const clampVector: (maxLength?: number) => ({ value }: VectorControl) => void;
export declare const compositeKeyboardVector: (up: string, down: string, left: string, right: string) => ({ value, controller }: VectorControl) => void;
export declare const gamepadAxisVector: (horizontalAxis?: number, verticalAxis?: number) => ({ value, controller }: VectorControl) => void;
export declare const whenKeyPressed: (key: string) => (control: BooleanControl) => void;
export declare const whenButtonPressed: (button: number) => (control: BooleanControl) => void;
