'use strict';

//Raphael
// Funktion för att starta spelet
const startaSpel = function () {
  init();
};

const numPlayers = 4;

const scoreElements = [];
const playerElements = [];
const playerScores = [];

let scores, currentScore, activePlayer, playing;

//Johan
// Dynamiskt hämta spelarelement och poäng
for (let i = 0; i < numPlayers; i++) {
  scoreElements.push(document.getElementById(`score--${i}`));
  playerElements.push(document.querySelector(`.player--${i}`));
  playerScores.push(document.getElementById(`current--${i}`));
}

const diceImg = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const rollDiceImg = document.getElementById('roll-dice-btn');
const holdDice = document.querySelector('.btn--hold');


//Raphael
// Funktion för att initialisera inställningar
const init = function () {
  scores = Array(numPlayers).fill(0);
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  // Återställ poäng och spelarklasser
  scoreElements.forEach(scoreElement => scoreElement.textContent = 0);
  playerElements.forEach((playerElement, index) => {
    playerElement.classList.remove('player--winner');
    playerElement.classList.toggle('player--active', index === activePlayer);
  });
};

init();

//Johan
// Funktion för att byta spelare
const bytSpelare = function () {
  playerScores[activePlayer].textContent = 0;
  currentScore = 0;
  activePlayer = (activePlayer + 1) % numPlayers;

  // Växla aktiv spelarklass för att ändra gränssnitt
  playerElements.forEach((playerElement, index) => {
    playerElement.classList.toggle('player--active', index === activePlayer);
  });
};

//Raphael
//Function för tärningen och kontrollering av poäng
rollDiceImg.addEventListener('click', function () {
  if (playing) {
    // Generera slumpmässig tärning
    const tärning = Math.trunc(Math.random() * 6) + 1;
    // Visa tärningsbild
    diceImg.classList.remove('hidden');
    // Lägg till slumpmässig tärningsbild till bildkälla
    diceImg.src = `images/dice${tärning}.png`;
    // Kontrollera om det är 1 och byt spelare
    if (tärning !== 1) {
      // Behåll den aktuella poängen för den aktiva spelaren
      currentScore += tärning;
      playerScores[activePlayer].textContent = currentScore;
    } else {
      bytSpelare();
    }
  }
});

//Johan
// Behåll poäng
holdDice.addEventListener('click', function () {
  if (playing) {
    // Lägg till aktuell poäng till den aktiva spelarens poäng
    scores[activePlayer] += currentScore;

    // Visa den hållna poängen
    scoreElements[activePlayer].textContent = scores[activePlayer];
    
    // Kontrollera om poängen är 50 eller mer och om de vann
    if (scores[activePlayer] >= 50) {
      // Avsluta spelet
      playing = false;
      playerElements[activePlayer].classList.add('player--winner');
      playerElements[activePlayer].classList.remove('player--active');
      diceImg.classList.add('hidden');
    } else {
      // Byt spelare
      bytSpelare();
    }
  }
});

//Raphael
// Starta om spelet
newGame.addEventListener('click', init);
