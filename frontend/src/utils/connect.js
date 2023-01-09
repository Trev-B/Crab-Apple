import { io } from 'socket.io-client';
const port = 'localhost:5000/';

const createRoom = (room, setPlayers, setPlayerId) => {
  const socket = io(`ws://${port}`);
  socket.emit('create-room', Number(room));

  socket.on('host-connected', (playerId) => {
    console.log('Player ID', playerId);
    setPlayerId(playerId);
  });

  socket.on('player-joined', (allPlayers) => {
    console.log(allPlayers);
    setPlayers(allPlayers);
  });

  socket.on('player-left', (allPlayers) => {
    console.log(allPlayers);
    setPlayers(allPlayers);
  });

  // socket.on('host-player-left', (allPlayers) => {
  //   console.log(allPlayers);
  //   setPlayers(allPlayers);
  // });

  return () => socket.disconnect();
};

const joinRoom = (room, setPlayers, setPlayerId) => {
  const socket = io(`ws://${port}`);
  socket.emit('join-room', Number(room));

  socket.on('player-connected', (playerId) => {
    console.log('Player ID', playerId);
    setPlayerId(playerId);
  });

  socket.on('player-joined', (allPlayers) => {
    console.log(allPlayers);
    setPlayers(allPlayers);
  });

  socket.on('player-left', (allPlayers) => {
    console.log(allPlayers);
    setPlayers(allPlayers);
  });

  socket.on('host-left', () => {
    console.log('Host left');
  });

  return () => socket.disconnect();
};

const createRoomApi = async () => {
  const res = await fetch(`http://${port}create-room`);
  const ans = await res.json();
  if (!ans.roomId) {
    console.log('Game Failed');
    return null;
  }
  return ans.roomId;
};

const joinRoomApi = async (room) => {
  const res = await fetch(`http://${port}join-room`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ room: Number(room) }),
  });
  const ans = await res.json();
  if (!ans.room) {
    console.log(`Room ${room} does not exist`);
    return null;
  }
  return ans.room;
};

export { joinRoom, createRoom, createRoomApi, joinRoomApi };

// const connectToLobby = async (setPlayers, setPlayerId, setRoomId) => {
//   // const res = await fetch(`http://${port}create-game`);
//   // const ans = await res.json();
//   // if (!ans.data) {
//   //   console.log('Game Failed');
//   //   return null;
//   // }
//   // console.log(ans.data);

//   return createRoom(setPlayers, setPlayerId, setRoomId);
// };
