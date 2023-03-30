import fs from 'fs';
import path from 'path';
import {
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
} from '../scripts/index.js';

describe('index', () => {
  beforeEach(() => {
    const viewPath = path.join(
      path.resolve(path.dirname('')),
      'index.html'
    );
    const view = fs.readFileSync(viewPath, 'utf8');
    document.documentElement.innerHTML = view.toString();
  });

  describe('state', () => {
    it('should be an object', () => {
      expect(state).toBeInstanceOf(Object);
    });

    it('it should have proper properties', () => {
      expect(state).toHaveProperty('playerScore');
      expect(state).toHaveProperty('computerScore');
      expect(state).toHaveProperty('result');
      expect(state).toHaveProperty('buttons');
    });

    describe('state.playerScore', () => {
      it('should return player score element', () => {
        const playerScore = state.playerScore();
        expect(playerScore).toBeInstanceOf(HTMLElement);
        expect(playerScore.id).toBe('player-score');
        expect(playerScore.textContent).toBe('0');
      });
    });

    describe('state.computerScore', () => {
      it('should return computer score element', () => {
        const computerScore = state.computerScore();
        expect(computerScore).toBeInstanceOf(HTMLElement);
        expect(computerScore.id).toBe('computer-score');
        expect(computerScore.textContent).toBe('0');
      });
    });

    describe('state.result', () => {
      it('should return result element', () => {
        const result = state.result();
        expect(result).toBeInstanceOf(HTMLElement);
        expect(result.id).toBe('result');
        expect(result.innerHTML).toBe('&nbsp;');
      });
    });

    describe('state.buttons', () => {
      it('should return buttons container element', () => {
        const buttons = state.buttons();
        expect(buttons).toBeInstanceOf(HTMLElement);
        expect(buttons.id).toBe('buttons-container');
        expect(buttons.innerHTML).toBe('');
      });
    });
  });

  describe('addChoiceButton', () => {
    it('should add button to buttons container', () => {
      addChoiceButton('rock');

      const buttons = state.buttons();
      const buttonsArray = [
        ...buttons.querySelectorAll('button'),
      ];
      const buttonTexts = buttonsArray.map(
        button => button.textContent
      );

      expect(buttons.innerHTML).not.toBe('');
      expect(buttonsArray.length).toBe(1);
      expect(buttonTexts).toEqual(
        expect.arrayContaining(['Rock'])
      );
    });
  });

  describe('addChoiceButtons', () => {
    it('should add buttons to buttons container', () => {
      addChoiceButtons();

      const buttons = state.buttons();
      const buttonsArray = [
        ...buttons.querySelectorAll('button'),
      ];
      const buttonTexts = buttonsArray.map(
        button => button.textContent
      );

      expect(buttons.innerHTML).not.toBe('');
      expect(buttonsArray.length).toBe(3);
      expect(buttonTexts).toEqual(
        expect.arrayContaining([
          'Rock',
          'Paper',
          'Scissors',
        ])
      );
    });
  });

  describe('addPlayAgain', () => {
    it('should add button to buttons container', () => {
      addPlayAgain();

      const buttons = state.buttons();
      const buttonsArray = [
        ...buttons.querySelectorAll('button'),
      ];
      const buttonTexts = buttonsArray.map(
        button => button.textContent
      );

      expect(buttons.innerHTML).not.toBe('');
      expect(buttonsArray.length).toBe(1);
      expect(buttonTexts).toEqual(
        expect.arrayContaining(['Play Again'])
      );
    });
  });

  describe('checkForWinner', () => {
    it('should return 0 when no player has reached 5 wins', () => {
      const result = checkForWinner();
      expect(result).toBe(0);
    });

    it('should return 1 when player has reached 5 wins', () => {
      state.playerScore().textContent = '5';
      const result = checkForWinner();
      expect(result).toBe(1);
    });

    it('should return -1 when computer has reached 5 wins', () => {
      state.computerScore().textContent = '5';
      const result = checkForWinner();
      expect(result).toBe(-1);
    });
  });

  describe('displayGameWinner', () => {
    it('should display proper message when player wins', () => {
      const result = 1;
      displayGameWinner(result);
      expect(
        document.getElementById('result').textContent
      ).toBe('You Win!');
    });

    it('should display proper message when computer wins', () => {
      const result = -1;
      displayGameWinner(result);
      expect(
        document.getElementById('result').textContent
      ).toBe('The Computer Wins!');
    });
  });

  describe('displayRoundWinner', () => {
    it('should display proper message when player wins', () => {
      const result = 1;
      const playerChoice = 'rock';
      const computerChoice = 'scissors';
      displayRoundWinner(
        result,
        playerChoice,
        computerChoice
      );
      expect(
        document.getElementById('result').textContent
      ).toBe('You Win! Rock beats Scissors');
    });

    it('should display proper message when computer wins', () => {
      const result = -1;
      const playerChoice = 'rock';
      const computerChoice = 'paper';
      displayRoundWinner(
        result,
        playerChoice,
        computerChoice
      );
      expect(
        document.getElementById('result').textContent
      ).toBe('You Lose! Paper beats Rock');
    });

    it('should display proper message when it is a tie', () => {
      const result = 0;
      const playerChoice = 'rock';
      const computerChoice = 'rock';
      displayRoundWinner(
        result,
        playerChoice,
        computerChoice
      );
      expect(
        document.getElementById('result').textContent
      ).toBe('You Tie! Rock ties Rock');
    });
  });

  describe('removeButtons', () => {
    it('should remove buttons from buttons container', () => {
      addChoiceButtons();
      removeButtons();
      expect(state.buttons().innerHTML).toBe('');
    });
  });

  describe('resetGame', () => {
    it('should reset game state', () => {
      resetGame();
      expect(state.playerScore().textContent).toBe('0');
      expect(state.computerScore().textContent).toBe('0');
      expect(state.result().innerHTML).toBe('&nbsp;');
      expect(state.buttons().innerHTML).not.toBe('');
    });
  });

  describe('updateComputerScore', () => {
    it('should increment computer score', () => {
      updateComputerScore();
      expect(state.computerScore().textContent).toBe('1');
    });
  });

  describe('updatePlayerScore', () => {
    it('should increment player score', () => {
      updatePlayerScore();
      expect(state.playerScore().textContent).toBe('1');
    });
  });

  describe('updateScore', () => {
    it('should increment player score when player wins', () => {
      updateScore(1);
      expect(state.playerScore().textContent).toBe('1');
      expect(state.computerScore().textContent).toBe('0');
    });

    it('should increment computer score when computer wins', () => {
      updateScore(-1);
      expect(state.computerScore().textContent).toBe('1');
      expect(state.playerScore().textContent).toBe('0');
    });

    it('should not increment score when it is a tie', () => {
      updateScore(0);
      expect(state.playerScore().textContent).toBe('0');
      expect(state.computerScore().textContent).toBe('0');
    });
  });

  describe('playGame', () => {
    it('should be called if player clicks on a button', () => {
      addChoiceButtons();
      const buttons = state.buttons();
      const buttonsArray = [
        ...buttons.querySelectorAll('button'),
      ];
      const button = buttonsArray[0];
      button.click();
      expect(state.result().textContent).not.toBe('');
    });

    it('should play round and display result of the round if no winner', () => {
      const playerChoice = 'rock';
      const computerChoice = 'scissors';
      playGame(playerChoice, computerChoice);
      expect(state.result().textContent).toBe(
        'You Win! Rock beats Scissors'
      );
    });

    it('should play round and display game winner if someone wins', () => {
      const playerChoice = 'rock';
      const computerChoice = 'scissors';
      state.playerScore().textContent = '4';
      playGame(playerChoice, computerChoice);
      expect(state.result().textContent).toBe('You Win!');
    });
  });
});
