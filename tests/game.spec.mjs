import {
  capitalize,
  getComputerChoice,
  getResultMessage,
  playRound,
} from '../scripts/game.mjs';

describe('game', () => {
  test('getComputerChoice_WhenCalled_ItShouldReturnRockPaperOrScissors', () => {
    const result = getComputerChoice();
    expect(['rock', 'paper', 'scissors'].includes(result)).toBe(true);
  });

  test('capitalize_WhenCalled_ItShouldReturnTheWordGivenCapitalized', () => {
    const testCases = {
      hello: 'Hello',
      Hello: 'Hello',
      heLLO: 'Hello',
      WoRld: 'World',
    };

    for (const [word, expectedResult] of Object.entries(testCases)) {
      const result = capitalize(word);
      expect(result).toBe(expectedResult);
    }
  });

  test('getResultMessage_WhenCalled_ItShouldReturnProperResultMessage', () => {
    const testCases = [
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
    ];

    for (const testCase of testCases) {
      const result = getResultMessage(
        testCase.result,
        testCase.playerChoice,
        testCase.computerChoice
      );
      expect(result).toBe(testCase.expectedMessage);
    }
  });

  test('playRound_WhenCalled_ItShouldReturnProperMessageIndicatingIfPlayerWonOrLost', () => {
    const testCases = [
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

    for (const testCase of testCases) {
      const result = playRound(testCase.playerChoice, testCase.computerChoice);
      expect(result).toBe(testCase.expectedResult);
    }
  });
});
