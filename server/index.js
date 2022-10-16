const express = require('express');
const http = require('http');
const app = express();
const { Server } = require('socket.io');
const port = process.env.PORT || 3001;

// Prevent some possible connection errors with cors
const cors = require('cors');
app.use(cors());

const httpServer = http.createServer(app);


// SETUP IO SERVER
const io = module.exports.io = new Server(httpServer, {
  
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

app.get("/", (req, res) => res.type('html').send(html));

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Typer Pro Backend</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from DevMax!
    </section>
  </body>
</html>
`

httpServer.listen(port, () => {
  console.log('SERVER IS RUNNING DEVMAX');
})