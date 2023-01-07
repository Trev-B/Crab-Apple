import './App.css';
import { io } from 'socket.io-client';
import { useState, useEffect, useRef } from 'react';
import NavBar from './components/NavBar';
import GameBoard from './components/GameBoard';
import PlayerMenu from './components/PlayerMenu';
const socket = io('ws://localhost:5000');

function App() {
  const [players, setPlayers] = useState([]);
  const [playerId, setPlayerId] = useState('');
  const [gameState, setGameState] = useState(null);
  const serverNameInput = useRef('');

  useEffect(() => {
    socket.on('player-joined', (message) => {
      console.log(message);
      setPlayers(message);
    });

    socket.on('player-left', (message) => {
      console.log(message);
      setPlayers(message);
    });

    socket.on('connected', (message, state) => {
      console.log('Player ID', message);
      console.log('Game State', state);
      setPlayerId(message);
      setGameState(state);
    });

    socket.on('game-state-changed', (state) => {
      setGameState(state);
      console.log('changed');
    });
  }, []);

  const updateGameState = (e) => {
    e.preventDefault();
    const serverName = serverNameInput.current.value;
    if (!serverName) {
      return;
    }
    socket.emit('game-state-changed', serverName);
    console.log(serverName);
  };

  return (
    <div className='flex flex-col items-center w-full bg-red-200'>
      <NavBar></NavBar>
      {/* <button className='bg-blue-100 rounded px-1 py-1 '>Host Game</button>
      <button className='bg-red-100 rounded px-1 py-1'>Join Game</button> */}

      {!gameState ? <></> : <h3>Server Name: {gameState.name}</h3>}

      <form onSubmit={updateGameState}>
        <label>
          Change server name: <input ref={serverNameInput} type='text' />
        </label>
        <button>Submit</button>
      </form>
      <PlayerMenu players={players} playerId={playerId}></PlayerMenu>
      <GameBoard gameState={gameState}></GameBoard>
    </div>
  );
}

export default App;

// send a message to the server
// socket.emit('hello server', 'what is up server');

// receive a message from the server

// socket.on('hello client', (...args) => {
//   console.log(args);
// });
