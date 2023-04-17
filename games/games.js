//GAMES GENERAL
let gamePlayed;
let gamePlayed2;
let gameover1 = document.getElementById("game-over1");
let gameover2 = document.getElementById("game-over2");
let gameover3 = document.getElementById("game-over3");
let gameOverScreens = document.querySelectorAll(".game-over");
let games = new Array(3);
let gameButtons = new Array(games.length);
let infoGames = new Array(games.length);
let gameBoxes = new Array(games.length);
let gameControls = new Array(games.length);
let showGameControls = new Array(games.length);
let gameOverArr = new Array(
  document.getElementById("game-over1"),
  document.getElementById("game-over2"),
  document.getElementById("game-over3")
);
let gameAgainYes = new Array(games.length);
let gameAgainNo = new Array(games.length);
let startGameScreens = new Array(games.length);
let startGameBtns = new Array(games.length);

function fillGameArrays() {
  for (x = 0; x < games.length; x++) {
    games[x] = document.getElementById(`theGame${x + 1}`);
    gameButtons[x] = document.getElementById(`playGame${x + 1}`);
    infoGames[x] = document.getElementById(`game${x + 1}Info`);
    gameBoxes[x] = document.getElementById(`game${x + 1}Box`);
    gameControls[x] = document.getElementById(`controls${x + 1}`);
    showGameControls[x] = document.getElementById(`show-controls${x + 1}`);
    startGameScreens[x] = document.getElementById(`start-game${x + 1}`);
    startGameBtns[x] = document.getElementById(`start-btn${x + 1}`);
  }
}
fillGameArrays();

function showStartGameScreen(x) {
  startGameScreens[x].classList.remove("hide-screen");
}

function hideStartGameScreen() {
  for (x = 0; x < startGameScreens.length; x++) {
    startGameScreens[x].classList.add("hide-screen");
  }
}

function addStartGameBtnEventListeners() {
  for (x = 0; x < startGameBtns.length; x++) {
    startGameBtns[x].addEventListener("click", clickStartGameBtn);
  }
}
addStartGameBtnEventListeners();

function clickStartGameBtn() {
  let startGameScreen = event.target.parentElement;
  let gameStartGameScreen = startGameScreen.parentElement.id;

  startGameScreen.classList.add("hide-screen");
  resetAllGames();

  switch (gameStartGameScreen) {
    case "game1":
      game1Action();
      break;
    case "game2":
      game2Action();
      break;
    case "game3":
      game3Action();
      break;
  }
}

function addControlsBtnEventListeners() {
  for (x = 0; x < showGameControls.length; x++) {
    showGameControls[x].addEventListener("mouseenter", showTheGameControls);
    gameControls[x].addEventListener("mouseleave", showTheGameControls);
  }
}
addControlsBtnEventListeners();

function hideControlsBtn() {
  for (x = 0; x < gameControls.length; x++) {
    showGameControls[x].classList.add("hide-btn");
  }
}

function showControlsBtn(x) {
  showGameControls[x].classList.remove("hide-btn");
}

function showTheGameControls() {
  let x;
  switch (gamePlayed) {
    case "game1":
      x = 0;
      break;
    case "game2":
      x = 1;
      break;
    case "game3":
      x = 2;
      break;
  }
  gameControls[x].classList.contains("hide-controls")
    ? gameControls[x].classList.remove("hide-controls")
    : gameControls[x].classList.add("hide-controls");
}

function gameOverClose() {
  for (x = 0; x < gameOverArr.length; x++) {
    gameOverArr[x].classList.add("hide-screen");
  }
}

function gameOverAgain() {
  let gameOverScreen = event.target.parentElement;
  let gameOverGame = gameOverScreen.parentElement.id;

  gameOverScreen.classList.add("hide-screen");
  resetAllGames();

  switch (gameOverGame) {
    case "game1":
      game1Action();
      break;
    case "game2":
      game2Action();
      break;
    case "game3":
      game3Action();
      break;
  }
}

function getGameAgainButtons() {
  let againYes = document.querySelectorAll(".play-yes");
  let againNo = document.querySelectorAll(".play-no");
  for (x = 0; x < gameAgainYes.length; x++) {
    againYes.forEach(() => {
      gameAgainYes[x] = againYes.item(x);
      againYes.item(x).addEventListener("click", gameOverAgain);
    });
  }
  for (x = 0; x < gameAgainNo.length; x++) {
    againNo.forEach(() => {
      gameAgainNo[x] = againNo.item(x);
      againNo.item(x).addEventListener("click", closeGames);
      againNo.item(x).addEventListener("click", gameLightOff);
      againNo.item(x).addEventListener("click", gameOverClose);
      againNo.item(x).addEventListener("click", closePlayedGame);
    });
  }
}
getGameAgainButtons();

function closeGames() {
  for (x = 0; x < games.length; x++) {
    games[x].classList.add("hide-game");
  }
  hideStartGameScreen();
  gameOverClose();
  startBtn();
  hideControlsBtn();
  resetAllGames();
  enableScrolling();
}

function resetAllGames() {
  resetGame1();
  resetGame2();
  resetGame3();
}

function startGame() {
  closeGames();
  gamePlayed = event.target.parentElement.id;
  const pick =
    "the" + (gamePlayed.charAt(0).toUpperCase() + gamePlayed.slice(1));
  const game = document.getElementById(pick);
  game.classList.remove("hide-game");
  gameLightOff();
  disableScrollingInGame();

  switch (gamePlayed) {
    case "game1":
      game1Action();
      showControlsBtn(0);
      showStartGameScreen(0);
      break;
    case "game2":
      game2Action();
      showControlsBtn(1);
      showStartGameScreen(1);
      break;
    case "game3":
      game3Action();
      showControlsBtn(2);
      showStartGameScreen(2);
      break;
  }
}

function getOffset(element) {
  const position = element.getBoundingClientRect();
  return {
    left: position.left + window.scrollX,
    top: position.top + window.scrollY,
  };
}

const topGame1 = getOffset(game1).top;
const topGame2 = getOffset(game2).top;
const topGame3 = getOffset(game3).top;

function disableScrollingInGame() {
  let x = window.scrollX;
  let y;
  let margin;
  gamePlayed = event.target.parentElement.id;

  if (window.innerHeight < 700) {
    margin = 0.98;
  } else {
    margin = 0.84;
  }

  switch (gamePlayed) {
    case "game1":
      y = topGame1 * margin;
      break;
    case "game2":
      y = topGame2 * margin;
      break;
    case "game3":
      y = topGame3 * margin;
      break;
  }

  window.scrollTo(x, y);
  window.onscroll = function () {
    window.scrollTo(x, y);
  };
}

