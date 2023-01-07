const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
  },
});
const { GameState, sendCurrentPlayers } = require('./models/GameState');

const userList = new Set();
const black_cards = ['1', '2', '3', '4', '5', '6'];
const white_cards = ['a', 'b', 'c', 'd', 'e', 'f'];
const gameState = new GameState(
  black_cards,
  white_cards,
  sendCurrentPlayers(userList)
);

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

io.on('connection', (socket) => {
  userList.add(socket.id);
  console.log(`User ${socket.id} has joined`);
  console.log(userList);

  socket.emit('connected', socket.id, sendCurrentPlayers(userList));
  io.emit('player-joined', sendCurrentPlayers(userList));

  // socket.on('game-state-changed', (state) => {
  //   console.log(state);
  //   gameState.name = state;
  //   io.emit('game-state-changed', gameState);
  // });

  socket.on('disconnect', () => {
    userList.delete(socket.id);
    io.emit('player-left', sendCurrentPlayers(userList));
    console.log(`User ${socket.id} has left`);
    console.log(userList);
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
