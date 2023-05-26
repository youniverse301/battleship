function Ship() {
    let carrier = {
        type: "Carrier",
        length: 5,
        hits: 0,
        sunk: false
    };
    let battleship = {
        type: "Battleship",
        length: 4,
        hits: 0,
        sunk: false
    };
    let destroyer = {
        type: "Destroyer",
        length: 3,
        hits: 0,
        sunk: false
    };
    let submarine = {
        type: "Submarine",
        length: 3,
        hits: 0,
        sunk: false
    };
    let patrolBoat = {
        type: "Patrol Boat",
        length: 2,
        hits: 0,
        sunk: false
    };

    function hit(ship) {
        if (ship.sunk === true) {
        } else {
            ship.hits++;
        }
    }

    function isSunk(ship) {
        if (ship.hits === ship.length) {
            ship.sunk = true;
            console.log("sunk")
        } else {
            ship.sunk = false;
        }
    }

    return {
        ships: [carrier, battleship, destroyer, submarine, patrolBoat],
        hit: hit,
        isSunk: isSunk
      };
}

function Gameboard() {
    let grid = [];
    let game = Ship();
    let hit = game.hit
    let sunk = game.isSunk
    let ships = game.ships;
    let carrier = game.ships[0];
    let battleship = game.ships[1];
    let destroyer = game.ships[2];
    let submarine = game.ships[3];
    let patrolBoat = game.ships[4];
    let miss = 0;

    for (let i = 0; i < 10; i++) {
        let row = [];
        for (let j = 0; j < 10; j++) {
            row.push(0);
        }
        grid.push(row);
    }

    function checkOccupied(x, y, ship) {
        x = x - 1;
        y = y - 1;
      
        if (ship) {
          for (let i = 0; i < ship.length; i++) {
            if (x + i >= 10 || grid[y][x + i] !== 0) {
              return true; // Occupied position found
            }
          }
          return false; // All positions are unoccupied
        } else {
          if (grid[y][x] === 0) {
            return false; // Unoccupied position
          } else if (grid[y][x].value === "x") {
            if (grid[y][x].ship !== undefined) {
              return true; // Occupied position with a ship
            } else {
              return false; // Previously fired but unoccupied position
            }
          } else {
            return true; // Occupied position
          }
        }
      }
      
      

      function placeShip(x, y, ship, orientation) {
        this.x = x;
        this.y = y;
        this.ship = ship;
        occupied = checkOccupied(x, y);
        x = x - 1;
        y = y - 1;
      
        if (orientation === 'horizontal') {
          if (ship.length + x <= 10 && occupied === false) {
            for (let i = 0; i < ship.length; i++) {
              grid[y][x + i] = { value: "o", ship: ship };
            }
          } else {
            throw new Error('Ship is too big or the position is occupied.');
          }
        } else if (orientation === 'vertical') {
            console.log(occupied)
          if (ship.length + y <= 10 && occupied === false) {
            for (let i = 0; i < ship.length; i++) {
              if (grid[y + i][x] !== 0) {
                throw new Error('Ship is too big or the position is occupied.');
              }
            }
            for (let i = 0; i < ship.length; i++) {
              grid[y + i][x] = { value: "o", ship: ship };
            }
          } else {
            throw new Error('Ship is too big or the position is occupied.');
          }
        } else {
          throw new Error('Invalid orientation. Only "horizontal" or "vertical" are allowed.');
        }
      }
      
    //new placeShip(1,4,submarine) // placeShip examp

    function recieveAttack(x,y) {
        occupied = checkOccupied(x,y);
        x = x - 1;
        y = y - 1;
        let ship = grid[y][x].ship;
        if (occupied === true) {
                    grid[y][x].value = "x";
                    hit(ship);
                    sunk(ship)
                    console.log(ship)
                    console.log("Hit");
                    return true
        } else {
            if (grid[y][x].value === "x") {
                throw new Error("you have already fired here")
            }
                grid[y][x] = { value: "x" };
                miss++
                console.log("Miss at " + (++x) + "," + (++y));
                return false
            }
    }
    //new recieveAttack(1,4) // recieveAttack examp

    function checkGameOver(ships) {
        console.log('a')
        if (carrier.sunk === true && battleship.sunk === true && 
            destroyer.sunk === true && submarine.sunk === true &&
            patrolBoat.sunk === true) {
                console.log("Game Over");
                return true
            } else {
                return false
            }
    }
    
    return {
        placeShip,
        recieveAttack,
        checkOccupied,
        checkGameOver,
        carrier: carrier,
        battleship: battleship,
        destroyer: destroyer,
        submarine: submarine,
        patrolBoat: patrolBoat,
        grid: grid
      };
}
function Player() {
    const player1Gameboard = Gameboard();
    const player2Gameboard = Gameboard();

    function compShipRandom(ship) {
        let orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
        let unoccupied = 0
        if (orientation === 'vertical') {
            let x = Math.floor(Math.random() * 10) + 1;
            let y = Math.floor(Math.random() * (11 - ship.length)) + 1;
            for (let i = 0; i < ship.length; i++) {
                let result = player2Gameboard.checkOccupied(x, y+i);
                    if (result === false) { 
                        unoccupied++
                    }   
            }
            if (unoccupied === ship.length) {
                try {
                    player2Gameboard.placeShip(x, y, ship, orientation)
                } catch (error) {
                    compShipRandom(ship);
                  }
            } else if (unoccupied !== ship.length) { 
                compShipRandom(ship);
            }
        } else if (orientation === 'horizontal') {
            let x = Math.floor(Math.random() * (11 - ship.length)) + 1;
            let y = Math.floor(Math.random() * 10) + 1;
            for (let i = 0; i < ship.length; i++) {
                let result = player2Gameboard.checkOccupied(x+i, y);
                if (result === false) { 
                    unoccupied++
                }
            }
            if (unoccupied === ship.length) {
                try {
                    player2Gameboard.placeShip(x, y, ship, orientation)
                } catch (error) {
                    compShipRandom(ship);
                  }
            }  else if (unoccupied !== ship.length) { 
                compShipRandom(ship);
            }
        }
    }
    const ships = [player2Gameboard.carrier, player2Gameboard.battleship, player2Gameboard.destroyer, player2Gameboard.submarine, player2Gameboard.patrolBoat];
    compShipRandom(ships[0]); 
    compShipRandom(ships[1]); 
    compShipRandom(ships[2]); 
    compShipRandom(ships[3]); 
    compShipRandom(ships[4]); 

      
    function compAttack() {
      let x = Math.floor(Math.random() * 10) + 1;
      let y = Math.floor(Math.random() * 10) + 1;
      x = x - 1;
      y = y - 1;
      if (player1Gameboard.grid[y][x].value === "x") {
        return compAttack();
      } if (player1Gameboard.grid[y][x].value === "x" && player1Gameboard.grid[y][x].ship !== undefined) {
        return compAttack();
      }
      else {
        return [x = (++x), y = (++y)];
      }
    }
  

    return {
        player1Gameboard: player1Gameboard,
        player2Gameboard: player2Gameboard,
        compAttack
    };
}

module.exports = { Player,  };


