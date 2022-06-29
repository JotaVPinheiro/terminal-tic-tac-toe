const COMPlay = (playerMoves, comMoves) => {
  if (playerMoves.length + comMoves.length >= 9) return null;

  while (true) {
    const move = Math.floor(Math.random() * 9);
    if (!playerMoves.includes(move) && !comMoves.includes(move)) return move;
  }

  return null;
};

module.exports = COMPlay;