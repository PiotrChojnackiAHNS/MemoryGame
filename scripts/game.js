const availibleCards = [
   "baguette",
   "carrots",
   "cheese",
   "chilli",
   "cucumber",
   "eggs",
   "fish",
   "lemon",
   "milk",
   "mustard",
   "salami",
   "sausages",
   "steak",
];

const cardsCount = 8;

class Game {
   constructor() {
      this.startTime = new Date();
      this.cardsOpen = [];
      this.disabledInput = false;

      // Generate cards
      this.cards = availibleCards.sort(() => 0.5 - Math.random()).slice(0, cardsCount);
      this.cards = [...this.cards, ...this.cards]
         .sort(() => 0.5 - Math.random())
         .map((name, index) => ({
            id: index,
            name,
            discovered: false,
         }));

      this.timeInterval = setInterval(() => {
         const [mins, secs] = game.timeSpent;
         document.getElementById("game-timer").innerText = `${mins}:${secs}`;
      }, 1000);

      // Update DOM elements
      document.getElementById("game-timer").innerText = "00:00";
      document.getElementById("game-moves").innerText = "00";
      this.renderCards();
   }

   get timeSpent() {
      const diff = new Date() - this.startTime;

      const timeSeconds = diff / 1000;
      const minutes = Math.floor(timeSeconds / 60);
      const seconds = Math.floor(timeSeconds % 60);

      const minutesString = minutes < 10 ? `0${minutes}` : minutes;
      const secondsString = seconds < 10 ? `0${seconds}` : seconds;

      return [minutesString, secondsString];
   }

   renderCards() {
      const gameContainer = document.getElementById("game");
      gameContainer.innerHTML = "";

      this.cards.forEach((card, index) => {
         const cardWrapper = document.createElement("div");
         cardWrapper.classList.add("card");

         cardWrapper.addEventListener("click", (e) => {
            this.openCard(card, cardWrapper);
         });

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

         gameContainer.appendChild(cardWrapper);
      });
   }

   openCard(card, cardWrapper) {
      if (this.cardsOpen.length <= 2 && !this.disabledInput) {
         this.disabledInput = true;
         this.cardsOpen.push(card);
         cardWrapper.classList.toggle("open");

         // Second card
         if (this.cardsOpen.length == 2) {
            setTimeout(() => {
               if (this.cardsOpen[0].name === this.cardsOpen[1].name) {
                  // Same cards
                  this.cardsOpen.forEach((card) => {
                     card.discovered = true;
                     document.getElementsByClassName("card")[card.id].classList.add("hidden");
                  });
               } else {
                  this.cardsOpen.forEach((card) => {
                     document.getElementsByClassName("card")[card.id].classList.remove("open");
                  });
               }

               this.cardsOpen = [];
               this.disabledInput = false;
            }, 500);

            const moves = document.getElementById("game-moves");
            const movesCount = parseInt(moves.innerText);
            moves.innerText = movesCount >= 9 ? movesCount + 1 : `0${movesCount + 1}`;
         } else {
            this.disabledInput = false;
         }
      }
   }

   finishGame() {
      clearInterval(this.timeInterval);
   }
}
