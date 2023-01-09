import React, { useEffect, useState } from 'react';
import PlayerMenu from './PlayerMenu';
import { joinRoom } from '../utils/connect';
import { useParams } from 'react-router-dom';

const PlayerGameLobby = () => {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const disconnect = joinRoom(id, setPlayers, setPlayerId);
    return () => disconnect();
  }, []);

  return (
    <div>
      Player Room ID: {id}
      <PlayerMenu players={players} playerId={playerId}></PlayerMenu>
    </div>
  );
};

export default PlayerGameLobby;
