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

const cardsCount = 12;

class Game {
   constructor() {
      document.dispatchEvent(gameStartEvent);

      this.startTime = new Date();
      this.moveCounter = 0;
      this.disabledInput = false;

      this.cardsOpen = [];
      this.cardsLeft = cardsCount * 2;

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
      clearTimers();
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

      this.cards.forEach((card) => {
         appendCard(card, gameContainer, (card, cardWrapper) => this.openCard(card, cardWrapper));
      });
   }

   openCard(card, cardWrapper) {
      // If both cards already open or card is hidden
      if (this.disabledInput || cardWrapper.classList.contains("hidden")) {
         return;
      }

      // If the same card has been clicked
      if (card.id == this.cardsOpen[0]?.id) {
         return;
      }

      this.disabledInput = true;
      this.cardsOpen.push(card);
      cardWrapper.classList.toggle("open");

      // First card
      if (this.cardsOpen.length != 2) {
         this.disabledInput = false;
         return;
      }

      // Second card
      setTimeout(() => {
         if (this.cardsOpen[0].name === this.cardsOpen[1].name) {
            // Same cards
            this.cardsLeft -= 2;
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

         if (this.cardsLeft == 0) {
            this.finishGame(false);
         }
      }, 500);

      this.incrementMoveCounter();
   }

   incrementMoveCounter() {
      const moves = document.getElementById("game-moves");
      this.moveCounter += 1;
      moves.innerText = this.moveCounter >= 9 ? this.moveCounter : `0${this.moveCounter}`;
   }

   finishGame(forced) {
      if (!forced) {
         showCongratulations();
      } else {
         document.dispatchEvent(gameFinishEvent);
      }
      this.disabledInput = true;
      clearInterval(this.timeInterval);
   }
}
