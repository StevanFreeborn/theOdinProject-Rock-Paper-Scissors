import {
  getComputerChoice,
  getResultMessage,
  OUTCOMES,
  playRound,
} from './game.js';
import { capitalize } from './utils.js';

window.addEventListener('DOMContentLoaded', () => {
  addButtons();
});

function addButtons() {
  const container = document.querySelector('#buttons-container');
  Object.keys(OUTCOMES).forEach(choice => addButton(choice, container));
}

function addButton(choice, container) {
  const button = document.createElement('button');
  button.setAttribute('data-choice', choice);
  button.addEventListener('click', e => {
    const result = playRound(e.target.dataset.choice, getComputerChoice());
    const message = getResultMessage(
      result,
      e.target.dataset.choice,
      getComputerChoice()
    );

    console.log(message);
  });
  button.textContent = capitalize(choice);
  container.appendChild(button);
}
