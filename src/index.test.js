const { sum, Gameboard,  } = require('./index');



test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('place ship in gameboard array', () => {
    let carrier = "carrier"
    expect(Gameboard(4, 2, carrier)).toBe(4,3,"carrier");
  });