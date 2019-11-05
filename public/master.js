// const socket = io('http://192.168.0.15:3000');
// const socket = io('http://localhost:3000');
const socket = io.connect();

socket.on('message', (data) => {
  console.log(data);
});

const nextSlide = () => {  
  socket.emit('next', "next Slide");
};

const prevSlide = () => {  
  socket.emit('prev', "prev Slide");
};

const upSlide = () => {  
  socket.emit('up', "up Slide");
};

const downSlide = () => {  
  socket.emit('down', "down Slide");
};

const detectswipe = (el,func) => {
  swipe_det = new Object();
  swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  var min_x = 30;  //min x swipe for horizontal swipe
  var max_x = 30;  //max x difference for vertical swipe
  var min_y = 50;  //min y swipe for vertical swipe
  var max_y = 60;  //max y difference for horizontal swipe
  var direc = "";
  ele = document.getElementById(el);
  ele.addEventListener('touchstart',function(e){
    var t = e.touches[0];
    swipe_det.sX = t.screenX; 
    swipe_det.sY = t.screenY;
  },false);
  ele.addEventListener('touchmove',function(e){
    e.preventDefault();
    var t = e.touches[0];
    swipe_det.eX = t.screenX; 
    swipe_det.eY = t.screenY;    
  },false);
  ele.addEventListener('touchend',function(e){
    //horizontal detection
    if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
      if(swipe_det.eX > swipe_det.sX) direc = "r";
      else direc = "l";
    }
    //vertical detection
    else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
      if(swipe_det.eY > swipe_det.sY) direc = "d";
      else direc = "u";
    }

    if (direc != "") {
      if(typeof func == 'function') func(el,direc);
    }
    direc = "";
    swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
  },false);  
};

const swipeDirection = (el,d) => {
  switch(d) {
    case "u":
      downSlide();
      break;
    case "l":
      nextSlide();
      break;
    case "r":
      prevSlide();
      break;
    case "d":
      upSlide();
      break;
    default:
      console.log("something went wrong");
      break;
  }
};

detectswipe('box', swipeDirection);