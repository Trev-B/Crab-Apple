import React from 'react';

const GameBoard = ({ gameState }) => {
  return (
    <div>
      <h3>Game Board</h3>
      {!gameState ? (
        <div>Loading...</div>
      ) : (
        <div className='flex flex-row space-x-8'>
          <div>
            {gameState.black_cards.map((card) => (
              <h4 key={card}>{card}</h4>
            ))}
          </div>
          <div>
            {gameState.white_cards.map((card) => (
              <h4 key={card}>{card}</h4>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
