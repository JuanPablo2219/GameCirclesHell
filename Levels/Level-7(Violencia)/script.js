// Lista de palabras para el juego
const words = [
  ["homicidas", "criminales"],
  ["tiranos", "bandidos"],
  ["abusadores", "opresores"],
];

// Nivel actual del juego
let currentLevel = 0;

// Palabra seleccionada al azar para el nivel actual
let selectedWord = getRandomWord();

// Arreglo para almacenar las letras adivinadas
let guessedWord = [];

// Número máximo de intentos
const maxGuesses = 4;

// Número de intentos restantes
let remainingGuesses = maxGuesses;

// Referencias a elementos HTML
const wordElement = document.getElementById("word");
const guessesElement = document.getElementById("guesses");
const lettersGuessedElement = document.getElementById("letters-guessed");
const wordsRemainingElement = document.getElementById("words-remaining");

// Inicializar la palabra adivinada con guiones bajos
for (let i = 0; i < selectedWord.length; i++) {
  guessedWord.push("_");
}

// Función para seleccionar una palabra al azar para el nivel actual
function getRandomWord() {
  const levelWords = words[currentLevel];
  return levelWords[Math.floor(Math.random() * levelWords.length)];
}

// Función para adivinar una letra
function guessLetter() {
  const letterInput = document.getElementById("letter-input");
  const letter = letterInput.value.toLowerCase();

  if (letter.length !== 1) {
    alert("Por favor, ingresa una sola letra.");
    return;
  }

  if (!isLetter(letter)) {
    alert("Por favor, ingresa una letra válida.");
    return;
  }

  if (guessedWord.indexOf(letter) !== -1) {
    alert("Ya has adivinado esa letra.");
    return;
  }

  let letterFound = false;


  for (var i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === letter) {
      guessedWord[i] = letter;
      letterFound = true;
    }
  }

  if (!letterFound) {
    remainingGuesses--;
  }

  letterInput.value = "";
  updateGameStatus();
}

// Función para obtener una pista
function getHint() {
  alert("La primera letra de la palabra es: " + selectedWord[0]);
}

// Función para actualizar el estado del juego
function updateGameStatus() {
  wordElement.textContent = guessedWord.join(" ");
  guessesElement.textContent = remainingGuesses;
  lettersGuessedElement.textContent = guessedWord.filter(function(letter) {
    return letter !== "_";
  }).join(" ");
  wordsRemainingElement.textContent = words.length - currentLevel;

  if (guessedWord.indexOf("_") === -1) {
    alert("¡Felicidades! Has adivinado la palabra.");
    if (currentLevel < words.length - 1) {
      alert("La palabra era: " + selectedWord);
      currentLevel++;
      selectedWord = getRandomWord();
      guessedWord = [];
      remainingGuesses = maxGuesses;
      for (var i = 0; i < selectedWord.length; i++) {
        guessedWord.push("_");
      }
      updateGameStatus();
    } else {
      alert("¡Has completado todos los niveles!");
      resetGame();
    }
  } else if (remainingGuesses === 0) {
    alert("¡Agotaste tus intentos! La palabra era: " + selectedWord);
    resetGame();
  }
}

// Función para reiniciar el juego
function resetGame() {
  currentLevel = 0;
  selectedWord = getRandomWord();
  guessedWord = [];
  remainingGuesses = maxGuesses;

  for (var i = 0; i < selectedWord.length; i++) {
    guessedWord.push("_");
  }

  updateGameStatus();
}

// Función para verificar si un valor es una letra
function isLetter(value) {
  return value.length === 1 && value.match(/[a-z]/i);
}

// Actualizar el estado inicial del juego
updateGameStatus();
