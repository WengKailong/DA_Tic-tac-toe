let fields = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let gameOver = false;
let currentShape = "circle";
let winner = "";

function fillShape(row, column) {
  if (fields[row][column] == "" && !gameOver) {
    fields[row][column] = currentShape;
    showShape(row, column);
    checkForWin(row, column);
    if (currentShape == "cross") {
      currentShape = "circle";
      document.getElementById("player-1").classList.remove("player-inactive");
      document.getElementById("player-2").classList.add("player-inactive");
    } else {
      currentShape = "cross";
      document.getElementById("player-1").classList.add("player-inactive");
      document.getElementById("player-2").classList.remove("player-inactive");
    }
  }

  if (gameOver) {
    gameIsOver();
  }
}

function showShape(row, column) {
  document
    .getElementById(`${currentShape}-${row}-${column}`)
    .classList.remove("display-none");

  document.getElementById(`cell-${row}-${column}`).classList.remove("td-hover");
}

function checkForWin(row, column) {
  if (fields[row][column] != "") {
    if (checkRow(row) || checkColumn(column) || checkDiagnal(row, column)) {
      if (currentShape == "circle") {
        winner = "player 1";
      } else {
        winner = "player 2";
      }
      gameOver = true;
    }

    if (isFieldsFull()) {
      gameOver = true;
    }
  }
}

function isFieldsFull() {
  for (var i = 0; i < fields.length; i++) {
    for (var j = 0; j < fields.length; j++) {
      if (fields[i][j] == "") {
        return false;
      }
    }
  }
  return true;
}

function checkRow(row) {
  for (var i = 0; i < 3; i++) {
    if (fields[row][i] != currentShape) {
      return false;
    }
  }
  console.log("row" + row);
  document.getElementById(`line-row-${row}`).classList.remove("display-none");
  document.getElementById(`line-row-${row}`).style.transform = "scaleX(0.0)";
  setTimeout(function () {
    document.getElementById(`line-row-${row}`).style.transform = "scaleX(1.0)";
  }, 225);
  return true;
}

function checkColumn(column) {
  for (var i = 0; i < 3; i++) {
    if (fields[i][column] != currentShape) {
      return false;
    }
  }
  console.log("column" + column);
  document
    .getElementById(`line-column-${column}`)
    .classList.remove("display-none");
  document.getElementById(`line-column-${column}`).style.transform =
    "scaleY(0.0)";
  setTimeout(function () {
    document.getElementById(`line-column-${column}`).style.transform =
      "scaleY(1.0)";
  }, 225);

  return true;
}

function checkDiagnal(row, column) {
  if (row == column) {
    for (var i = 0; i < 3; i++) {
      if (fields[i][i] != currentShape) {
        return false;
      }
    }

    document.getElementById(`line-diagnol-1`).classList.remove("display-none");
    document.getElementById(`line-diagnol-1`).style.transform =
      "rotate(-45deg) scaleY(0.0)";
    setTimeout(function () {
      document.getElementById(`line-diagnol-1`).style.transform =
        "rotate(-45deg) scaleY(1.0)";
    }, 225);
    return true;
  } else if (row + column == 2) {
    for (var i = 0; i < 3; i++) {
      if (fields[i][2 - i] != currentShape) {
        return false;
      }
    }

    document.getElementById(`line-diagnol-2`).classList.remove("display-none");
    document.getElementById(`line-diagnol-2`).style.transform =
      "rotate(45deg) scaleY(0.0)";

    setTimeout(function () {
      document.getElementById(`line-diagnol-2`).style.transform =
        "rotate(45deg) scaleY(1.0)";
    }, 225);
    return true;
  } else {
    return false;
  }
}

function gameIsOver() {
  gameOver = true;
  console.log("The game is over");
  if (winner != "") {
    console.log("The winner is " + winner);
  } else {
    console.log("The game is a tie");
  }
  document.getElementById("player-1").classList.add("player-inactive");
  document.getElementById("player-2").classList.add("player-inactive");
  deactivateAllCells();

  setTimeout(function () {
    document
      .getElementById("full-screen-game-over")
      .classList.remove("display-none");
  }, 1000);
}

function deactivateAllCells() {
  for (var i = 0; i < fields.length; i++) {
    for (var j = 0; j < fields.length; j++) {
      document.getElementById(`cell-${i}-${j}`).classList.remove("td-hover");
    }
  }
}

function restart() {
  document
    .getElementById("full-screen-game-over")
    .classList.add("display-none");
  resetParameters();
  resetLines();
  resetCells();
  resetPlayerInactive();
}

function resetParameters() {
  fields = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  gameOver = false;
  currentShape = "circle";
  winner = "";
}

function resetLines() {
  let elements = document.getElementsByClassName("line");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("display-none");
  }
}

function resetCells() {
  for (var i = 0; i < fields.length; i++) {
    for (var j = 0; j < fields.length; j++) {
      document.getElementById(`cell-${i}-${j}`).classList.add("td-hover");
    }
  }

  let elements = document.getElementsByClassName("shape");
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add("display-none");
  }
}

function resetPlayerInactive() {
  document.getElementById("player-1").classList.remove("player-inactive");
  document.getElementById("player-2").classList.add("player-inactive");
}
