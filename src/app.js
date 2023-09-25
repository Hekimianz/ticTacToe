// Gameboard
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return board;
})();

// Players
const Player = (mark) => {
  const playerMark = mark;
};

const player1 = Player("X");
const player2 = Player("O");

// Game Controller
const gameController = (() => {
  const cells = document.querySelectorAll(".gameboard--cell");
  const renderCells = () => {
    cells.forEach((cell, i) => {
      cell.innerHTML = gameBoard[i];
    });
  };
  return { renderCells };
})();

gameController.renderCells();
