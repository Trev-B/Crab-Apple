import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { joinRoomApi } from '../utils/connect';

const JoinGameMenu = () => {
  const [gameId, setGameId] = useState();
  const nav = useNavigate();

  const joinGame = async (e) => {
    e.preventDefault();
    console.log(gameId);
    const room = await joinRoomApi(gameId);
    if (!room) {
      // console.log(`Room ${gameId} not found`);
      return;
    }
    nav(`/player-game-lobby/${room}`);
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
