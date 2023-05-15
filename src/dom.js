import { Player } from "./index";

let gameBoard1 = document.getElementById('board1');
let gameBoard2 = document.getElementById('board2');
const player = Player();

function compAtk() {
  let compCoords = player.compAttack();
  let atk = player.player1Gameboard.recieveAttack(compCoords[0], compCoords[1]);

  if (atk === true) {
    setTimeout(() => {
      compAtk();
    }, 1000);
  } else {
    setTimeout(() => {
      createTable(player1Grid, gameBoard1);
    }, 1000);
  }
}

const player1Grid = player.player1Gameboard.grid;
const player2Grid = player.player2Gameboard.grid;
let checkOccupiedP1 = player.player1Gameboard.checkOccupied;
let checkOccupiedP2 = player.player2Gameboard.checkOccupied;

function checkOccupiedd(board, x, y) {
  if (board === gameBoard1) {
    return checkOccupiedP1(x, y);
  } else {
    return checkOccupiedP2(x, y);
  }
}

console.log(player1Grid);
console.log(player2Grid);
console.log(checkOccupiedP1(1, 1));

function createTable(grid, board) {
  board.innerHTML = '';

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = j;
      cell.dataset.y = i;
      let x = j;
      let y = i;
      cell.innerText = grid[i][j] ? grid[i][j].value : '';
      board.appendChild(cell);
      x = (++x);
      y = (++y);
      if (grid[i][j].value === "x" && checkOccupiedd(board, x, y) === true) {
        cell.classList.add('shiphit');
      } else if (checkOccupiedd(board, x, y) === true) {
        cell.classList.add('ship');
      } else if (grid[i][j].value === "x") {
        cell.classList.add('hit');
      }
    }
  }
}

let comprecieveAttack = player.player2Gameboard.recieveAttack;

function clickAttack() {
  gameBoard2.addEventListener('click', function (event) {
    const cell = event.target;
    let x = cell.dataset.x;
    let y = cell.dataset.y;
    x = (++x);
    y = (++y);
    let atk = comprecieveAttack(x, y);
    if (atk === true) {
      console.log("ship");
      createTable(player2Grid, gameBoard2);
    } else {
      compAtk();
      setTimeout(() => {
        createTable(player1Grid, gameBoard1);
      }, 1000);
      createTable(player2Grid, gameBoard2);
    }
  });
}

createTable(player1Grid, gameBoard1);
createTable(player2Grid, gameBoard2);
clickAttack();
