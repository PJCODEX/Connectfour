var player1 = prompt("Player One: Enter Your Name, you will be Blue");
var player2 = prompt("Player Two: Enter Your Name, you will be Red");

var player1Color = 'rgb(86, 151, 255)';
var player2Color = 'rgb(237, 45, 73)';
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;
var game_on = true;

var table = $('table tr');
var hoverChips = $('.hover-chip');

function reportWin(rowNum, colNum, dir) {
  console.log("Win at:", rowNum, colNum);
}

function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}

function returnColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex) {
  for (let row = 5; row >= 0; row--) {
    if (returnColor(row, colIndex) === 'rgb(128, 128, 128)' || returnColor(row, colIndex) === 'gray') {
      return row;
    }
  }
}

function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== 'gray' && one !== undefined);
}

function gameEnd(winningPlayer) {
  $('h3').fadeOut();
  $('h2').fadeOut();
  $('h1').text(winningPlayer + " has won! Refresh or click restart to play again!").css("fontSize", "40px");
}

// Horizontal win
function horizontalWinCheck() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 4; col++) {
      let one = returnColor(row, col);
      let two = returnColor(row, col + 1);
      let three = returnColor(row, col + 2);
      let four = returnColor(row, col + 3);
      if (colorMatchCheck(one, two, three, four)) {
        for (let i = 0; i < 4; i++) {
          table.eq(row).find('td').eq(col + i).find('button').addClass('win-glow');
        }
        return true;
      }
    }
  }
  return false;
}

// Vertical win
function verticalWinCheck() {
  for (let col = 0; col < 7; col++) {
    for (let row = 0; row < 3; row++) {
      let one = returnColor(row, col);
      let two = returnColor(row + 1, col);
      let three = returnColor(row + 2, col);
      let four = returnColor(row + 3, col);
      if (colorMatchCheck(one, two, three, four)) {
        for (let i = 0; i < 4; i++) {
          table.eq(row + i).find('td').eq(col).find('button').addClass('win-glow');
        }
        return true;
      }
    }
  }
  return false;
}

// Diagonal win
function diagonalWinCheck() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
      // Right diagonal
      if (row + 3 < 6 && col + 3 < 7) {
        let one = returnColor(row, col);
        let two = returnColor(row + 1, col + 1);
        let three = returnColor(row + 2, col + 2);
        let four = returnColor(row + 3, col + 3);
        if (colorMatchCheck(one, two, three, four)) {
          for (let i = 0; i < 4; i++) {
            table.eq(row + i).find('td').eq(col + i).find('button').addClass('win-glow');
          }
          return true;
        }
      }

      // Left diagonal
      if (row - 3 >= 0 && col + 3 < 7) {
        let one = returnColor(row, col);
        let two = returnColor(row - 1, col + 1);
        let three = returnColor(row - 2, col + 2);
        let four = returnColor(row - 3, col + 3);
        if (colorMatchCheck(one, two, three, four)) {
          for (let i = 0; i < 4; i++) {
            table.eq(row - i).find('td').eq(col + i).find('button').addClass('win-glow');
          }
          return true;
        }
      }
    }
  }
  return false;
}

// Game logic on button click
$('.board button').on('click', function () {
  if (!game_on) return;

  let col = $(this).closest('td').index();
  let row = checkBottom(col);

  if (row === undefined) return;

  changeColor(row, col, currentColor);

  if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
    gameEnd(currentName);
    game_on = false;
    return;
  }

  currentPlayer *= -1;
  currentName = currentPlayer === 1 ? player1 : player2;
  currentColor = currentPlayer === 1 ? player1Color : player2Color;

  $('#playerTurn').text(`${currentName}'s Turn (${currentPlayer === 1 ? "Blue" : "Red"})`);
  updateHoverColor(currentColor);
});

// Reset button
$('#resetBtn').on('click', function () {
  location.reload();
});

// Hover indicator logic
function updateHoverColor(color) {
  hoverChips.css('border-color', color);
}

// Initial hover color
updateHoverColor(currentColor);
