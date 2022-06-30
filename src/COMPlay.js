const CheckWin = require("./CheckWin");

const allMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const corners = [0, 2, 6, 8];
const sides = [1, 3, 5, 7];
const center = 4;

const getPossibleMoves = (moves, moves_) => {
  const allMadeMoves = moves.concat(moves_);
  return allMoves.filter((x) => !allMadeMoves.includes(x));
};

const tryToWin = (movesToCheck, anotherMoves) => {
  const possibleMoves = getPossibleMoves(movesToCheck, anotherMoves);

  const winMoves = possibleMoves
    .map((x) => (CheckWin([...movesToCheck, x]) ? x : false))
    .filter((x) => x);

  return winMoves.length ? winMoves[0] : null;
};

const strategicMoves = {
  1: () => {
    return corners[Math.floor(Math.random() * 4)];
  },
  2: (playerMoves) => {
    if (playerMoves.includes(center))
      return corners[Math.floor(Math.random() * 4)];

    return center;
  },
  3: (playerMoves, comMoves) => {
    const lastPlayerMove = playerMoves[0];
    const lastComMove = comMoves[0];

    if (lastPlayerMove == 4) return Math.abs(lastComMove - 8);
  },
  4: (playerMoves, comMoves) => {
    const lastPlayerMove = playerMoves[1];
    const previousPlayerMove = playerMoves[0];

    if (
      corners.includes(previousPlayerMove) &&
      corners.includes(lastPlayerMove)
    )
      return getPossibleMoves(playerMoves, comMoves)[2];

    if (corners.includes(previousPlayerMove) && sides.includes(lastPlayerMove))
      return Math.abs(previousPlayerMove - 8);

    if (sides.includes(previousPlayerMove) && corners.includes(lastPlayerMove))
      return Math.abs(lastPlayerMove - 8);

    return getPossibleMoves(playerMoves, comMoves)[0];
  },
};

const COMPlay = (playerMoves, comMoves) => {
  const currentMove = playerMoves.length + comMoves.length + 1;

  if (currentMove > 9) return null;

  if (currentMove <= 2)
    return strategicMoves[currentMove](playerMoves, comMoves);

  const winMove =
    tryToWin(comMoves, playerMoves) || tryToWin(playerMoves, comMoves);
  if (winMove) return winMove;

  if (currentMove <= 4)
    return strategicMoves[currentMove](playerMoves, comMoves);

  return getPossibleMoves(playerMoves, comMoves)[0];
};

module.exports = COMPlay;
