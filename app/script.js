const table = document.querySelector('#root');
table.classList.add('field');
const size = 5;

let create = (type) => {
  let element = document.createElement(type);
  return element;
};

const buttonContainer = create('div');
const button = create('button');
buttonContainer.classList.add('button-container');
buttonContainer.append(button, button.cloneNode(), button.cloneNode());
table.before(buttonContainer);

let buttons = Array.from(buttonContainer.querySelectorAll('button'));

const complexity = [
  { level: 'easy', color: 'green' },
  { level: 'medium', color: 'yellow' },
  { level: 'hard', color: 'red' },
];
for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.backgroundColor = complexity[i].color;
  buttons[i].textContent = complexity[i].level;
}

function randomInteger() {
  let rand = Math.random() * 2;
  return Math.floor(rand);
}

let numberOfBombs = 0;
let numberOfcells = 25;
let numberOflifes = 3;

buttonContainer.addEventListener('click', (event) => {
  if (event.target.textContent === 'easy') {
    numberOflifes = 3;
  } else if (event.target.textContent === 'medium') {
    numberOflifes = 2;
  } else if (event.target.textContent === 'hard') {
    numberOflifes = 1;
  }
  buttonContainer.style.display = 'none';
  table.style.display = 'flex';
  lifes.textContent = `lifes left: ${numberOflifes}`;
});

for (let y = 0; y < size; y++) {
  const row = create('div');
  for (let x = 0; x < size; x++) {
    const cell = create('div');
    cell.classList.add('field__item');
    let randElement = randomInteger();
    if (randElement === 0) {
      cell.setAttribute('data-type', 2);
    } else {
      cell.setAttribute('data-type', 3);
      numberOfBombs++;
    }
    row.append(cell);
  }
  table.append(row);
}

const bombsLeft = create('p');
const cellsOpen = create('p');
const lifes = create('p');
let winCondition = numberOfcells - numberOfBombs;

bombsLeft.textContent = `bombs left: ${numberOfBombs}`;
cellsOpen.textContent = `cells need open to win: ${winCondition}`;
lifes.textContent = `lifes left: ${numberOflifes}`;

table.append(bombsLeft, cellsOpen, lifes);

function handleClick(event) {
  if (event.target.style.backgroundColor !== 'white') {
    event.target.classList.add('element__after');
    event.target.style.backgroundColor = 'white';
    const liveOrDie = event.target.getAttribute('data-type');
    console.log(liveOrDie);

    if (liveOrDie === '3') {
      numberOflifes--;
    } else {
      winCondition--;
    }
    if (numberOflifes <= 0 || winCondition === 0) {
      let playAgainWindow = create('div');
      let playAgaineButton = create('button');
      playAgaineButton.addEventListener('click', () => {
        document.location.reload();
      });
      playAgaineButton.textContent = 'Try again';
      playAgainWindow.classList.add('message');
      if (winCondition === 0) {
        playAgainWindow.textContent = 'Well played you win';
        playAgainWindow.classList.add('message__success');
      }
      if (numberOflifes <= 0) {
        playAgainWindow.textContent = 'You dead';
        playAgainWindow.classList.add('message__failed');
      }

      playAgainWindow.append(playAgaineButton);
      document.body.append(playAgainWindow);
    }

    cellsOpen.textContent = `cells need open to win: ${winCondition}`;
    lifes.textContent = `lifes left: ${numberOflifes}`;
    console.log();
    event.stopPropagation();
  }
}

table.addEventListener('click', handleClick);
