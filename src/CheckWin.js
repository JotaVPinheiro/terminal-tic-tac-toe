const horizontalCheck = (moves) => {
  for (let i = 0; i < 3; i++) {
    let sequency = 0;

    for (let j = i * 3; j < i * 3 + 3; j++) {
      if (moves.includes(j)) sequency++;
    }

    if (sequency == 3) return true;
  }

  return false;
};

const verticalCheck = (moves) => {
  for (let i = 0; i < 3; i++) {
    let sequency = 0;

    for (let j = i; j <= i + 6; j += 3) {
      if (moves.includes(j)) sequency++;
    }

    if (sequency == 3) return true;
  }

  return false;
};

const diagonalCheck = (moves) => {
  for (let i = 0; i < 2; i++) {
    let sequency = 0;

    for (let j = i * 2; j <= 8 - i; j += 4 - i * 2) {
      if (moves.includes(j)) sequency++;
    }

    if (sequency == 3) return true;
  }

  return false;
};

const CheckWin = (moves) => {
  if (moves.length < 3) return false;

  return horizontalCheck(moves) || verticalCheck(moves) || diagonalCheck(moves);
};

module.exports = CheckWin;
