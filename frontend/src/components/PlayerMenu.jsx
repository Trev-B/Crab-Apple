import React from 'react';

const PlayerMenu = ({ players, playerId }) => {
  return (
    <div>
      <h3>Player ID: {playerId}</h3>
      <div className='bg-red-300 px-1 py-1 mt-1'>
        Current Players:
        {players.map((player) => (
          <div key={player}>{player}</div>
        ))}
      </div>
    </div>
  );
};

export default PlayerMenu;
