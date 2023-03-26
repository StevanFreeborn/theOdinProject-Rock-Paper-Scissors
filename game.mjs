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
 * Plays a round of rock paper scissors between the player and the computer.
 * @param {string} playerChoice - The players choice.
 * @param {string} computerChoice - The computers choice.
 * @returns {number} Returns a value indicating whether the player won (1), lost (-1), or tied (0).
 */
function playRound(
  playerChoice,
  computerChoice
) {
  const playerChoiceLowered = playerChoice.toLowerCase();
  const outcome = OUTCOMES[playerChoiceLowered];
  return outcome[computerChoice];
}

/**
 * Runs 5 rounds of the game, keeps score, and displays the result of each round and of the game.
 */
function game() {
  let playerWins = 0;
  let computerWins = 0;

  for (const num in [...Array(5).keys()]) {
    let playerChoice;
    let outcome;

    do {

      playerChoice = prompt('Rock, Paper, or Scissors?');

      if (!playerChoice) {
        continue;
      }

      outcome = OUTCOMES[playerChoice.toLowerCase()];

      if (!outcome) {
        alert(`${playerChoice} is not a valid choice.`);
      }

    } while (!outcome)

    const computerChoice = getComputerChoice();

    const result = playRound(playerChoice, computerChoice);


    if (result === 1) {
      playerWins++;
    }

    if (result === -1) {
      computerWins++;
    }

    const resultMessage = getResultMessage(result, playerChoice, computerChoice);

    console.log(`${resultMessage} Score: Player: ${playerWins} Computer: ${computerWins}`);
  }

  if (computerWins > playerWins) {
    console.log('You lost and the Computer won.');
    return;
  }

  if (playerWins > computerWins) {
    console.log('You win and the Computer lost.');
    return;
  }

  console.log('You tied with the computer');
}

game();

export {
  getComputerChoice,
  capitalize,
  getResultMessage,
  playRound,
}