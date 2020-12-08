const bodyParts = [
  new Circle({cx: 210, cy: 70, radius: 30, name: 'head'}),
  new Line({x1: 210, x2: 210, y1: 100, y2: 180, name: 'body line'}),
  new Line({x1: 210, x2: 250, y1: 110, y2: 150, name: 'right hand'}),
  new Line({x1: 210, x2: 170, y1: 110, y2: 150, name: 'left hand'}),
  new Line({x1: 210, x2: 240, y1: 180, y2: 230, name: 'right leg'}),
  new Line({x1: 210, x2: 180, y1: 180, y2: 230, name: 'left leg'})
];

const svg = document.querySelector('#svg');

let wordToGuess;
const correctLetters = [];
const wrongLetters = [];

const drawWord = (word) => {
  const wordGuess = document.querySelector('#word-guess');
  const wordGueesHTML = word
  .split('')
  .map((letter) => {
    let letterSpan;
    if (correctLetters.includes(letter)) {
      letterSpan = `<span class="letter-guess guessed">${letter}</span>`;
    } else {
      letterSpan = `<span class="letter-guess"></span>`;
    }
    return letterSpan;
  })
  .join('');
  wordGuess.innerHTML = wordGueesHTML;
  wordToGuess = word;
};

const getWord = async () => {
  const res = await fetch('https://random-word-api.herokuapp.com/word?number=1');
  const word = await res.json();
  drawWord(word[0]);
};

const isCorrect = (letter) => {
  return wordToGuess.includes(letter);
};

const drawBodyPart = () => {
  const index = wrongLetters.length - 1;
  if (index >= bodyParts.length) {

  } else {
    const bodyPart = bodyParts[index];
    svg.append(bodyPart.getElement());
    bodyPart.draw();
  }
};

const addWrongLetter = (letter) => {
  if (wrongLetters.includes(letter)) {

  } else {
    wrongLetters.push(letter);
    drawBodyPart();
  }
};

const addCorrectLetter = (letter) => {
  if (correctLetters.includes(letter)) {

  } else {
    correctLetters.push(letter);
    drawWord(wordToGuess);
  }
};

const addLetter = (letter) => {
  if (isCorrect(letter)) {
    addCorrectLetter(letter);
  } else {
    addWrongLetter(letter);
  }
};

getWord();

window.addEventListener('keydown', (event) => {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letter = event.key;
    addLetter(letter);
  }
});