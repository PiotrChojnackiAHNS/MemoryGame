// Render functions
function showCongratulations() {
   const lottiePlayerAttributes = {
      src: "https://assets1.lottiefiles.com/packages/lf20_h7q0t9pm.json",
      background: "transparent",
      speed: 1,
      class: "confetti",
      autoplay: true,
   };

   const congratulationsWrapper = document.getElementById("congratulations-wrapper");
   const congratulations = document.createElement("div");
   congratulations.classList.add("congratulations");

   const confetti = document.createElement("lottie-player");
   Object.entries(lottiePlayerAttributes).forEach((attr) => {
      confetti.setAttribute(attr[0], attr[1]);
   });

   const text = document.createElement("h1");
   text.innerText = "Congratulations!";

   congratulations.appendChild(confetti);
   congratulations.appendChild(text);
   congratulationsWrapper.appendChild(congratulations);

   // Remove congratulations screen after 5s
   setTimeout(() => {
      congratulations.classList.add("hidden");
   }, 4500);

   setTimeout(() => {
      congratulationsWrapper.removeChild(congratulations);
      document.dispatchEvent(gameFinishEvent);
   }, 5000);
}

function showHelloScreen() {
   // /* <div class="hello-wrapper">
   //     <h2>Kliknij aby rozpocząć nową grę</h2>
   //     <button id="hello-start-button">Start game</button>
   //  </div> */
   const gameWrapper = document.getElementById("game");
   gameWrapper.innerHTML = "";

   const text = document.createElement("h2");
   text.innerText = "Click the button above to start a new game";

   gameWrapper.appendChild(text);
}

function appendCard(card, container, onClick) {
   const cardWrapper = document.createElement("div");
   cardWrapper.classList.add("card");

   cardWrapper.addEventListener("click", () => onClick(card, cardWrapper));

   const cardInner = document.createElement("div");
   cardInner.classList.add("card-inner");

   const cardFront = document.createElement("div");
   cardFront.classList.add("front");

   const cardBack = document.createElement("div");
   cardBack.classList.add("back");

   const img = document.createElement("img");
   img.src = `./assets/card-images/${card.name}.png`;
   img.alt = "card image";

   cardBack.appendChild(img);
   cardInner.appendChild(cardFront);
   cardInner.appendChild(cardBack);
   cardWrapper.appendChild(cardInner);

   container.appendChild(cardWrapper);
}

function clearTimers() {
   document.getElementById("game-timer").innerText = "00:00";
   document.getElementById("game-moves").innerText = "00";
}
