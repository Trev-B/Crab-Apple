import React from 'react';
import { useState } from 'react';

const JoinGameMenu = () => {
  const [gameId, setGameId] = useState();

  const joinGame = (e) => {
    e.preventDefault();
    console.log(gameId);
  };

  return (
    <div className='flex items-center h-full flex-col'>
      <h3>Join Game</h3>
      <form onSubmit={joinGame}>
        <label>
          Enter lobby ID:{' '}
          <input
            placeholder='Lobby Name'
            onChange={(e) => setGameId(e.target.value)}
            type='text'
          />
        </label>
        <button>Join</button>
      </form>
    </div>
  );
};

export default JoinGameMenu;
