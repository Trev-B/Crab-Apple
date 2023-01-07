import './App.css';
// import { useState, useEffect, useRef } from 'react';
import NavBar from './components/NavBar';
// import GameBoard from './components/GameBoard';
// import PlayerMenu from './components/PlayerMenu';
import CreateGameMenu from './components/CreateGameMenu';
import JoinGameMenu from './components/JoinGameMenu';
import Home from './components/Home';
import GameLobby from './components/GameLobby';
import { Route, Routes } from 'react-router-dom';
// import { io } from 'socket.io-client';
// const socket = io('ws://localhost:5000');

function App() {
  // const [players, setPlayers] = useState([]);
  // const [playerId, setPlayerId] = useState('');
  // const [gameState, setGameState] = useState(null);
  // const serverNameInput = useRef('');

  // useEffect(() => {
  //   socket.on('player-joined', (message) => {
  //     console.log(message);
  //     setPlayers(message);
  //   });

  //   socket.on('player-left', (message) => {
  //     console.log(message);
  //     setPlayers(message);
  //   });

  //   socket.on('connected', (message, state) => {
  //     console.log('Player ID', message);
  //     console.log('Game State', state);
  //     setPlayerId(message);
  //     setGameState(state);
  //   });

  //   socket.on('game-state-changed', (state) => {
  //     setGameState(state);
  //     console.log('changed');
  //   });
  // }, []);

  // const updateGameState = (e) => {
  //   e.preventDefault();
  //   const serverName = serverNameInput.current.value;
  //   if (!serverName) return;

  //   socket.emit('game-state-changed', serverName);
  //   console.log(serverName);
  // };

  return (
    <div className='flex flex-col items-center w-full h-screen bg-red-200'>
      <NavBar></NavBar>

      {/* {!gameState ? <></> : <h3>Server Name: {gameState.name}</h3>} */}

      {/* <form onSubmit={updateGameState}>
        <label>
          Change server name: <input ref={serverNameInput} type='text' />
        </label>
        <button>Submit</button>
      </form> */}
      {/* <PlayerMenu players={players} playerId={playerId}></PlayerMenu> */}
      {/* <GameBoard gameState={gameState}></GameBoard> */}

      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route
          path='/register'
          element={<Register setLoggedIn={setLoggedIn} />}
        /> */}
        {/* <Route path='/login' element={<Login setLoggedIn={setLoggedIn} />} /> */}
        <Route path='/create-game' element={<CreateGameMenu />} />
        <Route path='/join-game' element={<JoinGameMenu />} />
        <Route path='/game-lobby' element={<GameLobby />}></Route>
      </Routes>
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
