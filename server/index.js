const express = require('express');
const http = require('http');
const app = express();
const { Server } = require('socket.io');

// Prevent some possible connection errors with cors
const cors = require('cors');
app.use(cors());

const httpServer = http.createServer(app);


// SETUP IO SERVER
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }
})

io.on('connection', (socket) => {
  console.log('user connected:', socket.id);

  // ON SEND MESSAGE
  socket.on('send_message', ({ message }) => {
    socket.to(socket.room).emit('receive_message', { message, nickname: socket.nickname})
    socket.emit('receive_message', { message, nickname: socket.nickname})
  })

  // ON JOIN ROOM
  socket.on('join_room', ({ room, nickname }) => {
    console.log(`User "${nickname}" joined room: "${room}"`)
    socket.nickname = nickname;
    socket.room = room;
    socket.join(room);
    socket.emit('room_joined', {room, nickname});
    socket.emit('receive_message', {message: `---- joined ${room}`, nickname});
    socket.to(room).emit('receive_message', {message: `---- joined ${room}`, nickname});
  })
})

httpServer.listen(3001, () => {
  console.log('SERVER IS RUNNING DEVMAX');
})