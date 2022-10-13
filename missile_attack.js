const _GAME = document.getElementById("game");
const _CONTEXT = _GAME.getContext("2d");

const _W_GAME = 1366;
const _H_GAME = 720;

const _W_GUN = 76;
const _H_GUN = 256;

const _W_ROCKET = 86 / 3;
const _H_ROCKET = 256 / 3;

// THIS SHOULDN'T CHANGE GAME SPEED?

const _GAME_FPS = 120;
const _ROCKET_SPEED = 10;

const drawDot = (x, y) => {
  _CONTEXT.arc(x, y, 5, 0, 2 * Math.PI);
  _CONTEXT.fillStyle = "red";
  _CONTEXT.fill();
};

const renderGame = () => {
  _CONTEXT.clearRect(0, 0, _W_GAME, _H_GAME);
  checkKeysPressed();
  renderGun();
  renderRocket();
};

let _GUN_ROTATE_DEGS = 0;

const gun = new Image(_W_GUN, _H_GUN);
gun.src = "gun.png";
gun.onload = () => {
  this.ready = true;
};

const renderGun = () => {
  _CONTEXT.save();
  const floatH = 10;
  const posY = _H_GAME - _H_GUN - floatH;
  const posX = _W_GAME / 2 - _W_GUN / 2;

  const gunRotX = posX + _W_GUN / 2;
  const gunRotY = posY + _H_GUN;
  drawDot(gunRotX, gunRotY);
  _CONTEXT.translate(gunRotX, gunRotY);
  _CONTEXT.rotate((_GUN_ROTATE_DEGS * Math.PI) / 360);
  _CONTEXT.translate(-gunRotX, -gunRotY);
  _CONTEXT.drawImage(gun, posX, posY, _W_GUN, _H_GUN);
  _CONTEXT.restore();
};

const goRight = () => {
  _GUN_ROTATE_DEGS += 15;
};

const goLeft = () => {
  _GUN_ROTATE_DEGS -= 16;
};

let _ROCKET_FIRED = false;

let _ROCKETS = [];

const fireRocket = () => {
  _ROCKETS.push({
    degs: _GUN_ROTATE_DEGS,
    fired: true,
    distance: 0,
    destroyed: false,
  });
};

const _ROCKET = new Image(_W_ROCKET, _H_ROCKET);
_ROCKET.src = "rocket.png";
_ROCKET.onload = () => {
  this.ready = true;
};

const renderRocket = () => {
  for (const rocket of _ROCKETS) {
    if (rocket.fired && !rocket.destroyed) {
      _CONTEXT.save();
      const floatH = 10;
      const posY = _H_GAME - _H_ROCKET - floatH;
      const posX = _W_GAME / 2 - _W_ROCKET / 2;

      const rocketRotX = posX + _W_ROCKET / 2;
      const rocketRotY = posY + _H_ROCKET;

      // ROTATE
      _CONTEXT.translate(rocketRotX, rocketRotY);
      _CONTEXT.rotate((rocket.degs * Math.PI) / 360);
      _CONTEXT.translate(-rocketRotX, -rocketRotY);

      const moveX = posX;
      const moveY = posY - rocket.distance;

      _CONTEXT.drawImage(_ROCKET, moveX, moveY, _W_ROCKET, _H_ROCKET);

      rocket.distance += _ROCKET_SPEED;

      // CHANGE THIS TO ADD COLLISIONS
      if (rocket.distance > 500) {
        rocket.destroyed = true;
      }
      _CONTEXT.restore();
    }
  }

  _ROCKETS = _ROCKETS.filter((rocket) => !rocket.destroyed);
};

const _RIGHT_ARROW = "ArrowRight";
const _LEFT_ARROW = "ArrowLeft";
const _SPACEBAR = " ";

const _PRESSED_KEYS = {
  _RIGHT_ARROW: false,
  _LEFT_ARROW: false,
  _SPACEBAR: false,
};

const checkKeysPressed = () => {
  if (_PRESSED_KEYS[_RIGHT_ARROW]) {
    goRight();
  }

  if (_PRESSED_KEYS[_LEFT_ARROW]) {
    goLeft();
  }
};

const checkKeyDown = (e) => {
  if (e.key === _RIGHT_ARROW) {
    _PRESSED_KEYS[_RIGHT_ARROW] = true;
  }

  if (e.key === _LEFT_ARROW) {
    _PRESSED_KEYS[_LEFT_ARROW] = true;
  }

  // THIS EVENT DOESNT DEPEND ON HOLIDNG THE KEY
  if (e.key === _SPACEBAR) {
    fireRocket();
  }
};

const checkKeyUp = (e) => {
  if (e.key === _RIGHT_ARROW) {
    _PRESSED_KEYS[_RIGHT_ARROW] = false;
  }

  if (e.key === _LEFT_ARROW) {
    _PRESSED_KEYS[_LEFT_ARROW] = false;
  }
};

document.addEventListener("keydown", checkKeyDown);
document.addEventListener("keyup", checkKeyUp);

_RENDER_INTERVAL = 1000 / _GAME_FPS;

setInterval(() => {
  renderGame();
}, _RENDER_INTERVAL);
