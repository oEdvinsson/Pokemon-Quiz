'use strict'

const button = document.querySelectorAll('.button');
const image = document.getElementById('img');
const newPokemon = document.getElementById('newPokemon');
const score = document.getElementById('score');
const highScore = document.getElementById('highScore');

const pokemons = ['bulbasaur', 'chansey', 'charmander', 'pikachu', 'squirtle'];

let playerScore = 0;
let playerHighScore = 0;

for (let i = 0; i < button.length; i++) {
    button[i].addEventListener('click', guess)
};

function guess(e) {
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = true;
   };
    const clickedPokemon = e.target.textContent.toLowerCase();
    const imgSrc = img.src.toLowerCase();
    console.log(imgSrc)
    const foundPokemon = pokemons.find(pokemon => imgSrc.includes(pokemon.toLowerCase()));
  
    if (foundPokemon && foundPokemon.toLowerCase() === clickedPokemon) {
      console.log('Correct!');
      playerScore++;
      score.textContent = playerScore;
    } else {
      console.log('Wrong answer');
      score.textContent = 0;
      if (playerScore > playerHighScore) {
        highScore.textContent = playerScore;
        playerScore = 0;
      }
    }
}

newPokemon.addEventListener('click', pokemon)

function pokemon() {
  for (let i = 0; i < button.length; i++) {
    button[i].disabled = false;
 };
    const shuffled = pokemons.sort(() => Math.random() - 0.5);
    button[0].textContent = shuffled[0];
    button[1].textContent = shuffled[1];
    button[2].textContent = shuffled[2];
    const chosenPokemon = Math.floor(Math.random()* 3);
    image.src = `${shuffled[chosenPokemon]}.jpg`;
};
