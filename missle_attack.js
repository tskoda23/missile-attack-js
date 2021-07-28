const _GAME = document.getElementById("game");
const _CONTEXT = _GAME.getContext("2d");
const _W_GAME = 1366
const _H_GAME = 720

const _W_GUN = 64;
const _H_GUN = 64;

const drawEnvironement = () => {
  // Create gradient
  var grd = _CONTEXT.createLinearGradient(0, 0, 0, 100);
  grd.addColorStop(0, "#E87A28");
  grd.addColorStop(1, "#0E0F1E");

  // Fill with gradient
  _CONTEXT.fillStyle = grd;
  _CONTEXT.fillRect(0, 0, _W_GAME, _H_GAME);
};

const renderGun = () => {
  const img = new Image(_W_GUN, _H_GUN);
  img.src = "gun.png";

  const floatH = 10;
  const posY = (_H_GAME - _H_GUN) - floatH;
  const posX = (_W_GAME / 2) - (_W_GUN / 2);

  img.onload = () => {
    _CONTEXT.drawImage(img, posX, posY, _W_GUN, _H_GUN);
  }
};

drawEnvironement();
renderGun();
