window.addEventListener("load", (event) => {
   const cards = document.getElementsByClassName("card");

   for (const card of cards) {
      console.log(card);

      card.addEventListener("click", (e) => {
         card.classList.toggle("open");
      });
   }
});