function enableScrolling() {
  window.onscroll = function () {};
}

function closePlayedGame() {
  if (gamePlayed == gamePlayed2) {
    closeGames();
    gamePlayed2 = undefined;
  } else {
    gamePlayed2 = event.target.parentElement.id;
  }
}

function startBtn() {
  for (x = 0; x < gameButtons.length; x++) {
    gameButtons[x].innerText = "Play game";
    gameButtons[x].classList.remove("inGame");
  }
}

function endBtn() {
  const button = document.getElementById(`${event.target.id}`);
  if (button.innerText == "Play game") {
    button.innerText = "End game";
    button.classList.add("inGame");
  }
}

function gameLightOff() {
  for (x = 0; x < games.length; x++) {
    if (games[x].classList.contains("hide-game")) {
      infoGames[x].classList.remove("highlightGame");
      gameBoxes[x].classList.remove("highlightGame");
    }
  }
}

function highLightGame() {
  let pick = event.target.parentElement.id;
  console.log(pick);
  const gameBox = document.getElementById(`${pick}Box`);
  const gameInfo = document.getElementById(`${pick}Info`);
  const game = document.getElementById(
    `the${(pick.charAt(0).toUpperCase() + pick.slice(1))}`
  );
  console.log(pick);

  if (game.classList.contains("hide-game")) {
    gameInfo.classList.contains("highlightGame")
      ? (gameInfo.classList.remove("highlightGame"),
        gameBox.classList.remove("highlightGame"))
      : (gameInfo.classList.add("highlightGame"),
        gameBox.classList.add("highlightGame"));
  }
}

function gamesEventListeners() {
  for (x = 0; x < gameButtons.length; x++) {
    gameButtons[x].addEventListener("click", startGame);
    gameButtons[x].addEventListener("click", endBtn);
    gameButtons[x].addEventListener("click", closePlayedGame);
    gameButtons[x].addEventListener("mouseenter", highLightGame);
    gameButtons[x].addEventListener("mouseleave", highLightGame);
  }
}
gamesEventListeners();

//Drawing functions

function drawRoundObject(
  gameCanvas,
  objectColour,
  objectX,
  objectY,
  radius,
  startAngle,
  endAngle,
  counterClockwise
) {
  gameCanvas.beginPath();
  gameCanvas.arc(
    objectX,
    objectY,
    radius,
    startAngle,
    endAngle,
    counterClockwise
  );
  gameCanvas.fillStyle = objectColour;
  gameCanvas.fill();
  gameCanvas.closePath();
}

function drawEllipseObject(
  gameCanvas,
  objectColour,
  objectX,
  objectY,
  radiusX,
  radiusY,
  rotation,
  startAngle,
  endAngle,
  counterClockwise
) {
  gameCanvas.beginPath();
  gameCanvas.ellipse(
    objectX,
    objectY,
    radiusX,
    radiusY,
    rotation,
    startAngle,
    endAngle,
    counterClockwise
  );
  gameCanvas.fillStyle = objectColour;
  gameCanvas.fill();
  gameCanvas.closePath();
}

function drawRectObject(
  gameCanvas,
  objectColour,
  objectX,
  objectY,
  objectW,
  objectH
) {
  gameCanvas.beginPath();
  gameCanvas.rect(objectX, objectY, objectW, objectH);
  gameCanvas.fillStyle = objectColour;
  gameCanvas.fill();
  gameCanvas.closePath();
}

function drawEarth(canvasName, gameCanvas) {
  const earth = {
    x: 0,
    y: canvasName.height - 5,
    w: canvasName.width,
    h: 5,
  };
  drawRectObject(gameCanvas, "#003b00", earth.x, earth.y, earth.w, earth.h);
}

function drawScore(gameCanvas, canvasName, gameScore) {
  gameCanvas.fillStyle = "#FF0000";
  gameCanvas.fillText(`Score: ${gameScore}`, canvasName.width - 55, 10);
}

function emptyCanvas(gameCanvas, canvasName) {
  gameCanvas.clearRect(0, 0, canvasName.width, canvasName.height);
}

//GAME CONTROLS
let objectSpeedUp = 1;
let controlledBackground;

function setControlledObject() {
  switch (gamePlayed) {
    case "game1":
      controlledObject = lukesArray1[0];
      controlledBackground = backgroundStarsArray1;
      break;
    case "game2":
      controlledObject = lukesArray2[0];
      controlledBackground = backgroundStarsArray2;
      break;
    case "game3":
      controlledObject = lukesArray3[0];
      controlledBackground = backgroundStarsArray3;
      break;
  }
}

function keyDown(e) {
  setControlledObject();

  if (e.key === "Right" || e.key === "ArrowRight") {
    controlledObject.dx = controlledObject.speed;
    if (gamePlayed == "game1") {
      objectSpeedUp = 1.2;
    }
    if (gamePlayed == "game1" || gamePlayed == "game3") {
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].right();
      }
    }
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    controlledObject.dx = -controlledObject.speed;
    if (gamePlayed == "game1") {
      objectSpeedUp = 0.5;
    }
    if (gamePlayed == "game1" || gamePlayed == "game3") {
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].left();
      }
    }
  }

  if (e.key === "Up" || e.key === "ArrowUp") {
    controlledObject.dy = -2;
    if (gamePlayed == "game2") {
      objectSpeedUp = 1.4;
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].up();
      }
    }
  }
  if (e.key === "Down" || e.key === "ArrowDown") {
    controlledObject.dy = 2;
    if (gamePlayed == "game2") {
      objectSpeedUp = 0.5;
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].down();
      }
    }
  }
  if (e.key === "f" && gamePlayed == "game2") {
    shootBulletsArray(lukesArray2[0]);
  }
}

function keyUp(e) {
  setControlledObject();

  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    controlledObject.dx = 0;
    objectSpeedUp = 1;
    if (gamePlayed == "game1" || gamePlayed == "game3") {
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].steady();
      }
    }
  }
  if (
    e.key === "Up" ||
    e.key === "ArrowUp" ||
    e.key === "Down" ||
    e.key === "ArrowDown"
  ) {
    controlledObject.dy = 0;
    objectSpeedUp = 1;
    if (gamePlayed == "game2") {
      for (i = 0; i < controlledBackground.length; i++) {
        controlledBackground[i].steady();
      }
    }
  }
}

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//GAME FUNCTIONS

