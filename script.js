const bodyParts = [
  new Circle({cx: 210, cy: 70, radius: 30, name: 'head'}),
  new Line({x1: 210, x2: 210, y1: 100, y2: 180, name: 'body line'}),
  new Line({x1: 210, x2: 250, y1: 110, y2: 150, name: 'right hand'}),
  new Line({x1: 210, x2: 170, y1: 110, y2: 150, name: 'left hand'}),
  new Line({x1: 210, x2: 240, y1: 180, y2: 230, name: 'right leg'}),
  new Line({x1: 210, x2: 180, y1: 180, y2: 230, name: 'left leg'})
];

const modalActions = {
  TRY_AGAIN: 'TRY_AGAIN'
};

const winningModalTemplate = `
  <h1 class="modal-title">YOU WON!</h1>
  <button class="modal-action" data-action="TRY_AGAIN">NEW GAME</button>
`;

const losiningModalTemplate = `
  <h1 class="modal-title">YOU LOSE!</h1>
  <button class="modal-action" data-action="TRY_AGAIN">TRY AGAIN</button>
`;

const modalEl = document.createElement('div');
modalEl.classList.add('modal-container');
modalEl.innerHTML = winningModalTemplate;
const modal = new Modal(modalEl, document.body);

const svg = document.querySelector('#svg');

let wordToGuess;
let correctLetters = [];
let wrongLetters = [];

const checkWin = () => {
  let temp = true;
  const correctLettersMap = {};
  for (let letter of correctLetters) {
    correctLettersMap[letter] = letter;
  }
  for (let letter of wordToGuess) {
    if(!correctLettersMap[letter]) {
      temp = false;
    }
  }
  return temp;
};

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
  if (checkWin()) {
    modalEl.innerHTML = winningModalTemplate;
    modal.open();
  }
};

const getWord = async () => {
  const res = await fetch('https://random-word-api.herokuapp.com/word?number=1');
  const word = await res.json();
  console.log(word);
  drawWord(word[0]);
};

const isCorrect = (letter) => {
  return wordToGuess.includes(letter);
};

const drawBodyPart = () => {
  const index = wrongLetters.length - 1;
  if (index < bodyParts.length) {
    const bodyPart = bodyParts[index];
    svg.append(bodyPart.getElement());
    bodyPart.draw();
  }
  if (index >= bodyParts.length - 1) {
    modalEl.innerHTML = losiningModalTemplate;
    modal.open();
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

const removeBodyParts = () => {
  bodyParts.forEach((bodyPart) => {
    bodyPart.remove();
  });
};

const tryAgain = () => {
  correctLetters = [];
  wrongLetters = [];
  getWord();
  removeBodyParts();
};

getWord();

window.addEventListener('keydown', (event) => {
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    const letter = event.key;
    addLetter(letter);
  }
});

modalEl.addEventListener('click', (event) => {
  const data = event.target.dataset;
  switch(data.action){
    case(modalActions.TRY_AGAIN):
      modal.close();
      tryAgain();
      break;
  }
});