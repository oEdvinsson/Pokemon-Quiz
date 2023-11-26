'use strict'

// DOM Elements
const button = document.querySelectorAll('.button');
const image = document.getElementById('img');
const score = document.getElementById('score');
const highScore = document.getElementById('highScore');
const whatPokemon = document.getElementById('whatPokemon');




const array = [];
for (let i = 1; i <= 151; i++) {
  array.push(i);
}

const shuffled = array.sort(() => Math.random() - 0.5);
let counter = 0;

let pokemonData = [];
let playerScore = 0;
let playerHighScore = (localStorage.getItem("playerHighScore")) ? localStorage.getItem("playerHighScore") : 0;
highScore.textContent = playerHighScore;

for (let i = 0; i < button.length; i++) {
  button[i].addEventListener('click', guess)
};

fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    pokemonData = data.results.map(pokemon => pokemon.name);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

async function newPokemon(newPokemon) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${newPokemon}/`);
  const data = await response.json();
  image.src = data.sprites.front_default;
  console.log(data.name)
  const number = Math.floor(Math.random()* 3);

  button[number].textContent = data.name;
  for (let i = 0; i < button.length; i++) {
    if (i != number) {
      button[i].textContent = pokemonData[Math.floor(Math.random()* pokemonData.length)];
    }
  };
  whatPokemon.textContent = 'What pokémon is this?';
};

function guess(e) {
  // Disables buttons
  for (let i = 0; i < button.length; i++) {
    button[i].disabled = true;
 };
  const clickedPokemon = e.target.textContent.toLowerCase();
  const imgSrc = img.src.toLowerCase();
  console.log(img.src);

  const foundPokemon = pokemons.find(pokemon => imgSrc.includes(pokemon.toLowerCase()));
  
  if (foundPokemon && foundPokemon.toLowerCase() === clickedPokemon) {
    console.log('Correct!');
    whatPokemon.textContent = `Correct! it's a ${clickedPokemon}`;
    playerScore++;
    score.textContent = playerScore;
  } else {
    console.log('Wrong answer');
    whatPokemon.textContent = `Wrong! it's a ${foundPokemon}`;
    score.textContent = 0;
    if (playerScore > playerHighScore) {
      localStorage.setItem("playerHighScore", playerScore);
      highScore.textContent = localStorage.getItem("playerHighScore");
      playerScore = 0;
    }
  }
  setTimeout(() => {
    for (let i = 0; i < button.length; i++) {
      button[i].disabled = false;
   };
      counter++;
      newPokemon(shuffled[counter]);
  }, 1500);
  console.log(pokemons)
}


newPokemon(shuffled[counter]);

// function newPokemon() {
  // Disables buttons

 
//  let newPokemon = fetchPokemon(pokemon);

//  console.log(newPokemon);



  // setTimeout(() => {
  //   for (let i = 0; i < button.length; i++) {
  //     button[i].disabled = false;
  //  };
  //     const shuffled = pokemons.sort(() => Math.random() - 0.5);
  //     button[0].textContent = shuffled[0];
  //     button[1].textContent = shuffled[1];
  //     button[2].textContent = shuffled[2];
  //     const chosenPokemon = Math.floor(Math.random()* 3);
  //     image.src = `${shuffled[chosenPokemon]}.jpg`;
  //     whatPokemon.textContent = 'What pokémon is this?';
  // }, 1500);




