const _GAME = document.getElementById("game");
const _CONTEXT = _GAME.getContext("2d");
const _W_GAME = 1366;
const _H_GAME = 720;

const _W_GUN = 76;
const _H_GUN = 256;

const _W_ROCKET = 86;
const _H_ROCKET = 256

const _GAME_FPS = 16; // 60 fps

let _GUN_ROTATE_DEGS = 0;

const gun = new Image(_W_GUN, _H_GUN);
gun.src = "gun.png";
gun.onload = () => {this.ready=true;};


const drawEnvironement = () => {
  // Create gradient
  var grd = _CONTEXT.createLinearGradient(0, 0, 0, 100);
  grd.addColorStop(0, "#E87A28");
  grd.addColorStop(1, "#0E0F1E");

  // Fill with gradient
  _CONTEXT.fillStyle = grd;
  _CONTEXT.fillRect(0, 0, _W_GAME, _H_GAME);
};

const drawDot = (x, y) =>{
    _CONTEXT.arc(x, y, 5, 0, 2 * Math.PI);
    _CONTEXT.fillStyle = 'red';
    _CONTEXT.fill();
};
const renderGun = () => {
    const floatH = 10;
    const posY = (_H_GAME - _H_GUN) - floatH;
    const posX = (_W_GAME / 2) - (_W_GUN / 2);

    const gunRotX = posX + (_W_GUN / 2);
    const gunRotY = posY + _H_GUN;

    _CONTEXT.save();
    drawEnvironement();
    drawDot(gunRotX, gunRotY);
    _CONTEXT.translate(gunRotX, gunRotY);
    _CONTEXT.rotate(_GUN_ROTATE_DEGS * Math.PI / 360);
    _CONTEXT.translate(-gunRotX, -gunRotY);
    _CONTEXT.drawImage(gun, posX, posY, _W_GUN, _H_GUN);

    _CONTEXT.restore();
  
};


const goRight = () =>{
	_GUN_ROTATE_DEGS -= 15;
};

const goLeft = () =>{
	_GUN_ROTATE_DEGS += 16;
};

document.onkeydown = checkKey;

function checkKey(e) {
    var event = window.event ? window.event : e;
    if(event.keyCode === 37){
    	goRight();
    }else if(event.keyCode === 39){
    	goLeft();
    }
}

setInterval(()=>{
  renderGun();
}, 16);


