// Game Types
export const DOT_COLORS: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
export const GRID_SIZE: number = 8;
export const MOVE_LIMIT: number = 20;

export interface Dot {
    color: string;
    isPartOfSquare: boolean;
}
