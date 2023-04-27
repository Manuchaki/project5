const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

function assignSpace(space, owner) {
  const image = document.createElement('img');
  image.src = owner === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  space.appendChild(image);

  const index = parseInt(space.dataset.index);
  takenBoxes[index] = owner;
  const indexToRemove = freeBoxes.indexOf(space);
  freeBoxes.splice(indexToRemove, 1);
  space.removeEventListener('click', changeToX);
}

function changeToX(event) {
  assignSpace(event.currentTarget, 'x');

  if (isGameOver()) {
    displayWinner();
  } else {
    computerChooseO();
  }
}

 


function computerChooseO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const index = Math.floor(Math.random() * freeBoxes.length);
  const freeSpace = freeBoxes[index];

  assignSpace(freeSpace, 'o');

  if (isGameOver()) {
    displayWinner();
  }
}

function isGameOver() {
  return freeBoxes.length === 0 || getWinner() !== null;
}

function displayWinner() {
  const winner = getWinner();

  const resultContainer = document.querySelector('#results');
  const header = document.createElement('h1');
  if (winner === 'x') {
    header.textContent = 'You win!';
  } else if (winner === 'o') {
    header.textContent = 'Computer wins';
  } else {
    header.textContent = 'Tie';
  }
  resultContainer.appendChild(header);

  // Remove remaining event listeners
  for (const box of freeBoxes) {
    box.removeEventListener('click', changeToX);
  }
}

function checkBoxes(one, two, three) {
  if (takenBoxes[one] !== undefined &&
      takenBoxes[one] === takenBoxes[two] &&
      takenBoxes[two] === takenBoxes[three]) {
    return takenBoxes[one];
  }
  return null;
}

// Returns 'x', 'o', or null for no winner yet.
function getWinner() {
  for (let col = 0; col < 3; col++) {
    const offset = col * 3;
    // Check rows and columns.
    let result = checkBoxes(offset, 1 + offset, 2 + offset) ||
        checkBoxes(4 + col , 5 + col, 6 + col) || checkBoxes(8 + col, 9 + col, 10 + col) || checkBoxes(12 + col, 13 + col, 14 + col) || checkBoxes(1 + col, 2 + col, 3 + col) || checkBoxes(5 + col, 6 + col, 7 + col) ||
         checkBoxes(9 + col, 10 + col, 11 + col) || checkBoxes(13 + col, 14 + col, 15 + col) || checkBoxes(0 + col, 4 + col, 8 + col) || checkBoxes(1 + col, 5 + col, 9 + col) || 
        checkBoxes(2 + col, 6 + col, 10 + col) || checkBoxes(3 + col, 7 + col, 11 + col) || checkBoxes(4 + col, 8 + col, 12 + col) || checkBoxes(5 + col, 9 + col, 13 + col) || 
        checkBoxes(6 + col, 10 + col, 114 + col);
    if (result) {
      return result;
    }
  }
  
  // Check diagonals
  return checkBoxes(0, 5, 10) || checkBoxes(1, 6, 11)  || checkBoxes(4, 9, 14)  || checkBoxes(5, 10, 15)  || checkBoxes(8, 5, 2)  || checkBoxes(9, 6, 3)  || checkBoxes(12, 9, 6)  || checkBoxes(13, 10, 7);
}

const freeBoxes = [];
// Map of box number -> 'x' or 'o'
const takenBoxes = {};
const boxes = document.querySelectorAll('#grid div');
for (const box of boxes) {
  box.addEventListener('click', changeToX);
  freeBoxes.push(box);
}