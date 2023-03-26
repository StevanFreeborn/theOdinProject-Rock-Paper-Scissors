const OUTCOMES = {
  'rock': {
    'paper': -1,
    'scissors': 1,
    'rock': 0,
  },
  'paper': {
    'paper': 0,
    'scissors': -1,
    'rock': 1,
  },
  'scissors': {
    'paper': 1,
    'scissors': 0,
    'rock': -1,
  }
};

/**
 * Randomly selects a choice for the computer.
 * @returns {string} The computers choice.
 */
function getComputerChoice() {
  const choices = Object.keys(OUTCOMES);

  const randomIndex = Math.floor(
    Math.random() * choices.length
  );

  return choices[randomIndex];
}

/**
 * Takes a word, capitalizes its first letter and lower cases the rest of the word.
 * @param {string} word - The word you want to capitalize.
 * @returns {string} The capitalized word.
 */
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}


/**
 * Gets a result message indicating if the player won or lost the game.
 * @param {number} result - A number that indicates whether the player won or lost.
 * @param {string} playerChoice - The players choosen move.
 * @param {string} computerChoice - The computers choosen move.
 * @returns {string} A message indicating whether the player won or lost.
 */
function getResultMessage(
  result,
  playerChoice,
  computerChoice
) {
  const capitalizedPlayerChoice = capitalize(playerChoice);
  const capitalizedComputerChoice = capitalize(computerChoice);

  switch (result) {
    case 1:
      return `You Win! ${capitalizedPlayerChoice} beats ${capitalizedComputerChoice}`;
    case -1:
      return `You Lose! ${capitalizedComputerChoice} beats ${capitalizedPlayerChoice}`;
    default:
      return `You Tie! ${capitalizedPlayerChoice} ties ${capitalizedComputerChoice}`
  }
}

/**
 * Plays around of rock paper scissors between the player and the computer.
 * @param {string} playerChoice - The players choice.
 * @param {string} computerChoice - The computers choice.
 * @returns {string} Returns a message indicating whether the player or computer won the round.
 */
function playRound(
  playerChoice,
  computerChoice
) {
  const playerChoiceLowered = playerChoice.toLowerCase();
  const outcome = OUTCOMES[playerChoiceLowered];

  if (!outcome) {
    return `${playerChoice} is not a valid choice. Please choose Rock, Paper, or Scissors.`;
  }

  const result = outcome[computerChoice];
  return getResultMessage(result, playerChoice, computerChoice);
}

export {
  getComputerChoice,
  capitalize,
  getResultMessage,
  playRound,
}