//SIDEBAR
const sidebar = document.getElementById("sidebar");

function highlightSidebar() {
  sidebar.classList.add("highlighted");
}

function dimSidebar() {
  sidebar.classList.remove("highlighted");
}

sidebar.addEventListener("mouseenter", highlightSidebar);
sidebar.addEventListener("mouseleave", dimSidebar);

//SIDEBAR LINKS
const menuLinks = document
  .getElementById("menuLinks")
  .getElementsByTagName("a");
const gamesBox = document.getElementById("gamesBox");
let chosenGame;

function hideGames() {
  const gamesArr = gamesBox.children;
  for (x = 0; x < gamesArr.length; x++) {
    gamesArr[x].classList.add("hide-game");
  }
  gamesBox.classList.add("hide-game");
}

function showGames() {
  hideGames();
  gamesBox.classList.remove("hide-game");
  chosenGame = event.target.parentElement.id;
  const gameShown = document.getElementById(`game${chosenGame}Box`);
  const infoShown = document.getElementById(`game${chosenGame}Info`);
  gameShown.classList.remove("hide-game");
  infoShown.classList.remove("hide-game");
}


function menulinksEventListeners() {
  for (x = 0; x < menuLinks.length; x++) {
    menuLinks[x].addEventListener("click", showGames);
  }
}
menulinksEventListeners();