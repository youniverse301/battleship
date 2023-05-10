const { Gameboard, checkGameOver } = require('./index');


test('place ship in gameboard array', () => {
    let carrier = "carrier"
    expect(Gameboard(4, 2, carrier)).toBe(4,3,"carrier");
  });

  test('place ship in gameboard array', () => {
    let carrier = "carrier"
    expect(Gameboard(4, 2, carrier)).toBe(4,3,"carrier");
  });

  