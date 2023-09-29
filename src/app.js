// Gameboard module
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  return board;
})();

// Players factory
const Player = (mark) => {
  const playerMark = mark;
  let winner = false;
  return { playerMark, winner };
};

// Game Controller module
const gameController = (() => {
  // Start game
  const board = document.querySelector(".gameboard--wrapper");
  const chooseMarkerBtns = document.querySelectorAll(".chooseMarker");
  const markerWrapper = document.querySelector(".chooseMarker--wrapper");
  let chosenMarker;
  let player1;
  let player2;
  let currentPlayer;
  chooseMarkerBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      board.style.display = "grid";
      markerWrapper.style.display = "none";
      if (btn.dataset.marker === "X") {
        player1 = Player("X");
        player2 = Player("O");
        currentPlayer = player1;
        chosenMarker = "X";
      } else {
        player1 = Player("O");
        player2 = Player("X");
        currentPlayer = player1;
        chosenMarker = "O";
      }
    });
  });
  const cells = document.querySelectorAll(".gameboard--cell");
  const renderCells = () => {
    cells.forEach((cell, i) => {
      cell.innerHTML = gameBoard[i];
    });
  };

  // Check for win func
  const checkWin = (board) => {
    const winnerDisp = document.querySelector(".win--wrapper");
    if (board.every((v) => v === board[0] && v !== "")) {
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

  // Check for draw
  const checkDraw = () => {
    const winnerDisp = document.querySelector(".win--wrapper");
    if (gameBoard.every((v) => v !== "")) {
      winnerDisp.style.display = "flex";
      winnerDisp.querySelector(".win--title").innerHTML = "Draw!";
    }
  };

  // Check wins
  const checkAllWins = () => {
    if (gameBoard.every((v) => v !== "")) {
      checkDraw();
    }
    checkWin(gameBoard.slice(0, 3));
    checkWin(gameBoard.slice(3, 6));
    checkWin(gameBoard.slice(6, 9));
    const col1 = gameBoard.filter((el, i) => i === 0 || i === 3 || i === 6);
    const col2 = gameBoard.filter((el, i) => i === 1 || i === 4 || i === 7);
    const col3 = gameBoard.filter((el, i) => i === 2 || i === 5 || i === 8);
    checkWin(col1);
    checkWin(col2);
    checkWin(col3);
    const diag1 = gameBoard.filter((el, i) => i === 0 || i === 4 || i === 8);
    const diag2 = gameBoard.filter((el, i) => i === 6 || i === 4 || i === 2);
    checkWin(diag1);
  };

  // CPU Turn
  const cpuTurn = () => {
    let finalEl;
    let empties = [];
    gameBoard.forEach((el, i) => {
      if (el === "") {
        empties.push(i);
      }
      const length = empties.length;
      let random = Math.floor(Math.random() * length);
      finalEl = empties[random];
    });
    gameBoard[finalEl] = player2.playerMark;
    renderCells();
    checkAllWins();
  };

  // Place markers and switch turns
  cells.forEach((cell, i) => {
    cell.addEventListener("click", () => {
      if (cell.innerHTML !== "") return;
      gameBoard[i] = player1.playerMark;
      renderCells();
      checkAllWins();

      // CPU Turn
      board.style.pointerEvents = "none";
      setTimeout(cpuTurn, 500);
      setTimeout(() => (board.style.pointerEvents = "auto"), 500);
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
