// HEADER ANIMATION
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
let requestIdHeadAnimation;
let requestIdAlienAnimation;
let animationStarsArray = [];
let aliensArray3 = [];
let particles = [];
let maxStars = 150;
let pause = 90;
let start = 0;
let randomXstar;
let randomYstar;
let side = 0;
let marginX = -50;
let directionA = 1;
let AC;

class Particle {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 1;
  }
  draw() {
    ctxAlienAnimation.save();
    ctxAlienAnimation.globalAlpha = this.alpha;
    ctxAlienAnimation.fillStyle = "red";
    ctxAlienAnimation.beginPath();
    ctxAlienAnimation.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctxAlienAnimation.fill();
    ctxAlienAnimation.restore();
  }
  update() {
    this.draw();
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
  }
}

class Alien3 {
  constructor(canvasName) {
    this.x = maxXstar * side + marginX;
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = 2.5 * directionA * (Math.random() * 1.6 + 1.0);
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
      this.x = maxXstar * side + marginX;
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = 2.5 * directionA * (Math.random() * 1.6 + 1.0);
    };
  }
}

class animationStars {
  constructor() {
    this.x = randomXstar;
    this.y = randomYstar;
    this.radius = 1;
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
  for (var i = 0; i < 3; i++) {
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

function resetAliensArray3(canvasName) {
  for (var i = 0; i < aliensArray3.length; i++) {
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

function alienCollision(AC, canvasName) {
  for (let AI = 0; AI < aliensArray3.length; AI++) {
    if (AC !== AI) {
      if (
        aliensArray3[AC].x > aliensArray3[AI].x - 10 &&
        aliensArray3[AC].x < aliensArray3[AI].x + 10 &&
        aliensArray3[AC].y > aliensArray3[AI].y - 10 &&
        aliensArray3[AC].y < aliensArray3[AI].y + 10
      ) {
        for (i = 0; i <= 150; i++) {
          let dx = (Math.random() - 0.5) * Math.random();
          let dy = (Math.random() - 0.5) * Math.random();
          let radius = Math.random() * 2;
          let particle = new Particle(
            aliensArray3[AC].x,
            aliensArray3[AC].y,
            radius,
            dx,
            dy
          );

          particles.push(particle);
        }
        aliensArray3[AI].dx = 0;
        aliensArray3[AC].dx = 0;
        explode();
        setTimeout(() => {
          aliensArray3[AC].reset(canvasName);
          aliensArray3[AI].reset(canvasName);
        }, 500);
      }
    }
  }
}

function explode() {
  particles.forEach((particle, i) => {
    if (particle.alpha <= 0) {
      particles.splice(i, 1);
    } else particle.update();
  });

  requestAnimationFrame(explode);
}

fillAliensArray3(alienAnimationCanvas);

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
requestIdHeadAnimation = requestAnimationFrame(headAnimationAction);

function drawAlienAnimation() {
  emptyCanvas(ctxAlienAnimation, alienAnimationCanvas);
  drawAliensArray3(ctxAlienAnimation, alienAnimationCanvas);
}

function headAlienAction() {
  drawAlienAnimation();
  moveAliensArray3(alienAnimationCanvas);
  alienCollision(0, alienAnimationCanvas);
  alienCollision(1, alienAnimationCanvas);
  alienCollision(2, alienAnimationCanvas);
  requestIdAlienAnimation = requestAnimationFrame(headAlienAction);
}
headAlienAction();