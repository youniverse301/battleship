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
        if (ship.hits === ship.length) {
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

    for (let i = 0; i < 10; i++) {
        let row = [];

        for (let j = 0; j < 10; j++) {
            row.push(0);
        }

        grid.push(row);
    }   

    console.log(grid);

}

let game = Ship();
let carrier = game.ships[0];
let battleship = game.ships[1];
let destroyer = game.ships[2];
let submarine = game.ships[3];
let patrolBoat = game.ships[4];

game.hit(patrolBoat);
game.isSunk(patrolBoat);

console.log(patrolBoat);

game.hit(patrolBoat);
game.isSunk(patrolBoat);

console.log(patrolBoat);

Gameboard();



