const express = require('express');
const socketio = require('socket.io');

const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// websockets
const io = socketio.listen(server);

// settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname,'public')));

// start the sever
server.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
})

io.on('connection', (socket) => {
  io.sockets.emit('message',"Welcome to Revealer");

  socket.on('next', (data) => {    
    socket.broadcast.emit('next', data);
  });

  socket.on('prev', (data) => {    
    socket.broadcast.emit('prev', data);
  });

  socket.on('up', (data) => {    
    socket.broadcast.emit('up', data);
  });

  socket.on('down', (data) => {    
    socket.broadcast.emit('down', data);
  });
});

app.get('/client', function(req, res) {
  res.sendFile(path.join(__dirname+'/public/client.html'));
});