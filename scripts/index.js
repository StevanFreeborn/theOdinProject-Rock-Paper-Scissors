import {
  getComputerChoice,
  getResultMessage,
  OUTCOMES,
  playRound,
} from './game.js';
import { capitalize } from './utils.js';

/**
 * @typedef {Object} State
 * @property {HTMLElement} buttons - The buttons container.
 * @property {HTMLElement} playerScore - The player's score.
 * @property {HTMLElement} computerScore - The computer's score.
 * @property {HTMLElement} result - The result container.
 */
const state = {
  buttons: document.querySelector('#buttons-container'),
  playerScore: document.querySelector('#player-score'),
  computerScore: document.querySelector('#computer-score'),
  result: document.querySelector('#result'),
};

window.addEventListener('DOMContentLoaded', () => {
  addChoiceButtons();
});

/**
 * Adds buttons for each choice.
 * @returns {void}
 */
function addChoiceButtons() {
  Object.keys(OUTCOMES).forEach(choice =>
    addChoiceButton(choice)
  );
}

/**
 * Adds a button for a choice.
 * @param {string} choice - The choice to add a button for.
 * @returns {void}
 */
function addChoiceButton(choice) {
  const button = document.createElement('button');
  button.setAttribute('data-choice', choice);
  button.addEventListener('click', playGame);
  button.textContent = capitalize(choice);
  state.buttons.appendChild(button);
}

/**
 * Plays a round of Rock, Paper, Scissors.
 * @param {event} e - The event object.
 * @returns {void}
 */
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

/**
 * Updates the score.
 * @param {number} result - The result of the round.
 * @returns {void}
 */
function updateScore(result) {
  result === 1
    ? updatePlayerScore()
    : updateComputerScore();
}

/**
 * Updates the player's score.
 * @returns {void}
 */
function updatePlayerScore() {
  state.playerScore.textContent =
    parseInt(state.playerScore.textContent) + 1;
}

/**
 * Updates the computer's score.
 * @returns {void}
 */
function updateComputerScore() {
  state.computerScore.textContent =
    parseInt(state.computerScore.textContent) + 1;
}

/**
 * Checks if there is a winner.
 * @returns {number} 1 if the player wins, -1 if the computer wins, 0 if there is no winner.
 */
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

/**
 * Displays the round winner.
 * @param {number} result - The result of the round.
 * @param {string} playerChoice - The player's choice.
 * @param {string} computerChoice - The computer's choice.
 * @returns {void}
 */
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

/**
 * Displays the game winner.
 * @param {number} winner - 1 if the player wins, -1 if the computer wins.
 * @returns {void}
 */
function displayGameWinner(winner) {
  if (winner === 1) {
    state.result.textContent = 'You Win!';
    return;
  }

  state.result.textContent = 'The Computer Wins!';
}

/**
 * Removes all buttons from the buttons container.
 * @returns {void}
 */
function removeButtons() {
  state.buttons.innerHTML = '';
}

/**
 * Resets the game.
 * @returns {void}
 */
function resetGame() {
  state.playerScore.textContent = 0;
  state.computerScore.textContent = 0;
  state.result.textContent = '';
  removeButtons();
  addChoiceButtons();
}

/**
 * Adds a button to play again.
 * @returns {void}
 */
function addPlayAgain() {
  const resetButton = document.createElement('button');
  resetButton.textContent = 'Play Again';
  resetButton.addEventListener('click', resetGame);
  state.buttons.appendChild(resetButton);
}
