import React, { useEffect, useState } from 'react';
import PlayerMenu from './PlayerMenu';
import { io } from 'socket.io-client';

const GameLobby = () => {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState('');
  // const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const socket = io('ws://localhost:5000');

    socket.on('player-joined', (allPlayers) => {
      console.log(allPlayers);
      setPlayers(allPlayers);
    });

    socket.on('player-left', (allPlayers) => {
      console.log(allPlayers);
      setPlayers(allPlayers);
    });

    socket.on('connected', (playerId, state) => {
      console.log('Player ID', playerId);
      console.log('Game State', state);
      setPlayerId(playerId);
      // setGameState(state);
    });

    // socket.on('game-state-changed', (state) => {
    //   // setGameState(state);
    //   console.log('changed');
    // });
    console.log('In Lobby');
    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <PlayerMenu players={players} playerId={playerId}></PlayerMenu>
    </div>
  );
};

export default GameLobby;
