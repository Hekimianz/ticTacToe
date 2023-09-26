// Gameboard
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return board;
})();

// Players
const Player = (mark) => {
  const playerMark = mark;
  let winner = false;
  return { playerMark, winner };
};

const player1 = Player("X");
const player2 = Player("O");

// Game Controller
const gameController = (() => {
  const cells = document.querySelectorAll(".gameboard--cell");
  let currentPlayer = player1;
  const renderCells = () => {
    cells.forEach((cell, i) => {
      cell.innerHTML = gameBoard[i];
    });
  };
  // Check for win func
  const checkWin = (board) => {
    const winnerDisp = document.querySelector(".win--wrapper");
    if (board.every((v) => v === board[0] && v !== "")) {
      console.log("Win!");
      cells.forEach((cell) => (cell.style.pointerEvents = "none"));
      winnerDisp.style.display = "flex";
      const winnerMark = board[0];
      if (winnerMark === "X") player1.winner = true;
      if (winnerMark === "O") player2.winner = true;
      winnerDisp.querySelector(".win--title").innerHTML = `${
        winnerMark === "X" ? "X Wins!" : "O Wins!"
      }`;
    }
  };
  // Place markers and switch turns
  cells.forEach((cell, i) => {
    cell.addEventListener("click", () => {
      // if (cell.innerHTML !== "") return;
      gameBoard[i] = currentPlayer.playerMark;
      renderCells();
      currentPlayer == player1
        ? (currentPlayer = player2)
        : (currentPlayer = player1);
      // Check for horizontal wins
      checkWin(gameBoard.slice(0, 3));
      checkWin(gameBoard.slice(3, 6));
      checkWin(gameBoard.slice(6, 9));
      // Check for vertical wins
      const col1 = gameBoard.filter((el, i) => i === 0 || i === 3 || i === 6);
      const col2 = gameBoard.filter((el, i) => i === 1 || i === 4 || i === 7);
      const col3 = gameBoard.filter((el, i) => i === 2 || i === 5 || i === 8);
      checkWin(col1);
      checkWin(col2);
      checkWin(col3);
      // Check for diagonal win
      const diag1 = gameBoard.filter((el, i) => i === 0 || i === 4 || i === 8);
      const diag2 = gameBoard.filter((el, i) => i === 6 || i === 4 || i === 2);
      checkWin(diag1);
      checkWin(diag2);
    });
    // Restart game
    const restartGame = () => {
      gameBoard.forEach((cell, i) => {
        gameBoard[i] = "";
      });
      gameController.renderCells();
      player1.winner = false;
      player2.winner = false;
      document.querySelector(".win--wrapper").style.display = "none";
      cells.forEach((cell) => (cell.style.pointerEvents = "auto"));
      currentPlayer = player1;
    };
    const restartBtn = document.querySelector(".win--restart");
    restartBtn.addEventListener("click", restartGame);
  });

  return { renderCells };
})();

gameController.renderCells();
