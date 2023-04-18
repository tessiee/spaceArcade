// VARIABLES
const animationBox = document.getElementById("animation-box");
let maxXstar = window.innerWidth - 100;

animationBox.innerHTML = `<canvas height="550" width = "${maxXstar}" class="head-animation" id="head-animation">
</canvas>
<canvas height="550" width = "${maxXstar}" class="alien-animation" id="alien-animation">
</canvas>`;

const headAnimationCanvas = document.getElementById("head-animation");
const alienAnimationCanvas = document.getElementById("alien-animation");
const ctxHeadAnimation = headAnimationCanvas.getContext("2d");
const ctxAlienAnimation = alienAnimationCanvas.getContext("2d");
const maxStars = 150,
  pause = 90;

let requestIdHeadAnimation, requestIdAlienAnimation;
let randomXstar, randomYstar;
let animationStarsArray = [],
  aliensArray3 = [],
  start = 0,
  side = 0,
  marginX = -50,
  directionA = 1,
  alienDY = 2;

//OBJECT CLASSES

class Alien3 {
  constructor(canvasName) {
    this.speed = 2.5 * directionA * (Math.random() * 1.6 + 1.0);
    this.x = maxXstar * side + marginX;
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = this.speed;
    this.dy = 0;
    this.size = 3;

    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x,
        this.y,
        this.size,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#FF0000",
        this.x - 1.5,
        this.y,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#FF0000",
        this.x + 1.5,
        this.y,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawEllipseObject(
        gameCanvas,
        "#FF0000",
        this.x,
        this.y + 4,
        10,
        2,
        0,
        0,
        Math.PI * 2,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 3,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 3,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 7,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 7,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 11,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 11,
        this.y + 4.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
    };

    this.reset = function (canvasName) {
      this.speed = 2.5 * directionA * (Math.random() * 1.6 + 1.0);
      this.x = maxXstar * side + marginX;
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = this.speed;
    };

    this.evade = function () {
      this.dx = 0;
      this.dy = alienDY;
    };

    this.continue = function () {
      this.dy = 0;
      this.dx = this.speed;
    };
  }
}

class animationStars {
  constructor() {
    this.x = randomXstar;
    this.y = randomYstar;
    this.radius = 2;
    this.color = "#3b2c00";

    this.draw = function (gameCanvas) {
      gameCanvas.beginPath();
      gameCanvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      gameCanvas.fillStyle = this.color;
      gameCanvas.fill();
      gameCanvas.closePath();
    };
  }
}

//ANIMATION FUNCTIONS

function setAnimationWidth() {
  maxXstar = window.innerWidth - 100;
  headAnimationCanvas.width = maxXstar;
  alienAnimationCanvas.width = maxXstar;
}

function fillAnimationStarsArray(gameCanvas, maxStars) {
  for (var i = 0; i < 100; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 250 + 0;
    animationStarsArray[i] = new animationStars();
    animationStarsArray[i].draw(gameCanvas);
  }
  for (var i = 100; i < 140; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 150 + 250;
    animationStarsArray[i] = new animationStars();
    animationStarsArray[i].draw(gameCanvas);
  }
  for (var i = 140; i < maxStars; i++) {
    randomXstar = Math.random() * maxXstar - 20 + 20;
    randomYstar = Math.random() * 150 + 400;
    animationStarsArray[i] = new animationStars();
    animationStarsArray[i].draw(gameCanvas);
  }
}

function fillAliensArray3(canvasName) {
  for (var i = 0; i < 5; i++) {
    aliensArray3[i] = new Alien3(canvasName);
    if (side == 0) {
      side = 1;
      marginX = 50;
      directionA = -1;
    } else {
      side = 0;
      marginX = -50;
      directionA = 1;
    }
  }
}

function drawAliensArray3(gameCanvas) {
  for (var i = 0; i < aliensArray3.length; i++) {
    aliensArray3[i].draw(gameCanvas);
  }
}

function moveAliensArray3(canvasName) {
  for (var i = 0; i < aliensArray3.length; i++) {
    aliensArray3[i].y += aliensArray3[i].dy;
    aliensArray3[i].x += aliensArray3[i].dx;

    if (aliensArray3[i].x > canvasName.width + 60 || aliensArray3[i].x < -60) {
      if (side == 0) {
        side = 1;
        marginX = 50;
        directionA = -1;
      } else {
        side = 0;
        marginX = -50;
        directionA = 1;
      }
      aliensArray3[i].reset(canvasName);
    }
  }
}

function alienEvasion(alienArray) {
  for (let alienOne = 0; alienOne < alienArray.length; alienOne++) {
    for (let alienTwo = 0; alienTwo < alienArray.length; alienTwo++) {
      if (alienOne !== alienTwo) {
        if (
          alienArray[alienOne].x > alienArray[alienTwo].x - 30 &&
          alienArray[alienOne].x < alienArray[alienTwo].x + 30 &&
          alienArray[alienOne].y > alienArray[alienTwo].y - 30 &&
          alienArray[alienOne].y < alienArray[alienTwo].y + 30
        ) {
          if (alienDY == 2) {
            alienDY = -2;
          } else {
            alienDY = 2;
          }

          alienArray[alienOne].evade();

          setTimeout(() => {
            alienArray[alienOne].continue();
          }, 200);
        }
      }
    }
  }
}

//DRAWIMG + ACTION FUNCTIONS

function drawHeadAnimation() {
  emptyCanvas(ctxHeadAnimation, headAnimationCanvas);
  fillAnimationStarsArray(ctxHeadAnimation, maxStars, animationStarsArray);
}

function headAnimationAction(current) {
  if (start === 0) {
    start = current;
  }

  if (current - start >= pause) {
    drawHeadAnimation();
    start = current;
  }
  requestIdHeadAnimation = requestAnimationFrame(headAnimationAction);
}

function drawAlienAnimation() {
  emptyCanvas(ctxAlienAnimation, alienAnimationCanvas);
  drawAliensArray3(ctxAlienAnimation, alienAnimationCanvas);
}

function headAlienAction() {
  drawAlienAnimation();
  moveAliensArray3(alienAnimationCanvas);
  alienEvasion(aliensArray3);
  requestIdAlienAnimation = requestAnimationFrame(headAlienAction);
}

//GET ANIMATION GOING

fillAliensArray3(alienAnimationCanvas);
requestIdHeadAnimation = requestAnimationFrame(headAnimationAction);
headAlienAction();