function scorePoints(gameNr, gameScore) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (
    startGameScreens[waitForStart].classList.contains("hide-screen") &&
    gameOverScreens[waitForStart].classList.contains("hide-screen")
  ) {
    switch (gameNr) {
      case 1:
        score1++;
        speedUp(gameScore);
        break;
      case 2:
        score2++;
        speedUp(gameScore);
        break;
      case 3:
        score3++;
        speedUp(gameScore);
        break;
    }
  }
}

function speedUp(gameScore) {
  var testScore = /^[1-9]{0,1}[5]{1,2}$/;
  let x;
  if (gameScore == 3 || gameScore == 26 || gameScore == 60) {
    x = "extra";
  } else if (testScore.test(gameScore)) {
    x = "speed";
  } else {
    x = "none";
  }

  if (gamePlayed == "game1") {
    if ((x == "extra") & (SI < starsArray.length - 1)) {
      SI++;
    }
    starsArray[SI].fall();
  }
  if (gamePlayed == "game2") {
    if ((x == "speed") & (heartNr != undefined)) {
      console.log("bleh");
      heartsArray[heartNr].fall();
    }
  }
  if (gamePlayed == "game3") {
    if (x == "extra") {
      positionXcowboy = cowboysArray[CI].x;
      directionC = (cowboysArray[CI].dx / 2.5) * -1;
      CI++;
      cowboysArray[CI].update();
      cowboyX = cowboysArray[CI].x;
      cowboyY = cowboysArray[CI].y;
      enemyBulletsArray[CI].reset();
    }
  }
}

function gameOver(lukesArray, enemyObject) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (startGameScreens[waitForStart].classList.contains("hide-screen")) {
    if (gamePlayed == "game1" || gamePlayed == "game3") {
      for (var i = 0; i < enemyObject.length; i++) {
        if (
          enemyObject[i].x > lukesArray[0].x - 20 &&
          enemyObject[i].x < lukesArray[0].x + 20 &&
          enemyObject[i].y > lukesArray[0].y - 6 &&
          enemyObject[i].y < lukesArray[0].y + 10
        ) {
          pauseGame(gamePlayed);
          if (gamePlayed == "game1") {
            gameover1.classList.remove("hide-screen");
          }
          if (gamePlayed == "game3") {
            gameover3.classList.remove("hide-screen");
            CI = 0;
          }
        }
      }
    }

    if (gamePlayed == "game2") {
      pauseGame(gamePlayed);
      heartNr = undefined;
      gameover2.classList.remove("hide-screen");
    }
  }
}

function resetScore(gameNr) {
  switch (gameNr) {
    case 1:
      score1 = 0;
      break;
    case 2:
      score2 = 0;
      break;
    case 3:
      score3 = 0;
      break;
  }
}

function resetGame(gameNr) {
  switch (gameNr) {
    case 1:
      resetGame1();
      break;
    case 2:
      resetGame2();
      break;
    case 3:
      resetGame3();
      break;
  }
}

function pauseGame(gamePlayed) {
  if (gamePlayed == "game1") {
    for (var i = 0; i < lukesArray1.length; i++) {
      lukesArray1[i].dy = 0;
      lukesArray1[i].dx = 0;
      lukesArray1[i].speed = 0;
    }
  }
  if (gamePlayed == "game2") {
    for (var i = 0; i < lukesArray2.length; i++) {
      lukesArray2[i].dy = 0;
      lukesArray2[i].dx = 0;
      lukesArray2[i].speed = 0;
    }
  }
  if (gamePlayed == "game3") {
    for (var i = 0; i < lukesArray3.length; i++) {
      lukesArray3[i].dy = 0;
      lukesArray3[i].dx = 0;
      lukesArray3[i].speed = 0;
    }
    fuelBar.pause();
  }
}

//GAME 1 CONSTANTS
const canvas1 = document.getElementById("theGame1");
const ctx1 = canvas1.getContext("2d");
let score1 = 0;
let requestIdGame1;
let aliensArray1 = [];
let cometsArray = [];
let starsArray = [];
let fuelStarsArray = [];
let lukesArray1 = [];
let rocksArray = [];
let backgroundStarsArray1 = [];
let SI = 0;
let FSI = 0;
let alienSpeed = 1;

//GAME 2 CONSTANTS
const canvas2 = document.getElementById("theGame2");
const ctx2 = canvas2.getContext("2d");
let score2 = 0;
let requestIdGame2;
let debris = [];
let bulletsArray = [];
let aliensArray2 = [];
let heartsArray = [];
let lukesArray2 = [];
let backgroundStarsArray2 = [];
let heartNr;
let BI = 0;
let AI = 0;
let direction = 1;
let marginXheart;

//GAME 3 CONSTANTS
const canvas3 = document.getElementById("theGame3");
const ctx3 = canvas3.getContext("2d");
let score3 = 0;
let requestIdGame3;
let cowboysArray = [];
let enemyBulletsArray = [];
let lukesArray3 = [];
let backgroundStarsArray3 = [];
let positionXcowboy;
let directionC;
let cowboyX;
let cowboyY;
let EBI = 0;
let CI = 0;

//GAME CLASSES

class BackgroundStars {
  constructor(canvasName, backgroundDX, backgroundDY) {
    this.x = Math.random() * (canvasName.width - 1) + 1;
    this.y = Math.random() * (canvasName.height - 1) + 1;
    this.dx = backgroundDX;
    this.dy = backgroundDY;

    this.draw = function (gameCanvas) {
      gameCanvas.beginPath();
      gameCanvas.arc(this.x, this.y, 1, 0, 2 * Math.PI, false);
      gameCanvas.fillStyle = "#3b2c00";
      gameCanvas.fill();
      gameCanvas.closePath();
    };

    this.left = function () {
      this.dx = backgroundDX + 0.5;
    };

    this.right = function () {
      this.dx = backgroundDX - 1;
    };

    this.up = function () {
      this.dy = backgroundDY + 1;
    };

    this.down = function () {
      this.dy = backgroundDY - 0.5;
    };

    this.returnX = function (canvasName) {
      if (this.x > canvasName.width) {
        this.x = 1;
      } else if (this.x < 0) {
        this.x = canvasName.width - 1;
      }
      this.y = Math.random() * (canvasName.height - 1) + 1;
    };

    this.returnY = function (canvasName) {
      if (this.y > canvasName.height) {
        this.y = 1;
      } else if (this.y < 0) {
        this.y = canvasName.height - 1;
      }
      this.x = Math.random() * (canvasName.width - 1) + 1;
    };

    this.steady = function () {
      this.dx = backgroundDX;
      this.dy = backgroundDY;
    };
  }
}

