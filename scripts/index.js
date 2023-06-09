import {
  getComputerChoice,
  getResultMessage,
  OUTCOMES,
  playRound,
} from './game.js';
import { capitalize } from './utils.js';

/**
 * @typedef {Object} State
 * @property {function} buttons - Returns the buttons container.
 * @property {function} playerScore - Returns the player score element.
 * @property {function} computerScore - Returns the computer score element.
 * @property {function} result - Returns the result element.
 */
const state = {
  buttons: () =>
    document.querySelector('#buttons-container'),
  playerScore: () =>
    document.querySelector('#player-score'),
  computerScore: () =>
    document.querySelector('#computer-score'),
  result: () => document.querySelector('#result'),
};

window.addEventListener(
  'DOMContentLoaded',
  addChoiceButtons
);

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
  button.classList.add('button');
  button.setAttribute('data-choice', choice);
  button.addEventListener('click', e =>
    playGame(e.target.dataset.choice, getComputerChoice())
  );
  button.textContent = capitalize(choice);
  state.buttons().appendChild(button);
}

/**
 * Plays a round of Rock, Paper, Scissors.
 * @param {string} playerChoice - The player's choice.
 * @param {string} computerChoice - The computer's choice.
 * @returns {void}
 */
function playGame(playerChoice, computerChoice) {
  const roundResult = playRound(
    playerChoice,
    computerChoice
  );

  updateScore(roundResult);

  const gameResult = checkForWinner();

  if (gameResult === 0) {
    displayRoundWinner(
      roundResult,
      playerChoice,
      computerChoice
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
  if (result === 1) {
    updatePlayerScore();
    return;
  }

  if (result === -1) {
    updateComputerScore();
    return;
  }
}

/**
 * Updates the player's score.
 * @returns {void}
 */
function updatePlayerScore() {
  state.playerScore().textContent =
    parseInt(state.playerScore().textContent) + 1;
}

/**
 * Updates the computer's score.
 * @returns {void}
 */
function updateComputerScore() {
  state.computerScore().textContent =
    parseInt(state.computerScore().textContent) + 1;
}

/**
 * Checks if there is a winner.
 * @returns {number} 1 if the player wins, -1 if the computer wins, 0 if there is no winner.
 */
function checkForWinner() {
  const playerScore = state.playerScore().textContent;
  const computerScore = state.computerScore().textContent;

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

  state.result().textContent = message;
}

/**
 * Displays the game winner.
 * @param {number} winner - 1 if the player wins, -1 if the computer wins.
 * @returns {void}
 */
function displayGameWinner(winner) {
  if (winner === 1) {
    state.result().textContent = 'You Win!';
    return;
  }

  state.result().textContent = 'The Computer Wins!';
}

/**
 * Removes all buttons from the buttons container.
 * @returns {void}
 */
function removeButtons() {
  state.buttons().innerHTML = '';
}

/**
 * Resets the game.
 * @returns {void}
 */
function resetGame() {
  state.playerScore().textContent = 0;
  state.computerScore().textContent = 0;
  state.result().innerHTML = '&nbsp;';
  removeButtons();
  addChoiceButtons();
}

/**
 * Adds a button to play again.
 * @returns {void}
 */
function addPlayAgain() {
  const resetButton = document.createElement('button');
  resetButton.classList.add('button');
  resetButton.textContent = 'Play Again';
  resetButton.addEventListener('click', resetGame);
  state.buttons().appendChild(resetButton);
}

export {
  addChoiceButton,
  addChoiceButtons,
  addPlayAgain,
  checkForWinner,
  displayGameWinner,
  displayRoundWinner,
  playGame,
  removeButtons,
  resetGame,
  state,
  updateComputerScore,
  updatePlayerScore,
  updateScore,
};
