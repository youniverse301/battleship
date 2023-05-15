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

    function checkOccupied(x,y,ship) {
        x = x - 1;
        y = y - 1;
        if (ship) {
          for (let i = 0; i < ship.length; i++) { 
            if (grid[y][x + i] === 0) {
              return false
            }
          }
          return true;
        } else {
          if (grid[y][x] === 0) {
            return false
          } else if (grid[y][x].value === "x") {
                if(grid[y][x].ship !== undefined) {
                    return true
                } else return false
          } else {
            return true
          }
        }
      }
      

    function placeShip(x,y,ship) {
        this.x = x;
        this.y = y;
        this.ship = ship;
        occupied = checkOccupied(x,y,ship);
        x = x - 1;
        y = y - 1;

        if (ship.length + x <= 10 && occupied === false) {
            for (let i = 0; i < ship.length; i++) { 
                grid[y][x + i] = { value: "o", ship: ship }
            }
        } else {
            throw new Error('too big or occupied');
        }
    }
    //new placeShip(1,4,submarine) // placeShip examp

    function recieveAttack(x,y) {
        occupied = checkOccupied(x,y);
        x = x - 1;
        y = y - 1;
        if (occupied === true) {
                    grid[y][x].value = "x";
                    hit(grid[y][x].ship);
                    sunk(grid[y][x].ship)
                    console.log(grid[y][x].ship);
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

    function checkGameOver (ships) {
        if (carrier.sunk === true && battleship.sunk === true && 
            destroyer.sunk === true && submarine.sunk === true &&
            patrolBoat.sunk === true) {
                console.log("Game Over")
            }
    }
    return {
        placeShip,
        recieveAttack,
        checkOccupied,
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
    let test = player1Gameboard.placeShip(1, 4, player1Gameboard.carrier);
    let test2 = player2Gameboard.placeShip(5, 5, player2Gameboard.carrier);
    let test3 = player1Gameboard.placeShip(2, 7, player1Gameboard.battleship);
    let test4 = player2Gameboard.placeShip(3, 9, player2Gameboard.battleship);
    let tes5 = player1Gameboard.placeShip(3, 6, player1Gameboard.destroyer);
    let test6 = player2Gameboard.placeShip(2, 4, player2Gameboard.destroyer);
    let tes7 = player1Gameboard.placeShip(6, 10, player1Gameboard.submarine);
    let test8 = player2Gameboard.placeShip(8, 4, player2Gameboard.submarine);
    let tes9 = player1Gameboard.placeShip(7, 8, player1Gameboard.patrolBoat);
    let test10 = player2Gameboard.placeShip(2, 7, player2Gameboard.patrolBoat);
    //let fire1 = player2Gameboard.recieveAttack(8, 4);
    //let fire2 = player1Gameboard.recieveAttack(1, 1);
    //let fire3 = player1Gameboard.recieveAttack(1, 2);


  
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


