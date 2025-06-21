// Home Component
import React from 'react';
import MonadDots from '../game/MonadDots';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Monad Dots</h1>
            <MonadDots />
        </div>
    );
};

// Export Demo function for compatibility with the template
export const Demo: React.FC = () => {
    return (
        <div>
            <h2>Demo of Monad Dots Game</h2>
            <MonadDots />
        </div>
    );
};

export default Home;
