const colors = require("ansi-colors");
const CheckWin = require("./CheckWin");

const board = ["", "", "", "", "", "", "", "", ""];
const playerMoves = [];
const comMoves = [];

const printBoard = (board, dontShowPositions) => {
  for (let i = 2; i >= 0; i--) {
    for (let j = i * 3; j < i * 3 + 3; j++) {
      if (i > 0) process.stdout.write(colors.underline(board[j] || " "));
      else process.stdout.write(board[j] || " ");

      if (j % 3 !== 2) process.stdout.write("|");
    }

    if (dontShowPositions) {
      console.log("");
      continue;
    }

    process.stdout.write("   ");

    for (let j = i * 3; j < i * 3 + 3; j++) {
      if (i > 0) process.stdout.write(colors.underline(j + 1 + ""));
      else process.stdout.write(j + 1 + "");

      if (j % 3 !== 2) process.stdout.write("|");
    }

    console.log("");
  }
};

const comPlay = (playerMoves, comMoves) => {
  while (true) {
    const move = Math.floor(Math.random() * 9);
    if (!playerMoves.includes(move) && !comMoves.includes(move)) return move;
  }

  return null;
};

const askMove = (board) => {
  printBoard(board);
  process.stdout.write("Escolha uma posição: ");
};

const endGame = (message) => {
  console.log("");
  printBoard(board, true);
  console.log(message);
};

process.stdin.on("data", (data) => {
  const move = Number(data) - 1;

  if (move === NaN || playerMoves.includes(move) || move < 0 || move > 8) {
    console.log(colors.bold("\nMovimento inválido!\n"));
    askMove(board);
    return;
  }

  playerMoves.push(move);
  board[move] = "X";

  if (CheckWin(playerMoves)) process.exit("Você venceu!");

  const comMove = comPlay(playerMoves, comMoves);
  comMoves.push(comMove);
  board[comMove] = "O";
  console.log(board);

  if (CheckWin(comMoves)) process.exit("Você perdeu!");

  if (playerMoves.length + comMoves.length < board.length) {
    console.log("");
    askMove(board);
    return;
  }

  process.exit("Empate!");
});

process.on("exit", endGame);

askMove(board);
