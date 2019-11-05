// const socket = io('http://192.168.0.15:3000');
// const socket = io('http://localhost:3000');
const socket = io.connect();

socket.on('next', (data) => {  
  Reveal.next();
});

socket.on('prev', (data) => {
  Reveal.prev();
});

socket.on('up', (data) => {
  Reveal.up();
});

socket.on('down', (data) => {
  Reveal.down();
});