class Luke {
  constructor(canvasName, marginXluke, marginYluke) {
    this.x = canvasName.width / marginXluke;
    this.y = canvasName.height / 2 + marginYluke;
    this.speed = 2;
    this.dx = 0;
    this.dy = 0;
    this.w = 60;
    this.h = 4;
    this.size = 4.5;

    this.draw = function drawLuke(gameCanvas) {
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
        "#000000",
        this.x - 2,
        this.y - 1,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#000000",
        this.x + 2,
        this.y - 1,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawEllipseObject(
        gameCanvas,
        "#808080",
        this.x,
        this.y + 5,
        20,
        2,
        0,
        0,
        Math.PI * 2,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 4,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 4,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 11,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 11,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x - 18,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#05db05",
        this.x + 18,
        this.y + 5.2,
        1,
        -100,
        Math.PI - 0.5,
        true
      );
    };

    this.reset = function (canvasName, marginXluke, marginYluke) {
      this.x = canvasName.width / marginXluke;
      this.y = canvasName.height / 2 - marginYluke;
      this.speed = 2;
      this.dx = 0;
      this.dy = 0;
    };
  }
}

class Bullet {
  constructor() {
    this.x = 310;
    this.y = -5;
    this.dx = 0;
    this.dy = 0;
    this.speed = 1;
    this.size = 2;

    this.draw = function (gameCanvas) {
      gameCanvas.beginPath();
      gameCanvas.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
      gameCanvas.fillStyle = "#05db05";
      gameCanvas.fill();
      gameCanvas.closePath();
    };

    this.update = function (actionSubject) {
      this.x = actionSubject.x;
      this.y = actionSubject.y - 1;
    };
    this.shoot = function () {
      this.dy = -2;
    };
    this.reset = function () {
      this.x = 310;
      this.y = -5;
      this.dx = 0;
      this.dy = 0;
    };
  }
}

class Star {
  constructor(canvasName, color) {
    this.x = canvasName.width + (Math.random() * 450 + 10);
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = 0;
    this.dy = 0;
    this.r = 6;
    this.n = 5;
    this.inset = -1;
    this.size = 3;
    this.speed = 1;
    this.color = color;

    this.draw = function (gameCanvas) {
      gameCanvas.save();
      gameCanvas.beginPath();
      gameCanvas.translate(this.x, this.y);
      gameCanvas.moveTo(0, 0 - this.r);
      for (let x = 0; x < this.n; x++) {
        gameCanvas.rotate(Math.PI / this.n);
        gameCanvas.lineTo(0, 0 - this.r * this.inset);
        gameCanvas.rotate(Math.PI / this.n);
        gameCanvas.lineTo(0, 0 - this.r);
      }
      gameCanvas.fillStyle = this.color;
      gameCanvas.fill();
      gameCanvas.closePath();
      gameCanvas.restore();
    };

    this.fall = function () {
      this.dx = -2;
    };

    this.return = function (canvasName) {
      this.x = canvasName.width + (Math.random() * 450 + 10);
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + (Math.random() * 450 + 10);
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = 0;
      this.dy = 0;
    };
  }
}

class Heart {
  constructor(canvasName) {
    this.x = canvasName.width - 30;
    this.y = 10;
    this.d = Math.min(9, 9);
    this.k = 8;
    this.dx = 0;
    this.dy = 0;

    this.draw = function (gameCanvas) {
      gameCanvas.save();
      gameCanvas.beginPath();
      gameCanvas.translate(this.x, this.y);
      gameCanvas.moveTo(7, 6);
      gameCanvas.bezierCurveTo(7, 3, 7, 2, 5, 2);
      gameCanvas.bezierCurveTo(2, 2, 2, 6, 2, 6);
      gameCanvas.bezierCurveTo(2, 8, 4, 10, 7, 12);
      gameCanvas.bezierCurveTo(11, 10, 13, 8, 13, 6);
      gameCanvas.bezierCurveTo(13, 6, 13, 2, 10, 2);
      gameCanvas.bezierCurveTo(8, 2, 7, 3, 7, 4);
      gameCanvas.fillStyle = "#FF0000";
      gameCanvas.fill();
      gameCanvas.closePath();
      gameCanvas.restore();
    };

    this.lose = function (canvasName) {
      this.x = canvasName.width * (Math.random() * 0.7 + 0.2);
      this.y = -20;
    };
    this.fall = function () {
      this.dy = 2;
    };
    this.reset = function (canvasName) {
      this.x = canvasName.width - marginXheart;
      this.y = 10;
      this.dx = 0;
      this.dy = 0;
    };
  }
}

class FuelBar {
  constructor() {
    this.w = 45;
    this.fu = 0.05;

    this.draw = function (gameCanvas, canvasName) {
      gameCanvas.beginPath();
      gameCanvas.rect(canvasName.width - 55, 12, this.w, 4);
      gameCanvas.fillStyle = "#05db05";
      gameCanvas.fill();
      gameCanvas.closePath();
    };

    this.use = function () {
      if (this.w > 0) {
        this.w -= this.fu;
      } else {
        this.w = 0;
      }
    };

    this.refill = function (lukesArray) {
      if (this.w <= 20) {
        this.w += 25;
      } else {
        this.w += 25 - (this.w - 20);
      }
      lukesArray[0].speed = 2;
    };

    this.reset = function () {
      this.w = 45;
      this.fu = 0.05;
    };

    this.pause = function () {
      this.fu = 0;
    };
  }
}

class AlienVertical {
  constructor(canvasName) {
    this.x = canvasName.width * (Math.random() * 0.7 + 0.2);
    this.y = -(Math.random() * 200 + 10);
    this.w = 60;
    this.h = 4;
    this.size = 3;
    this.dx = (Math.random() * 2 + 1) * direction;
    this.dy = Math.random() * 0.9 + 1.0;
    this.speed = 1;

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
      this.x = canvasName.width * (Math.random() * 0.7 + 0.2);
      this.y = -(Math.random() * 200 + 10);
      this.dx = (Math.random() * 2 + 1) * direction;
      this.dy = Math.random() * 0.9 + 1.0;
    };

