'use client'

// MonadDots Component
import React, { useState, useEffect } from 'react';
import { DOT_COLORS, GRID_SIZE, MOVE_LIMIT, Dot } from './gameTypes';
import { initializeGrid, detectSquares, clearDots, dropDots } from './gameUtils';
import { validateConnection } from './gameUtilsAdvanced';
import './MonadDots.css'; // Assuming you have a CSS file for styling

const MonadDots: React.FC = () => {
    const [grid, setGrid] = useState<Dot[][]>(initializeGrid(GRID_SIZE));
    const [movesLeft, setMovesLeft] = useState<number>(MOVE_LIMIT);
    const [score, setScore] = useState<number>(0);
    const [selectedDots, setSelectedDots] = useState<Dot[]>([]);
    const [path, setPath] = useState<{ row: number, col: number }[]>([]);

    useEffect(() => {
        // Game initialization or reset logic
    }, []);

    const handleDotClick = (row: number, col: number) => {
        const clickedDot = grid[row][col];

        if (selectedDots.length === 0) {
            // Start a new selection
            setSelectedDots([clickedDot]);
            setPath([{ row, col }]);
        } else {
            const lastSelectedDot = selectedDots[selectedDots.length - 1];
            const lastPathPoint = path[path.length - 1];

            // Check if the clicked dot is adjacent and has the same color
            if (clickedDot.color === lastSelectedDot.color &&
                ((Math.abs(row - lastPathPoint.row) === 1 && col === lastPathPoint.col) ||
                 (Math.abs(col - lastPathPoint.col) === 1 && row === lastPathPoint.row))) {
                setSelectedDots([...selectedDots, clickedDot]);
                setPath([...path, { row, col }]);
            } else {
                // End of selection, process the move
                if (selectedDots.length > 1) {
                    processMove();
                }
                // Start a new selection with the newly clicked dot
                setSelectedDots([clickedDot]);
                setPath([{ row, col }]);
            }
        }
    };

    const processMove = () => {
        if (path.length < 2) {
            // Not a valid move
            setSelectedDots([]);
            setPath([]);
            return;
        }

        if (!validateConnection(grid, path)) {
            // Invalid connection (e.g., not a straight line or square)
            setSelectedDots([]);
            setPath([]);
            return;
        }

        let newGrid = [...grid];
        let currentScore = score;

        // Clear selected dots
        path.forEach(({ row, col }) => {
            newGrid[row][col] = { color: '', isPartOfSquare: false };
            currentScore += 10; // Example scoring
        });

        // Detect and clear squares
        newGrid = detectSquares(newGrid);
        const { newGrid: clearedGrid, score: squareScore } = clearDots(newGrid);
        newGrid = clearedGrid;
        currentScore += squareScore;

        // Drop dots and fill new ones
        newGrid = dropDots(newGrid);

        setGrid(newGrid);
        setScore(currentScore);
        setMovesLeft(movesLeft - 1);
        setSelectedDots([]);
        setPath([]);
    };

    const renderGrid = () => {
        return grid.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex' }}>
                {row.map((dot, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        style={{
                            width: '30px',
                            height: '30px',
                            borderRadius: '50%',
                            backgroundColor: dot.color || 'lightgray',
                            margin: '2px',
                            cursor: 'pointer',
                            border: selectedDots.includes(dot) ? '2px solid blue' : 'none',
                        }}
                        onClick={() => handleDotClick(rowIndex, colIndex)}
                    />
                ))}
            </div>
        ));
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h1>Monad Dots</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                <p>Moves Left: {movesLeft}</p>
                <p style={{ marginLeft: '20px' }}>Score: {score}</p>
            </div>
            <div style={{ display: 'inline-block', border: '1px solid black' }}>
                {renderGrid()}
            </div>
            {movesLeft === 0 && <p>Game Over!</p>}
        </div>
    );
};

export default MonadDots;
