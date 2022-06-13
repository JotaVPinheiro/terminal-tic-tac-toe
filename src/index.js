const colors = require("ansi-colors");

const board = ["", "", "", "", "", "", "", "", ""];
const moves = [];

const printBoard = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = i * 3; j < i * 3 + 3; j++) {
      if (i < 2) process.stdout.write(colors.underline(board[j] || " "));
      else process.stdout.write(board[j] || " ");

      if (j % 3 !== 2) process.stdout.write("|");
    }
    process.stdout.write("\n");
  }
};

const askMove = () => process.stdout.write("Escolha uma posição: ");

const endGame = () => {
  console.log("");
  printBoard(board);
  console.log("Fim de jogo!");
};

process.stdin.on("data", (data) => {
  const move = Number(data);

  if (move === NaN || move < 0 || move > 8) {
    console.log(colors.bold("\nMovimento inválido!\n"));
    printBoard(board);
    askMove();
    return;
  }

  moves.push(move);
  board[move] = "X";

  if (moves.length < board.length) {
    console.log("");
    printBoard(board);
    askMove();
    return;
  }

  process.exit();
});

process.on("exit", endGame);

printBoard(board);
askMove();
