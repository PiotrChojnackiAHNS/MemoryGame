let game = null;

const gameStartEvent = new Event("gameStart");
const gameFinishEvent = new Event("gameFinish");

window.addEventListener("load", (event) => {
   const cards = document.getElementsByClassName("card");
   const startButton = document.getElementById("start-button");

   startButton.addEventListener("click", (e) => {
      if (!game) {
         game = new Game();
      } else {
         game.finishGame(true);
      }
   });

   document.addEventListener("gameStart", () => {
      startButton.innerText = "Stop game";
   });

   document.addEventListener("gameFinish", () => {
      startButton.innerText = "Start game";
      showHelloScreen();
      game = null;
   });
});
