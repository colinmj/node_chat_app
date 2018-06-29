const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

console.log(io);

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'Colin',
    text: 'Oh hey there guy',
    createdAt: 123123
  });

  socket.on('createMessage', message => {
    console.log('it worked', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Up and running on port ${port}`);
});

console.log(publicPath);
