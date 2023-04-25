function Ship() {
    let carrier = {
        length: 5,
        hits: 0,
        sunk: false
    };
    let battleship = {
        length: 4,
        hits: 0,
        sunk: false
    };
    let destroyer = {
        length: 3,
        hits: 0,
        sunk: false
    };
    let submarine = {
        name: "submarine",
        length: 3,
        hits: 0,
        sunk: false
    };
    let patrolBoat = {
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
    let carrier = game.ships[0];
    let battleship = game.ships[1];
    let destroyer = game.ships[2];
    let submarine = game.ships[3];
    let patrolBoat = game.ships[4];

    for (let i = 0; i < 10; i++) {
        let row = [];

        for (let j = 0; j < 10; j++) {
            row.push(0);
        }

        grid.push(row);
    }

    function checkOccupied(x,y,ship) {
        if (ship) {
        for (let i = 0; i < ship.length; i++) { 
           if (grid[y][x + i] === 0) {
                return false
           } else {
            return true
           }
        }
        } else {
            if (grid[y][x] === 0) {
                return false
            } else {
                return true
            }
        }
    }

    function placeShip(x,y,ship) {
        this.x = x;
        this.y = y;
        this.ship = ship;
        x = x-1;
        occupied = checkOccupied(x,y,ship);

        if (ship.length + x <= 10 && occupied === false) {
            for (let i = 0; i < ship.length; i++) { 
                grid[y][x + i] = { value: "o", ship: ship }
            }
        } else {
            throw new Error('too big or occupied');
        }
        console.log(grid);
    }
    new placeShip(1,4,submarine)
    new placeShip(3,5,destroyer)

    function recieveAttack(x,y) {
        this.x = x;
        this.y = y;
        x = x-1;
        occupied = checkOccupied(x,y);
        if (occupied === true) {
            if (grid[y][x].value === "x") {
                    throw new Error("you have already fired here")
                } else {
                    grid[y][x].value = "x";
                    hit(grid[y][x].ship);
                    sunk(grid[y][x].ship)
                    console.log(grid[y][x].ship);
                }
        }   else {
                grid[y][x] = { value: "x" };
            }
    }
    new recieveAttack(1,4)
}


Gameboard();

function sum(a, b) {
    return a + b;
}
module.exports = { sum, Gameboard, };


