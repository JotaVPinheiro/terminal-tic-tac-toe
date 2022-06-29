const corners = [0, 2, 6, 8];
const center = 4;

const firstMove = () => {
  return corners[Math.floor(Math.random() * 4)];
};

const secondMove = (playerMoves) => {
  if (playerMoves.includes(center))
    return corners[Math.floor(Math.random() * 4)];

  return center;
};

const COMPlay = (playerMoves, comMoves) => {
  if (playerMoves.length + comMoves.length >= 9) return null;
  if (playerMoves.length + comMoves.length == 0) return firstMove();
  if (playerMoves.length + comMoves.length == 1) return secondMove(playerMoves);

  while (true) {
    const move = Math.floor(Math.random() * 9);
    if (!playerMoves.includes(move) && !comMoves.includes(move)) return move;
  }

  return null;
};

module.exports = COMPlay;
