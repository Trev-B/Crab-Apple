import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGame = () => {
  const nav = useNavigate();

  const createGameLobby = (e) => {
    console.log('lobby created');
    nav('/game-lobby');
  };

  return (
    <div className='flex items-center h-full'>
      Create Game
      <button
        className='bg-blue-100 rounded px-1 py-1'
        onClick={createGameLobby}
      >
        Create Lobby
      </button>
    </div>
  );
};

export default CreateGame;