    this.normal = function () {
      this.speed = 1;
    };
  }
}

class AlienHorizontal {
  constructor(canvasName) {
    this.x = canvasName.width + (Math.random() * 460 + 20);
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.w = 60;
    this.h = 4;
    this.size = 3;
    this.speed = Math.random() * 0.8 + 0.8;
    this.dx = -2.5;
    this.dy = 0;

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
      this.x = canvasName.width + (Math.random() * 460 + 20);
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = -2.5;
      this.dy = 0;
      this.speed = Math.random() * 0.8 + 0.8;
    };
  }
}

class Cowboy {
  constructor(canvasName) {
    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#DAA520",
        this.x,
        this.y - 10,
        5,
        -100,
        Math.PI - 0.5,
        true
      );
      drawRoundObject(
        gameCanvas,
        "#DEB887",
        this.x,
        this.y - 4,
        6,
        -100,
        Math.PI - 0.5,
        true
      );
      drawEllipseObject(
        gameCanvas,
        "#DAA520",
        this.x,
        this.y - 10,
        15,
        1,
        0,
        0,
        Math.PI * 2,
        true
      );
    };

    this.update = function () {
      this.x = positionXcowboy;
      this.dx = 2 * directionC;
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + 20;
      this.y = canvasName.height - 5;
      this.dx = 0;
    };
  }
}

class EnemyBullet {
  constructor() {
    this.x = cowboyX;
    this.y = cowboyY - 10;
    this.speed = 2;
    this.dx = 0.5;
    this.dy = -2;

    this.draw = function (gameCanvas) {
      gameCanvas.beginPath();
      gameCanvas.arc(this.x, this.y, 2, 0, 2 * Math.PI, false);
      gameCanvas.fillStyle = "#808080";
      gameCanvas.fill();
      gameCanvas.closePath();
    };

    this.return = function () {
      this.x = cowboyX;
      this.y = cowboyY;
    };

    this.reset = function () {
      this.x = cowboyX;
      this.y = cowboyY - 10;
      this.speed = 2;
      this.dx = 0.5;
      this.dy = -2;
    };
  }
}

class Comet {
  constructor(canvasName) {
    this.x = canvasName.width + (Math.random() * 460 + 20);
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = -2.5;
    this.dy = 0;
    this.speed = 1.2;
    this.size = Math.random() * 2.8 + 7.1;

    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#D2691E",
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x - 4,
        this.y - 4,
        this.size * 0.2,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x + 3,
        this.y + 3,
        this.size * 0.3,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x - 2,
        this.y - 2,
        this.size * 0.2,
        0,
        Math.PI * 2
      );
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + (Math.random() * 460 + 20);
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = -2.5;
      this.dy = 0;
      this.speed = 1.2;
    };
  }
}

class Rock {
  constructor(canvasName) {
    this.x = canvasName.width + (Math.random() * 460 + 20);
    this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
    this.dx = -2.5;
    this.dy = 0;
    this.speed = Math.random() * 0.6 + 1.2;
    this.w = 20;
    this.h = 10;
    this.size = Math.random() * 3.5 + 3.1;

    this.draw = function (gameCanvas) {
      drawRoundObject(
        gameCanvas,
        "#D2691E",
        this.x,
        this.y,
        this.size,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x - 2,
        this.y - 2,
        this.size * 0.2,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x + 1,
        this.y + 1,
        this.size * 0.3,
        0,
        Math.PI * 2
      );
      drawRoundObject(
        gameCanvas,
        "#8B4513",
        this.x - 1,
        this.y - 1,
        this.size * 0.2,
        0,
        Math.PI * 2
      );
    };

    this.reset = function (canvasName) {
      this.x = canvasName.width + (Math.random() * 460 + 20);
      this.y = canvasName.height * (Math.random() * 0.8 + 0.1);
      this.dx = -2.5;
      this.dy = 0;
      this.speed = Math.random() * 0.6 + 1.2;
    };
  }
}

class Piece {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.alpha = 1;
  }
  draw() {
    ctx2.save();
    ctx2.globalAlpha = this.alpha;
    ctx2.fillStyle = "red";
    ctx2.beginPath();
    ctx2.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx2.fill();
    ctx2.restore();
  }
  update() {
    this.draw();
    this.alpha -= 0.01;
    this.x += this.dx;
    this.y += this.dy;
  }
}

//GAME FUNCTIONS

function drawArrayOnCanvas(gameCanvas, arrayType) {
  for (i = 0; i < arrayType.length; i++) {
    arrayType[i].draw(gameCanvas);
  }
}

function fillBackgroundStarsArray(
  canvasName,
  backgroundStarsArray,
  backgroundDX,
  backgroundDY
) {
  for (i = 0; i < 150; i++) {
    backgroundStarsArray[i] = new BackgroundStars(
      canvasName,
      backgroundDX,
      backgroundDY
    );
  }
}

function moveBackgroundStars(canvasName, backgroundStarsArray) {
  for (i = 0; i < backgroundStarsArray.length; i++) {
    backgroundStarsArray[i].x += backgroundStarsArray[i].dx;
    backgroundStarsArray[i].y += backgroundStarsArray[i].dy;

    if (
      backgroundStarsArray[i].x > canvasName.width ||
      backgroundStarsArray[i].x < 0
    ) {
      backgroundStarsArray[i].returnX(canvasName);
    }

    if (
      backgroundStarsArray[i].y > canvasName.height ||
      backgroundStarsArray[i].y < 0
    ) {
      backgroundStarsArray[i].returnY(canvasName);
    }
  }
}

function fillLukesArray(canvasName, lukesArray, marginXluke, marginYluke) {
  for (var i = 0; i < 1; i++) {
    lukesArray[i] = new Luke(canvasName, marginXluke, marginYluke);
  }
}

function moveLukesArray(lukesArray, maxHeight, minHeight, maxWidth, minWidth) {
  for (var i = 0; i < lukesArray.length; i++) {
    lukesArray[i].x += lukesArray[i].dx * lukesArray[i].speed;
    lukesArray[i].y += lukesArray[i].dy * (lukesArray[i].speed / 2);

    if (lukesArray[i].x > maxWidth) {
      lukesArray[i].x = maxWidth;
    }

    if (lukesArray[i].x < minWidth) {
      lukesArray[i].x = minWidth;
    }
    if (lukesArray[i].y > maxHeight) {
      lukesArray[i].y = maxHeight;
    }

    if (lukesArray[i].y < minHeight) {
      lukesArray[i].y = minHeight;
    }
  }
}

