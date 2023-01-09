import React, { useEffect, useState } from 'react';
import PlayerMenu from './PlayerMenu';
import { createRoom } from '../utils/connect';
import { useParams } from 'react-router-dom';

const HostGameLobby = () => {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState('');
  // const [roomId, setRoomId] = useState('');
  const { id } = useParams();
  // const [gameState, setGameState] = useState(null);

  useEffect(() => {
    const disconnect = createRoom(id, setPlayers, setPlayerId);
    return () => disconnect();
  }, []);

  return (
    <div>
      Host Room ID: {id}
      <PlayerMenu players={players} playerId={playerId}></PlayerMenu>
    </div>
  );
};

export default HostGameLobby;

// console.log(s);
// s.disconnect();
// setSocket(s);
// if (!socket) console.log("Couldn't connect to Lobby");
// const socket = io('ws://localhost:5000');

// socket.on('player-joined', (allPlayers) => {
//   console.log(allPlayers);
//   setPlayers(allPlayers);
// });

// socket.on('player-left', (allPlayers) => {
//   console.log(allPlayers);
//   setPlayers(allPlayers);
// });

// socket.on('connected', (playerId, state) => {
//   console.log('Player ID', playerId);
//   console.log('Game State', state);
//   setPlayerId(playerId);
//   // setGameState(state);
// });

// socket.on('game-state-changed', (state) => {
//   // setGameState(state);
//   console.log('changed');
// });
// console.log('In Lobby');
