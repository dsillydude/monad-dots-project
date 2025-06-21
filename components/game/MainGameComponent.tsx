// Main Game Component
import React, { useState } from 'react';
import { DOT_COLORS, GRID_SIZE, MOVE_LIMIT, Dot } from './gameTypes';
import { initializeGrid, detectSquares, clearDots, dropDots } from './gameUtils';

const MainGameComponent: React.FC = () => {
    const [grid, setGrid] = useState<Dot[][]>(initializeGrid(GRID_SIZE));
    const [movesLeft, setMovesLeft] = useState<number>(MOVE_LIMIT);
    const [score, setScore] = useState<number>(0);

    const handleMove = () => {
        if (movesLeft > 0) {
            let newGrid = detectSquares(grid);
            const { newGrid: clearedGrid, score: gainedScore } = clearDots(newGrid);
            newGrid = dropDots(clearedGrid);
            setGrid(newGrid);
            setScore(score + gainedScore);
            setMovesLeft(movesLeft - 1);
        }
    };

    return (
        <div>
            <h1>Monad Dots</h1>
            <div>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((dot, colIndex) => (
                            <div key={colIndex} style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: dot.color || 'white',
                                margin: '2px',
                                border: dot.isPartOfSquare ? '2px solid black' : 'none'
                            }}></div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <p>Moves Left: {movesLeft}</p>
                <p>Score: {score}</p>
                <button onClick={handleMove}>Make Move</button>
            </div>
        </div>
    );
};

export default MainGameComponent;
