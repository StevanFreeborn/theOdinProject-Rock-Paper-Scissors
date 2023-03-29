import {
  getComputerChoice,
  getResultMessage,
  playRound,
} from '../scripts/game.js';

describe('game', () => {
  describe('getComputerChoice', () => {
    it('should return rock, paper, or scissors', () => {
      const result = getComputerChoice();
      expect(
        ['rock', 'paper', 'scissors'].includes(result)
      ).toBe(true);
    });
  });

  describe('getResultMessage', () => {
    it('should return proper result message', () => {
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
  });

  describe('playRound', () => {
    it('should return proper message indicating if player won or lost', () => {
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
        const result = playRound(
          testCase.playerChoice,
          testCase.computerChoice
        );
        expect(result).toBe(testCase.expectedResult);
      }
    });
  });
});
