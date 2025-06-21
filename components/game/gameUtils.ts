// Game Utilities
import { Dot, DOT_COLORS, GRID_SIZE } from './gameTypes';

export function getRandomColor(): string {
    return DOT_COLORS[Math.floor(Math.random() * DOT_COLORS.length)];
}

export function initializeGrid(size: number): Dot[][] {
    const grid: Dot[][] = [];
    for (let i = 0; i < size; i++) {
        const row: Dot[] = [];
        for (let j = 0; j < size; j++) {
            row.push({ color: getRandomColor(), isPartOfSquare: false });
        }
        grid.push(row);
    }
    return grid;
}

export function detectSquares(grid: Dot[][]): Dot[][] {
    // Detect squares and mark dots as part of a square
    for (let i = 0; i < GRID_SIZE - 1; i++) {
        for (let j = 0; j < GRID_SIZE - 1; j++) {
            const color = grid[i][j].color;
            if (color === grid[i][j + 1].color &&
                color === grid[i + 1][j].color &&
                color === grid[i + 1][j + 1].color) {
                grid[i][j].isPartOfSquare = true;
                grid[i][j + 1].isPartOfSquare = true;
                grid[i + 1][j].isPartOfSquare = true;
                grid[i + 1][j + 1].isPartOfSquare = true;
            }
        }
    }
    return grid;
}

export function clearDots(grid: Dot[][]): { newGrid: Dot[][], score: number } {
    let score = 0;
    for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[i][j].isPartOfSquare) {
                grid[i][j] = { color: '', isPartOfSquare: false };
                score += 10;
            }
        }
    }
    return { newGrid: grid, score };
}

export function dropDots(grid: Dot[][]): Dot[][] {
    for (let j = 0; j < GRID_SIZE; j++) {
        let emptySpots = 0;
        for (let i = GRID_SIZE - 1; i >= 0; i--) {
            if (grid[i][j].color === '') {
                emptySpots++;
            } else if (emptySpots > 0) {
                grid[i + emptySpots][j] = grid[i][j];
                grid[i][j] = { color: '', isPartOfSquare: false };
            }
        }
        for (let i = 0; i < emptySpots; i++) {
            grid[i][j] = { color: getRandomColor(), isPartOfSquare: false };
        }
    }
    return grid;
}
