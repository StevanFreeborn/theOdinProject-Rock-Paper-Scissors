import {
  getComputerChoice,
  getResultMessage,
  OUTCOMES,
  playRound,
} from './game.js';
import { capitalize } from './utils.js';

const state = {
  buttons: document.querySelector('#buttons-container'),
  playerScore: document.querySelector('#player-score'),
  computerScore: document.querySelector('#computer-score'),
  result: document.querySelector('#result'),
};

window.addEventListener('DOMContentLoaded', () => {
  addChoiceButtons();
});

function addChoiceButtons() {
  Object.keys(OUTCOMES).forEach(choice =>
    addChoiceButton(choice)
  );
}

function addChoiceButton(choice) {
  const button = document.createElement('button');
  button.setAttribute('data-choice', choice);
  button.addEventListener('click', playGame);
  button.textContent = capitalize(choice);
  state.buttons.appendChild(button);
}

function playGame(e) {
  const roundResult = playRound(
    e.target.dataset.choice,
    getComputerChoice()
  );

  updateScore(roundResult);

  const gameResult = checkForWinner();

  if (gameResult === 0) {
    displayRoundWinner(
      roundResult,
      e.target.dataset.choice,
      getComputerChoice()
    );
    return;
  }

  displayGameWinner(gameResult);
  removeButtons();
  addPlayAgain();
}

function updateScore(result) {
  result === 1
    ? updatePlayerScore()
    : updateComputerScore();
}

function updatePlayerScore() {
  state.playerScore.textContent =
    parseInt(state.playerScore.textContent) + 1;
}

function updateComputerScore() {
  state.computerScore.textContent =
    parseInt(state.computerScore.textContent) + 1;
}

function checkForWinner() {
  const playerScore = state.playerScore.textContent;
  const computerScore = state.computerScore.textContent;

  if (parseInt(playerScore) === 5) {
    return 1;
  }

  if (parseInt(computerScore) === 5) {
    return -1;
  }

  return 0;
}

function displayRoundWinner(
  result,
  playerChoice,
  computerChoice
) {
  const message = getResultMessage(
    result,
    playerChoice,
    computerChoice
  );
  state.result.textContent = message;
}

function displayGameWinner(winner) {
  if (winner === 1) {
    state.result.textContent = 'You Win!';
    return;
  }

  state.result.textContent = 'The Computer Wins!';
}

function removeButtons() {
  state.buttons.innerHTML = '';
}

function resetGame() {
  state.playerScore.textContent = 0;
  state.computerScore.textContent = 0;
  state.result.textContent = '';
  removeButtons();
  addChoiceButtons();
}

function addPlayAgain() {
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Play Again';
  resetButton.addEventListener('click', resetGame);
  state.buttons.appendChild(resetButton);
}
