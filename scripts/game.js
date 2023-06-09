import { capitalize } from './utils.js';

const OUTCOMES = {
  rock: {
    paper: -1,
    scissors: 1,
    rock: 0,
  },
  paper: {
    paper: 0,
    scissors: -1,
    rock: 1,
  },
  scissors: {
    paper: 1,
    scissors: 0,
    rock: -1,
  },
};

/**
 * Randomly selects a choice for the computer.
 * @returns {string} The computers choice.
 */
function getComputerChoice() {
  const choices = Object.keys(OUTCOMES);

  const randomIndex = Math.floor(Math.random() * choices.length);

  return choices[randomIndex];
}

/**
 * Gets a result message indicating if the player won or lost the game.
 * @param {number} result - A number that indicates whether the player won or lost.
 * @param {string} playerChoice - The players chosen move.
 * @param {string} computerChoice - The computers chosen move.
 * @returns {string} A message indicating whether the player won or lost.
 */
function getResultMessage(result, playerChoice, computerChoice) {
  const capitalizedPlayerChoice = capitalize(playerChoice);
  const capitalizedComputerChoice = capitalize(computerChoice);

  switch (result) {
    case 1:
      return `You Win! ${capitalizedPlayerChoice} beats ${capitalizedComputerChoice}`;
    case -1:
      return `You Lose! ${capitalizedComputerChoice} beats ${capitalizedPlayerChoice}`;
    default:
      return `You Tie! ${capitalizedPlayerChoice} ties ${capitalizedComputerChoice}`;
  }
}

/**
 * Plays a round of rock paper scissors between the player and the computer.
 * @param {string} playerChoice - The players choice.
 * @param {string} computerChoice - The computers choice.
 * @returns {number} Returns a value indicating whether the player won (1), lost (-1), or tied (0).
 */
function playRound(playerChoice, computerChoice) {
  const playerChoiceLowered = playerChoice.toLowerCase();
  const outcome = OUTCOMES[playerChoiceLowered];
  return outcome[computerChoice];
}

export { OUTCOMES, getComputerChoice, getResultMessage, playRound };
