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

httpServer.listen(3001, () => {
  console.log('SERVER IS RUNNING DEVMAX');
})