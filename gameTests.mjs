import {
  getComputerChoice,
  capitalize,
  getResultMessage,
  playRound,
} from './game.mjs';

const tests = {
  getComputerChoice_WhenCalled_ItShouldReturnRockPaperOrScissors() {
    const result = getComputerChoice();
    return result === 'rock' || result === 'paper' || result === 'scissors';
  },
  capitalize_WhenCalled_ItShouldReturnTheWordGivenCapitalized() {
    const cases = {
      'hello': 'Hello',
      'Hello': 'Hello',
      'heLLO': 'Hello',
      'WoRld': 'World',
    }

    for (const [word, expectedResult] of Object.entries(cases)) {
      const result = capitalize(word);

      if (result !== expectedResult) {
        console.log(`${result} != ${expectedResult}`)
        return false
      }
    }

    return true;
  },
  getResultMessage_WhenCalled_ItShouldReturnProperResultMessage() {
    const cases = [
      {
        result: 1,
        playerChoice: 'rock',
        computerChoice: 'scissors',
        expectedMessage: 'You Win! Rock beats Scissors',
      },
      {
        result: 0,
        playerChoice: 'rock',
        computerChoice: 'rock',
        expectedMessage: 'You Tie! Rock ties Rock',
      },
      {
        result: -1,
        playerChoice: 'paper',
        computerChoice: 'scissors',
        expectedMessage: 'You Lose! Scissors beats Paper',
      },
    ]

    for (const cs of cases) {
      const result = getResultMessage(cs.result, cs.playerChoice, cs.computerChoice);

      if (result !== cs.expectedMessage) {
        console.log(`${result} != ${cs.expectedMessage}`);
        return false;
      }
    }

    return true;
  },
  playRound_WhenCalled_ItShouldReturnProperMessageIndicatingIfPlayerWonOrLost() {
    const cases = [
      {
        playerChoice: 'rock',
        computerChoice: 'paper',
        expectedResult: -1,
      },
      {
        playerChoice: 'rock',
        computerChoice: 'scissors',
        expectedResult: 1,
      },
      {
        playerChoice: 'rock',
        computerChoice: 'rock',
        expectedResult: 0,
      },
      {
        playerChoice: 'paper',
        computerChoice: 'paper',
        expectedResult: 0,
      },
      {
        playerChoice: 'paper',
        computerChoice: 'scissors',
        expectedResult: -1,
      },
      {
        playerChoice: 'paper',
        computerChoice: 'rock',
        expectedResult: 1,
      },
      {
        playerChoice: 'scissors',
        computerChoice: 'paper',
        expectedResult: 1,
      },
      {
        playerChoice: 'scissors',
        computerChoice: 'scissors',
        expectedResult: 0,
      },
      {
        playerChoice: 'scissors',
        computerChoice: 'rock',
        expectedResult: -1,
      },
    ];

    for (const cs of cases) {
      const result = playRound(cs.playerChoice, cs.computerChoice);

      if (result !== cs.expectedResult) {
        console.log(`${result} != ${cs.expectedResult}`);
        return false;
      }
    }

    return true;
  }
}

function run() {
  for (const [testName, test] of Object.entries(tests)) {
    const result = test.call();

    if (!result) {
      console.log(`${testName} - Failed ❌`);
    } else {
      console.log(`${testName} - Passed ✅`);
    }
  }
}

run();