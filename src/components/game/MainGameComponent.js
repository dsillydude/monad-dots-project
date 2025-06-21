// Main Game Component
import React, { useState } from 'react';
import { DOT_COLORS, GRID_SIZE, MOVE_LIMIT } from './gameTypes';
import { initializeGrid } from './gameUtils';

const MainGameComponent = () => {
    const [grid, setGrid] = useState(initializeGrid(GRID_SIZE));
    const [movesLeft, setMovesLeft] = useState(MOVE_LIMIT);
    const [score, setScore] = useState(0);

    return (
        <div>
            <h1>Monad Dots</h1>
            <div>
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} style={{ display: 'flex' }}>
                        {row.map((color, colIndex) => (
                            <div key={colIndex} style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: color,
                                margin: '2px'
                            }}></div>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <p>Moves Left: {movesLeft}</p>
                <p>Score: {score}</p>
            </div>
        </div>
    );
};

export default MainGameComponent;