function resetLukesArray(lukesArray, canvasName, marginXluke, marginYluke) {
  for (i = 0; i < lukesArray.length; i++) {
    lukesArray[i].reset(canvasName, marginXluke, marginYluke);
  }
}

function fillCowboysArray(canvasName) {
  for (var i = 0; i < 4; i++) {
    cowboysArray[i] = new Cowboy(canvasName);
  }
}

function moveCowboysArray(canvasName) {
  for (var i = 0; i < cowboysArray.length; i++) {
    cowboysArray[i].x += cowboysArray[i].dx;
    if (
      cowboysArray[i].x + 10 > canvasName.width ||
      cowboysArray[i].x - 10 < 0
    ) {
      cowboysArray[i].dx *= -1;
    }
  }
}

function resetCowboysArray(canvasName) {
  for (var i = 0; i < cowboysArray.length; i++) {
    cowboysArray[i].reset(canvasName);
  }
  positionXcowboy = canvasName.width / 2;
  directionC = -1;
  cowboysArray[0].update();
}

function fillEnemyBulletsArray() {
  for (var i = 0; i < cowboysArray.length; i++) {
    cowboyX = cowboysArray[i].x;
    cowboyY = cowboysArray[i].y;
    enemyBulletsArray[i] = new EnemyBullet();
  }
}

function moveEnemyBulletsArray(canvasName, gameNr, gameScore) {
  for (var i = 0; i < enemyBulletsArray.length; i++) {
    enemyBulletsArray[i].x += enemyBulletsArray[i].dx;
    enemyBulletsArray[i].y += enemyBulletsArray[i].dy;
    if (
      enemyBulletsArray[i].x + 10 > canvasName.width ||
      enemyBulletsArray[i].x - 10 < 0
    ) {
      enemyBulletsArray[i].dx *= -1;
    }
    if (
      enemyBulletsArray[i].y > canvasName.height ||
      enemyBulletsArray[i].y < 0
    ) {
      cowboyX = cowboysArray[i].x;
      cowboyY = cowboysArray[i].y;
      enemyBulletsArray[i].return();
      if (
        enemyBulletsArray[i].x < canvasName.width &&
        enemyBulletsArray[i].x > 0
      ) {
        scorePoints(gameNr, gameScore);
      }
    }
  }
}

function resetEnemyBulletsArray(canvasName) {
  for (var i = 0; i < enemyBulletsArray.length; i++) {
    cowboyX = cowboysArray[i].x;
    cowboyY = cowboysArray[i].y;
    enemyBulletsArray[i].reset(canvasName);
  }
  EBI = 0;
}

function fillBulletsArray() {
  for (var i = 0; i < 5; i++) {
    bulletsArray[i] = new Bullet();
  }
}

function shootBulletsArray(actionSubject) {
  bulletsArray[BI].update(actionSubject);
  bulletsArray[BI].shoot();
  if (BI == 4) {
    BI = 0;
  } else {
    BI++;
  }
}

function moveBulletsArray(canvasName) {
  for (var i = 0; i < bulletsArray.length; i++) {
    bulletsArray[i].y += bulletsArray[i].dy;
    bulletsArray[i].x += bulletsArray[i].dx;

    if (
      bulletsArray[i].y + bulletsArray[i].size > canvasName.height ||
      bulletsArray[i].y - bulletsArray[i].size < -50
    ) {
      bulletsArray[i].reset();
    }
  }
}

function resetBulletsArray() {
  for (var i = 0; i < bulletsArray.length; i++) {
    bulletsArray[i].reset();
  }
}

function fillHeartsArray(canvasName) {
  for (var i = 0; i < 3; i++) {
    if (i == 0) {
      marginXheart = 60;
    } else if (i == 1) {
      marginXheart = 45;
    } else if (i == 2) {
      marginXheart = 30;
    }
    heartsArray[i] = new Heart(canvasName);
  }
}

function moveHeartsArray(canvasName, lukesArray) {
  for (var i = 0; i < heartsArray.length; i++) {
    heartsArray[i].y += heartsArray[i].dy;
    heartsArray[i].x += heartsArray[i].dx;

    if (
      heartsArray[i].y + heartsArray[i].size > canvasName.height ||
      heartsArray[i].y - heartsArray[i].size < -50
    ) {
      heartsArray[i].lose(canvasName);
    }

    if (
      heartsArray[i].x > lukesArray[0].x - 20 &&
      heartsArray[i].x < lukesArray[0].x + 20 &&
      heartsArray[i].y > lukesArray[0].y - 16 &&
      heartsArray[i].y < lukesArray[0].y + 10
    ) {
      if (heartNr == 0) {
        marginXheart = 60;
        heartsArray[i].reset(canvasName);
        heartNr = undefined;
      }
      if (heartNr == 1) {
        marginXheart = 45;
        heartsArray[i].reset(canvasName);
        heartNr = 0;
      }
    }
  }
}

function loseHeart(lukesArray, canvasName) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (
    startGameScreens[waitForStart].classList.contains("hide-screen") &&
    gameOverScreens[waitForStart].classList.contains("hide-screen")
  ) {
    for (var i = 0; i < aliensArray2.length; i++) {
      if (
        aliensArray2[i].x - aliensArray2[i].size > lukesArray[0].x - 20 &&
        aliensArray2[i].x + aliensArray2[i].size < lukesArray[0].x + 20 &&
        aliensArray2[i].y > lukesArray[0].y - 16 &&
        aliensArray2[i].y < lukesArray[0].y + 10
      ) {
        let AC = i;
        enemyExplosion(AC, canvasName);
        if (heartNr == undefined) {
          heartNr = 0;
          heartsArray[heartNr].lose(canvasName);
        } else if (heartNr == 0) {
          heartNr = 1;
          heartsArray[heartNr].lose(canvasName);
        } else if (heartNr == 1) {
          heartNr = 2;
          heartsArray[heartNr].lose(canvasName);
          gameOver();
        }
      }
    }
  }
}

function resetHeartsArray(canvasName) {
  for (var i = 0; i < heartsArray.length; i++) {
    if (i == 0) {
      marginXheart = 60;
    } else if (i == 1) {
      marginXheart = 45;
    } else if (i == 2) {
      marginXheart = 30;
    }
    heartsArray[i].reset(canvasName);
  }
}

function fillAliensArray2(canvasName) {
  for (var i = 0; i < 8; i++) {
    aliensArray2[i] = new AlienVertical(canvasName);
    direction *= -1;
  }
}

