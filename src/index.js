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
    let game = Ship();
    let carrier = game.ships[0];
    let battleship = game.ships[1];
    let destroyer = game.ships[2];
    let submarine = game.ships[3];
    let patrolBoat = game.ships[4];
    console.log(grid);


    for (let i = 0; i < 10; i++) {
        let row = [];

        for (let j = 0; j < 10; j++) {
            row.push(0);
        }

        grid.push(row);
    }   

    grid[0][0] = 1
    console.log(grid);
    console.log(game.ships)

    function placeShip(x,y,ship) {
        this.x = x;
        this.y = y;
        this.ship = ship
        x = x-1
        console.log(x)
        console.log(y)
        console.log(ship.length)
        if (ship.length + x <= 10) {
        for (let i = 0; i < ship.length; i++) { 
            grid[y][x + i] = "o"
        }
        } else {
            console.log('too big')
        }
        console.log(grid);
    
    
    
    }
    new placeShip(1,4,carrier)


}


Gameboard();

function sum(a, b) {
    return a + b;
}
module.exports = { sum, Gameboard, };


