const colors = require("ansi-colors");

const board = ["", "", "", "", "", "", "", "", ""];

const printBoard = (board) => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i < 2)
        process.stdout.write(colors.underline(board[i * 4 + j] || " "));
      else process.stdout.write(board[i * 4 + j] || " ");

      if (j < 2) process.stdout.write("|");
    }
    process.stdout.write("\n");
  }
};

printBoard(board);