function moveAliensArray2(canvasName) {
  for (var i = 0; i < aliensArray2.length; i++) {
    aliensArray2[i].y += aliensArray2[i].dy;
    aliensArray2[i].x += aliensArray2[i].dx;

    if (
      aliensArray2[i].x + 10 > canvasName.width ||
      aliensArray2[i].x - 10 < 0
    ) {
      aliensArray2[i].dx *= -1;
    }
    if (aliensArray2[i].y < -500 || aliensArray2[i].y > canvasName.height) {
      direction *= -1;
      aliensArray2[i].reset(canvasName);
    }
  }
}

function resetAliensArray2(canvasName) {
  for (var i = 0; i < aliensArray2.length; i++) {
    direction *= -1;
    aliensArray2[i].reset(canvasName);
  }
}

function killEnemy(canvasName, gameNr, gameScore) {
  for (var KA = 0; KA < aliensArray2.length; KA++) {
    for (var i = 0; i < bulletsArray.length; i++) {
      if (
        bulletsArray[i].x > aliensArray2[KA].x - 20 &&
        bulletsArray[i].x < aliensArray2[KA].x + 20 &&
        bulletsArray[i].y > aliensArray2[KA].y - 3 &&
        bulletsArray[i].y < aliensArray2[KA].y + 6
      ) {
        enemyExplosion(KA, canvasName);
        bulletsArray[i].reset();
        scorePoints(gameNr, gameScore);
      }
    }
  }
}

function enemyExplosion(AC, canvasName) {
  setTimeout(() => {
    for (i = 0; i <= 150; i++) {
      let dx = (Math.random() - 0.5) * 0.5;
      let dy = (Math.random() - 0.5) * 0.3;
      let radius = 0.5;
      let piece = new Piece(
        aliensArray2[AC].x,
        aliensArray2[AC].y,
        radius,
        dx,
        dy
      );

      debris.push(piece);
    }
    explosion();
    aliensArray2[AC].reset(canvasName);
  }, 0);
}

function explosion() {
  debris.forEach((piece, i) => {
    if (piece.alpha <= 0) {
      debris.splice(i, 1);
    } else piece.update();
  });
  requestAnimationFrame(explosion);
}

function useFuel(lukesArray) {
  let waitForStart = gamePlayed.slice(4) - 1;
  if (
    startGameScreens[waitForStart].classList.contains("hide-screen") &&
    gameOverScreens[waitForStart].classList.contains("hide-screen")
  ) {
    fuelBar.use();
  }
  if (fuelBar.w === 0) {
    lukesArray[0].speed = 0;
  }
}

function fillFuelStarsArray(canvasName, color) {
  for (var i = 0; i < 1; i++) {
    fuelStarsArray[i] = new Star(canvasName, color);
  }
}

function moveFuelStarsArray(canvasName, lukesArray) {
  for (var i = 0; i < fuelStarsArray.length; i++) {
    fuelStarsArray[i].y += fuelStarsArray[i].dy;
    fuelStarsArray[i].x += fuelStarsArray[i].dx;
    if (
      fuelStarsArray[i].x > canvasName.width + 500 ||
      fuelStarsArray[i].x < 0
    ) {
      fuelStarsArray[i].return(canvasName);
    }
    let waitForStart = gamePlayed.slice(4) - 1;
    if (
      startGameScreens[waitForStart].classList.contains("hide-screen") &&
      gameOverScreens[waitForStart].classList.contains("hide-screen")
    ) {
      if (
        fuelStarsArray[i].x > lukesArray[0].x - 20 &&
        fuelStarsArray[i].x < lukesArray[0].x + 20 &&
        fuelStarsArray[i].y > lukesArray[0].y - 16 &&
        fuelStarsArray[i].y < lukesArray[0].y + 10
      ) {
        fuelStarsArray[i].return(canvasName);
        fuelBar.refill(lukesArray);
      }
    }
  }
}

function resetFuelStarsArray(canvasName) {
  for (var i = 0; i < fuelStarsArray.length; i++) {
    fuelStarsArray[i].reset(canvasName);
    fuelStarsArray[i].fall();
  }
}

function fillStarsArray(canvasName, color) {
  for (var i = 0; i < 3; i++) {
    starsArray[i] = new Star(canvasName, color);
  }
}

function dropStar() {
  starsArray[SI].fall();
}

function moveStarsArray(canvasName, lukesArray, gameNr, gameScore) {
  for (var i = 0; i < starsArray.length; i++) {
    starsArray[i].y += starsArray[i].dy;
    starsArray[i].x += starsArray[i].dx;

    if (starsArray[i].x > canvasName.width + 500 || starsArray[i].x < 0) {
      starsArray[i].return(canvasName);
    }
    let waitForStart = gamePlayed.slice(4) - 1;
    if (
      startGameScreens[waitForStart].classList.contains("hide-screen") &&
      gameOverScreens[waitForStart].classList.contains("hide-screen")
    ) {
      if (
        starsArray[i].x > lukesArray[0].x - 20 &&
        starsArray[i].x < lukesArray[0].x + 20 &&
        starsArray[i].y > lukesArray[0].y - 16 &&
        starsArray[i].y < lukesArray[0].y + 10
      ) {
        scorePoints(gameNr, gameScore);
        starsArray[i].return(canvasName);
      }
    }
  }
}

function resetStarsArray(canvasName) {
  for (var i = 0; i < starsArray.length; i++) {
    starsArray[i].reset(canvasName);
  }
  SI = 0;
  dropStar();
}

function fillAliensArray1(canvasName) {
  for (var i = 0; i < 5; i++) {
    aliensArray1[i] = new AlienHorizontal(canvasName);
  }
}

function moveAliensArray1(canvasName) {
  for (var i = 0; i < aliensArray1.length; i++) {
    aliensArray1[i].x += aliensArray1[i].dx * aliensArray1[i].speed;

    if (aliensArray1[i].x > canvasName.width + 500 || aliensArray1[i].x < -20) {
      aliensArray1[i].reset(canvasName);
    }
  }
}

function resetAliensArray1(canvasName) {
  for (var i = 0; i < aliensArray1.length; i++) {
    aliensArray1[i].reset(canvasName);
  }
}

function fillRocksArray(canvasName) {
  for (var i = 0; i < 3; i++) {
    rocksArray[i] = new Rock(canvasName);
  }
}

