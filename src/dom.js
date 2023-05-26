import { Player } from "./index";

let gameBoard1 = document.getElementById('board1');
let gameBoard2 = document.getElementById('board2');
let gameBoard3 = document.getElementById('gridContainer');
const player = Player();

let gameOverContainer = document.getElementById('gameOverContainer');
let playagainBtn = document.getElementById('playagainBtn');
    gameOverContainer.style.display = "none";

function checkOver() {
    let player1Over = player.player1Gameboard.checkGameOver();
    let player2Over = player.player2Gameboard.checkGameOver();

    if (player1Over === true || player2Over === true) {
        gameOverContainer.style.display = "";
        playagainBtn.addEventListener('click', function () {
            playAgain()
        })    
    } else {
        return false
    }
}

function playAgain() {  
    location.reload();
  }
  

function compAtk() {
  let compCoords = player.compAttack();
  let atk = player.player1Gameboard.recieveAttack(compCoords[0], compCoords[1]);

  if (atk === true) {
    setTimeout(() => { compAtk();}, 1000);
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
    } else if (board === gameBoard2) {
      return checkOccupiedP2(x, y);
    } else {
      return checkOccupiedP1(x,y)
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
    checkOver();
    const cell = event.target;
    let x = cell.dataset.x;
    let y = cell.dataset.y;
    x = (++x);
    y = (++y);
    let atk = comprecieveAttack(x, y);
    if (atk === true) {
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

const ships = [
    player.player1Gameboard.carrier,
    player.player1Gameboard.battleship,
    player.player1Gameboard.destroyer,
    player.player1Gameboard.submarine,
    player.player1Gameboard.patrolBoat
  ];
  let currentIndex = 0;
  const gridContainer = document.getElementById('gridContainer');
  const shipname = document.getElementById('shipname');
  const welcomeContainer = document.getElementById('welcomeContainer');
  shipname.innerText = "Carrier";
 // Define a variable to keep track of the current orientation
let orientation = "horizontal";

// Function to toggle the orientation between horizontal and vertical
function toggleOrientation() {
  orientation = orientation === "horizontal" ? "vertical" : "horizontal";
}

// Add a click event listener to the rotate button
const rotateButton = document.getElementById('rotateBtn');
rotateButton.addEventListener('click', function () {
  toggleOrientation();

  // Remove the previous hover effect styles
  const highlightedCells = gridContainer.querySelectorAll('.cell.hovered');
  highlightedCells.forEach((highlightedCell) => {
    highlightedCell.classList.remove('hovered');
  });

  // Reapply the hover effect with the updated orientation
  const cell = gridContainer.querySelector('.cell.hover');
  if (cell) {
    const currentShip = ships[currentIndex];
    const cellsToHighlight = [cell];

    // Determine the cells to highlight based on the updated orientation
    if (orientation === "horizontal") {
      for (let i = 1; i < currentShip.length; i++) {
        const nextCell = gridContainer.querySelector('[data-x="' + (+cell.dataset.x + i) + '"][data-y="' + cell.dataset.y + '"]');
        if (nextCell) {
          cellsToHighlight.push(nextCell);
        }
      }
    } else if (orientation === "vertical") {
      for (let i = 1; i < currentShip.length; i++) {
        const nextCell = gridContainer.querySelector('[data-x="' + cell.dataset.x + '"][data-y="' + (+cell.dataset.y + i) + '"]');
        if (nextCell) {
          cellsToHighlight.push(nextCell);
        }
      }
    }

    // Apply the updated hover effect to the cells
    cellsToHighlight.forEach((highlightedCell) => {
      highlightedCell.classList.add('hovered');
    });
  }
});

  

  
function player1Place() {
    gridContainer.addEventListener('mousemove', function (event) {
      const cell = event.target;
      const currentShip = ships[currentIndex];
      const cellsToHighlight = [cell]; // Array to store cells to highlight
  
      // Add the next 'currentShip.length - 1' cells to the right or below (based on orientation) to the array
      if (orientation === "horizontal") {
        for (let i = 1; i < currentShip.length; i++) {
            const nextCell = gridContainer.querySelector('[data-x="' + (+cell.dataset.x + i) + '"][data-y="' + cell.dataset.y + '"]');
            if (nextCell) {
            cellsToHighlight.push(nextCell);
          }
        }
      } else if (orientation === "vertical") {
        for (let i = 1; i < currentShip.length; i++) {
            const nextCell = gridContainer.querySelector('[data-x="' + cell.dataset.x + '"][data-y="' + (+cell.dataset.y + i) + '"]');
            if (nextCell) {
            cellsToHighlight.push(nextCell);
          }
        }
      }
  
      // Apply the hover effect to the cells in the array
      cellsToHighlight.forEach((highlightedCell) => {
        highlightedCell.classList.add('hovered');
      });
    });
  
    gridContainer.addEventListener('mouseout', function () {
      const highlightedCells = gridContainer.querySelectorAll('.cell.hovered');
  
      // Remove the hover effect from all the cells
      highlightedCells.forEach((highlightedCell) => {
        highlightedCell.classList.remove('hovered');
      });
    });
  
    gridContainer.addEventListener('click', function (event) {
      const cell = event.target;
      let x = cell.dataset.x;
      let y = cell.dataset.y;
      x = (++x);
      y = (++y);
      let currentShip = ships[currentIndex];
      let placementError = player.player1Gameboard.placeShip(x, y, currentShip, orientation);
      if (!placementError) {
        currentIndex++

        createTable(player1Grid, gameBoard1);
        createTable(player1Grid, gameBoard3);
        if (currentIndex === 5) {
            welcomeContainer.remove();
        }
        let currentShipText = ships[currentIndex].type;
        shipname.innerText = currentShipText;
      }
    });
  }
  
  player1Place()

  //welcomeContainer.remove();

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = j;
      cell.dataset.y = i;
      let x = j;
      let y = i;
      gridContainer.appendChild(cell);
    }
}



createTable(player1Grid, gameBoard1);
createTable(player2Grid, gameBoard2);

clickAttack();
