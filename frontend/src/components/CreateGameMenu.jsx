import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoomApi } from '../utils/connect';

const CreateGame = () => {
  const nav = useNavigate();

  const createGameLobby = async (e) => {
    const room = await createRoomApi();
    console.log(`room ${room} created`);
    nav(`/host-game-lobby/${room}`);
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
