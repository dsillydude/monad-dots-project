// Advanced Game Utilities
import { Dot, GRID_SIZE } from './gameTypes';

export function findPath(grid: Dot[][], start: {row: number, col: number}, end: {row: number, col: number}): boolean {
    // Implement pathfinding logic to check if a valid path exists between start and end
    const visited = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(false));
    const stack = [start];

    while (stack.length > 0) {
        const { row, col } = stack.pop()!;
        if (row === end.row && col === end.col) return true;

        visited[row][col] = true;

        // Check adjacent cells
        const directions = [
            { row: -1, col: 0 }, // Up
            { row: 1, col: 0 },  // Down
            { row: 0, col: -1 }, // Left
            { row: 0, col: 1 }   // Right
        ];

        for (const { row: dRow, col: dCol } of directions) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE &&
                !visited[newRow][newCol] && grid[newRow][newCol].color === grid[row][col].color) {
                stack.push({ row: newRow, col: newCol });
            }
        }
    }

    return false;
}

export function validateConnection(grid: Dot[][], path: {row: number, col: number}[]): boolean {
    // Validate if the path forms a valid connection
    if (path.length < 2) return false;

    const color = grid[path[0].row][path[0].col].color;
    for (const { row, col } of path) {
        if (grid[row][col].color !== color) return false;
    }

    // Check if path forms a square
    const pathSet = new Set(path.map(({ row, col }) => `${row},${col}`));
    for (let i = 0; i < path.length - 1; i++) {
        const { row: r1, col: c1 } = path[i];
        for (let j = i + 1; j < path.length; j++) {
            const { row: r2, col: c2 } = path[j];
            if (Math.abs(r1 - r2) === 1 && Math.abs(c1 - c2) === 1) {
                const corners = [
                    `${r1},${c2}`,
                    `${r2},${c1}`
                ];
                if (corners.every(corner => pathSet.has(corner))) {
                    return true; // Forms a square
                }
            }
        }
    }

    return true;
}
