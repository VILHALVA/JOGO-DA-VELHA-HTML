let currentPlayer = "X";
let gameActive = false;
let board = ["", "", "", "", "", "", "", "", ""];
let singlePlayerMode = true;
let modeChosen = false;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function startGame(singlePlayer) {
  modeChosen = true;
  singlePlayerMode = singlePlayer;
  gameActive = true;
  document.getElementById("board").style.display = "grid";
  document.getElementById("mode-selection").style.display = "none";
  document.getElementById("result").innerText = "";
}

function placeMark(cell) {
  if (!modeChosen) {
    alert("Escolha o modo de jogo antes de jogar!");
    return;
  }
  if (board[cell] === "" && gameActive) {
    board[cell] = currentPlayer;
    document.getElementsByClassName("cell")[cell].innerText = currentPlayer;
    if (checkWin(currentPlayer)) {
      endGame("Jogador " + currentPlayer + " venceu!");
    } else if (checkTie()) {
      endGame("Empate!");
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      if (singlePlayerMode && currentPlayer === "O") {
        setTimeout(makeAIMove, 500);
      }
    }
  }
}

function checkWin(player) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

function checkTie() {
  return board.every(cell => cell !== "");
}

function endGame(message) {
  document.getElementById("board").style.pointerEvents = "none";
  gameActive = false;
  document.getElementById("result").innerText = message;
}

function resetBoard() {
  currentPlayer = "X";
  gameActive = true;
  board = ["", "", "", "", "", "", "", "", ""];
  Array.from(document.getElementsByClassName("cell")).forEach(cell => {
    cell.innerText = "";
  });
  document.getElementById("board").style.pointerEvents = "auto";
  document.getElementById("mode-selection").style.display = "block";
  document.getElementById("result").innerText = "";
}

function makeAIMove() {
  const emptyCells = board.reduce((acc, cell, index) => {
    if (cell === "") {
      acc.push(index);
    }
    return acc;
  }, []);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const cell = emptyCells[randomIndex];
  placeMark(cell);
}

function makeAIMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
      if (cell === "") {
        acc.push(index);
      }
      return acc;
    }, []);
  
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
  
      if (
        (board[a] === "X" && board[b] === "X" && board[c] === "") ||
        (board[a] === "X" && board[b] === "" && board[c] === "X") ||
        (board[a] === "" && board[b] === "X" && board[c] === "X")
      ) {
        const blockingIndex = board[a] === "" ? a : board[b] === "" ? b : c;
        placeMark(blockingIndex);
        return;
      }
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const cell = emptyCells[randomIndex];
    placeMark(cell);
  }
  