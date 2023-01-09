const cors = require('cors');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});

const { GameState, sendCurrentPlayers } = require('./models/GameState');
const roomList = new Map();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

app.get('/create-room', (req, res) => {
  const roomNum = Math.floor(Math.random() * 1000000);
  roomList.set(roomNum, new Set());
  res.status(200).send({ roomId: roomNum });
});

app.post('/join-room', (req, res) => {
  const room = req.body.room;
  if (!roomList.has(room))
    return res.status(404).send({ msg: 'Room not found' });
  res.status(200).send({ room });
});

io.on('connection', (socket) => {
  // Host created room XXX
  socket.on('create-room', (room) => {
    console.log(roomList);
    if (!roomList.has(room)) {
      console.log(`Requested room ${room} not found`);
      return;
    }
    roomList.get(room).add(socket.id);
    console.log(`User ${socket.id} has created room ${room}`);
    socket.join([room]);
    console.log(roomList.get(room));

    socket.emit('host-connected', socket.id, room);

    io.to(room).emit('player-joined', sendCurrentPlayers(roomList.get(room)));

    io.to(room).emit('player-left', sendCurrentPlayers(roomList.get(room)));

    socket.on('disconnect', () => {
      roomList.delete(room);
      io.to(room).emit('host-left', 'HOST_LEFT');
      io.in(room).socketsLeave(roomList);
      console.log(`Room ${room} has been closed`);
    });
  });

  // Player joined room XXX
  socket.on('join-room', (room) => {
    if (!roomList.has(room)) {
      console.log(`Room ${room} was not found`);
      return;
    }

    console.log(`User ${socket.id} joined room ${room}`);
    socket.join([room]);
    roomList.get(room).add(socket.id);

    socket.emit('player-connected', socket.id, room);

    io.to(room).emit('player-joined', sendCurrentPlayers(roomList.get(room)));

    socket.on('disconnect', () => {
      if (!roomList.has(room)) {
        console.log(`Room ${room} no longer exists`);
        return;
      }
      roomList.get(room).delete(socket.id);
      io.to(room).emit('player-left', sendCurrentPlayers(roomList.get(room)));
      console.log(`User ${socket.id} left room ${room}`);
    });
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`app is open on port ${port}`);
});

// socket.on('hello server', (...args) => {
//   console.log(args);
//   socket.emit('hello client', `hello user ${socket.id}`);
// });

// socket.on('game-state-changed', (state) => {
//   console.log(state);
//   gameState.name = state;
//   io.emit('game-state-changed', gameState);
// });

// const black_cards = ['1', '2', '3', '4', '5', '6'];
// const white_cards = ['a', 'b', 'c', 'd', 'e', 'f'];
// const gameState = new GameState(
//   black_cards,
//   white_cards,
//   sendCurrentPlayers(userList)
// );