function moveRocksArray(canvasName) {
  for (var i = 0; i < rocksArray.length; i++) {
    rocksArray[i].x += rocksArray[i].dx * rocksArray[i].speed;

    if (rocksArray[i].x > canvasName.width + 500 || rocksArray[i].x < -20) {
      rocksArray[i].reset(canvasName);
    }
  }
}

function resetRocksArray(canvasName) {
  for (var i = 0; i < rocksArray.length; i++) {
    rocksArray[i].reset(canvasName);
  }
}

function fillCometsArray(canvasName) {
  for (var i = 0; i < 3; i++) {
    cometsArray[i] = new Comet(canvasName);
  }
}

function moveCometsArray(canvasName) {
  for (var i = 0; i < cometsArray.length; i++) {
    cometsArray[i].x += cometsArray[i].dx * cometsArray[i].speed;

    if (cometsArray[i].x > canvasName.width + 500 || cometsArray[i].x < -20) {
      cometsArray[i].reset(canvasName);
    }
  }
}

function resetCometsArray(canvasName) {
  for (var i = 0; i < cometsArray.length; i++) {
    cometsArray[i].reset(canvasName);
  }
}

// GET GAME 1 GOING

let fuelBar = new FuelBar();
fillLukesArray(canvas1, lukesArray1, 4, 0);
fillBackgroundStarsArray(canvas1, backgroundStarsArray1, -1, 0);
fillCometsArray(canvas1);
fillRocksArray(canvas1);
fillStarsArray(canvas1, "#FFD700");
fillFuelStarsArray(canvas1, "#05db05");
fillAliensArray1(canvas1);

function drawGame1Elements() {
  emptyCanvas(ctx1, canvas1);
  drawArrayOnCanvas(ctx1, backgroundStarsArray1);
  drawArrayOnCanvas(ctx1, lukesArray1);
  drawArrayOnCanvas(ctx1, cometsArray);
  drawArrayOnCanvas(ctx1, rocksArray);
  drawArrayOnCanvas(ctx1, aliensArray1);
  drawArrayOnCanvas(ctx1, starsArray);
  drawArrayOnCanvas(ctx1, fuelStarsArray);
  fuelBar.draw(ctx1, canvas1);
  drawScore(ctx1, canvas1, score1);
}

function game1Action() {
  drawGame1Elements();
  moveBackgroundStars(canvas1, backgroundStarsArray1);
  useFuel(lukesArray1);
  moveLukesArray(lukesArray1, 140, 10, 160, 20);
  moveStarsArray(canvas1, lukesArray1, 1, score1);
  moveFuelStarsArray(canvas1, lukesArray1);
  moveAliensArray1(canvas1);
  moveCometsArray(canvas1);
  moveRocksArray(canvas1);
  gameOver(lukesArray1, aliensArray1);
  gameOver(lukesArray1, cometsArray);
  gameOver(lukesArray1, rocksArray);
  requestIdGame1 = requestAnimationFrame(game1Action);
}

function resetGame1() {
  emptyCanvas(ctx1, canvas1);
  resetLukesArray(lukesArray1, canvas1, 4, 0);
  resetStarsArray(canvas1);
  resetFuelStarsArray(canvas1);
  resetAliensArray1(canvas1);
  resetCometsArray(canvas1);
  resetRocksArray(canvas1);
  fuelBar.reset();
  resetScore(1);
  cancelAnimationFrame(requestIdGame1);
  objectSpeedUp = 1;
}

//GET GAME 2 GOING

fillBackgroundStarsArray(canvas2, backgroundStarsArray2, 0, 1);
fillLukesArray(canvas2, lukesArray2, 2, 40);
fillBulletsArray();
fillHeartsArray(canvas2);
fillAliensArray2(canvas2);

function drawGame2Elements() {
  emptyCanvas(ctx2, canvas2);
  drawArrayOnCanvas(ctx2, backgroundStarsArray2);
  drawArrayOnCanvas(ctx2, bulletsArray);
  drawArrayOnCanvas(ctx2, aliensArray2);
  drawArrayOnCanvas(ctx2, heartsArray);
  drawArrayOnCanvas(ctx2, lukesArray2);
  drawScore(ctx2, canvas2, score2);
}

function game2Action() {
  drawGame2Elements();
  moveBackgroundStars(canvas2, backgroundStarsArray2);
  moveLukesArray(lukesArray2, 140, 60, 280, 20);
  moveBulletsArray(canvas2);
  moveAliensArray2(canvas2);
  moveHeartsArray(canvas2, lukesArray2);
  loseHeart(lukesArray2, canvas2);
  killEnemy(canvas2, 2, score2);
  requestIdGame2 = requestAnimationFrame(game2Action);
}

function resetGame2() {
  emptyCanvas(ctx2, canvas2);
  resetLukesArray(lukesArray2, canvas2, 2, 40);
  resetBulletsArray();
  resetAliensArray2(canvas2);
  resetHeartsArray(canvas2);
  resetScore(2);
  cancelAnimationFrame(requestIdGame2);
  objectSpeedUp = 1;
}

//GET GAME 3 GOING

fillBackgroundStarsArray(canvas3, backgroundStarsArray3, 0, -0.5);
fillLukesArray(canvas3, lukesArray3, 2, -60);
fillCowboysArray(canvas3);
fillEnemyBulletsArray(canvas3);

function drawGameElements3() {
  emptyCanvas(ctx3, canvas3);
  drawEarth(canvas3, ctx3);
  drawArrayOnCanvas(ctx3, backgroundStarsArray3);
  drawArrayOnCanvas(ctx3, lukesArray3);
  drawArrayOnCanvas(ctx3, cowboysArray);
  drawArrayOnCanvas(ctx3, enemyBulletsArray);
  drawScore(ctx3, canvas3, score3);
}

function game3Action() {
  drawGameElements3();
  moveBackgroundStars(canvas3, backgroundStarsArray3);
  moveLukesArray(lukesArray3, 100, 10, 280, 20);
  moveCowboysArray(canvas3);
  moveEnemyBulletsArray(canvas3, 3, score3);
  gameOver(lukesArray3, enemyBulletsArray);
  requestIdGame3 = requestAnimationFrame(game3Action);
}

function resetGame3() {
  emptyCanvas(ctx3, canvas3);
  resetLukesArray(lukesArray3, canvas3, 2, 40);
  resetCowboysArray(canvas3);
  resetEnemyBulletsArray(canvas3);
  resetScore(3);
  cancelAnimationFrame(requestIdGame3);
}