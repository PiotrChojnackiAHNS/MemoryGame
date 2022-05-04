let game = null;

window.addEventListener("load", (event) => {
   const cards = document.getElementsByClassName("card");

   document.getElementById("start-button").addEventListener("click", (e) => {
      if (!game) {
         e.target.innerText = "Stop game";
         game = new Game();
      } else {
         e.target.innerText = "Start game";
         game.finishGame(true);
         game = null;
      }
   });
});
