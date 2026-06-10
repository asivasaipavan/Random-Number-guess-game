const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const restartBtn = document.getElementById('restartBtn');
const hintBtn = document.getElementById('hintBtn');
const messageBox = document.getElementById('messageBox');
const attemptsText = document.getElementById('attemptsText');
const bestText = document.getElementById('bestText');
const historyList = document.getElementById('historyList');

let secretNumber;
let attempts;
let bestScore = null;
let gameOver = false;
const MIN = 1;
const MAX = 100;

function startNewGame() {
  secretNumber = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
  attempts = 0;
  gameOver = false;
  attemptsText.textContent = attempts;
  guessInput.value = '';
  guessInput.disabled = false;
  guessBtn.disabled = false;
  historyList.innerHTML = '';
  setMessage('Start guessing to begin the game.');
}

function setMessage(text, type = '') {
  messageBox.textContent = text;
  messageBox.className = 'message';
  if (type) messageBox.classList.add(type);
}

function addHistory(guess, resultText) {
  const li = document.createElement('li');
  li.innerHTML = `<strong>${guess}</strong> — ${resultText}`;
  historyList.prepend(li);
}

function checkGuess() {
  const guess = Number(guessInput.value);

  if (!Number.isInteger(guess)) {
    setMessage('Please enter a valid number.', 'wrong-high');
    return;
  }

  if (guess < MIN || guess > MAX) {
    setMessage(`Enter a number between ${MIN} and ${MAX}.`, 'wrong-high');
    return;
  }

  attempts += 1;
  attemptsText.textContent = attempts;

  if (guess === secretNumber) {
    setMessage(`Correct! ${guess} is the secret number. You won in ${attempts} attempts.`, 'correct');
    addHistory(guess, 'Correct');
    gameOver = true;
    guessInput.disabled = true;
    guessBtn.disabled = true;

    if (bestScore === null || attempts < bestScore) {
      bestScore = attempts;
      bestText.textContent = bestScore;
    }
    return;
  }

  if (guess > secretNumber) {
    setMessage('Too high. Try a smaller number.', 'wrong-high');
    addHistory(guess, 'Too high');
  } else {
    setMessage('Too low. Try a bigger number.', 'wrong-low');
    addHistory(guess, 'Too low');
  }

  guessInput.select();
}

function giveHint() {
  const midpoint = Math.floor((MIN + MAX) / 2);
  const hint = secretNumber <= midpoint
    ? `Hint: The number is between ${MIN} and ${midpoint}.`
    : `Hint: The number is between ${midpoint + 1} and ${MAX}.`;
  setMessage(hint);
}

guessBtn.addEventListener('click', checkGuess);
restartBtn.addEventListener('click', startNewGame);
hintBtn.addEventListener('click', giveHint);

guessInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkGuess();
});

startNewGame();
