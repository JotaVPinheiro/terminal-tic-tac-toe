const colors = require("ansi-colors");
const CheckWin = require("./CheckWin");
const COMPlay = require("./COMPlay");

let board = ["", "", "", "", "", "", "", "", ""];
let playerMoves = [];
let comMoves = [];

let gameEnded = false;

const init = () => {
  console.log("");

  board = ["", "", "", "", "", "", "", "", ""];
  playerMoves = [];
  comMoves = [];
  gameEnded = false;

  askMove(board);
};

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

const askRestart = () =>
  process.stdout.write("\nComeçar outra partida? (s/n): ");

const endGame = (message) => {
  gameEnded = true;
  console.log("");
  printBoard(board, true);
  console.log(colors.bold(message));
  askRestart();
};

const goodbye = () => {
  console.log(colors.bold("\nObrigado por jogar!\n"));
  console.log("Deixe sua estrelinha no repositório do GitHub:");
  console.log("☆ https://github.com/JotaVPinheiro ☆");
};

process.stdin.on("data", (data) => {
  if (gameEnded) {
    const answer = data.toString("utf8").trim();

    if (answer == "n" || answer == "N") process.exit();
    if (answer == "s" || answer == "S") {
      init();
      return;
    }

    console.log(colors.bold("\nResposta inválida!"));
    askRestart();
    return;
  }

  const playerMove = Number(data) - 1;

  if (
    playerMove === NaN ||
    board[playerMove] !== "" ||
    playerMove < 0 ||
    playerMove > 8
  ) {
    console.log(colors.bold("\nMovimento inválido!\n"));
    askMove(board);
    return;
  }

  playerMoves.push(playerMove);
  board[playerMove] = "X";

  if (CheckWin(playerMoves)) {
    endGame("Você venceu!");
    return;
  }

  const comMove = COMPlay(playerMoves, comMoves);

  if (comMove !== null) {
    comMoves.push(comMove);
    board[comMove] = "O";
  }

  if (CheckWin(comMoves)) {
    endGame("Você perdeu!");
    return;
  }

  if (playerMoves.length + comMoves.length < board.length) {
    console.log("");
    askMove(board);
    return;
  }

  endGame("Empate!");
});

process.on("exit", goodbye);

askMove(board);
