const colors = require("ansi-colors");
const CheckWin = require("./CheckWin");

const board = ["", "", "", "", "", "", "", "", ""];
const moves = [];

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

  if (move === NaN || moves.includes(move) || move < 0 || move > 8) {
    console.log(colors.bold("\nMovimento inválido!\n"));
    askMove(board);
    return;
  }

  moves.push(move);
  board[move] = "X";

  if (CheckWin(moves)) process.exit("Você venceu!");

  if (moves.length < board.length) {
    console.log("");
    askMove(board);
    return;
  }

  process.exit("Empate!");
});

process.on("exit", endGame);

askMove(board);
