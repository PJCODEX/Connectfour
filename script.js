// 😄 Get player names and emojis
let player1 = prompt("Player One: Enter Your Name (Blue) and emoji e.g. 👦🔵");
let player2 = prompt("Player Two: Enter Your Name (Red) and emoji e.g. 👧🔴");

let player1Color = 'rgb(86, 151, 255)';
let player2Color = 'rgb(237, 45, 73)';
let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;
let game_on = true;

let table = $('table tr');
let hoverChips = $('.hover-chip');

// 👀 Dark mode toggle
$('#darkModeToggle').on('change', function () {
  $('body').toggleClass('dark-mode');
});

// 🟡 Update Hover Colors
function updateHoverColor(color) {
  hoverChips.css('border-color', color);
}
updateHoverColor(currentColor);

// 🎯 Reset
$('#resetBtn').on('click', () => location.reload());

function changeColor(rowIndex, colIndex, color) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}
function returnColor(rowIndex, colIndex) {
  return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}
function checkBottom(colIndex) {
  for (let row = 5; row >= 0; row--) {
    let color = returnColor(row, colIndex);
    if (color === 'rgb(128, 128, 128)' || color === 'gray') return row;
  }
}
function colorMatchCheck(one, two, three, four) {
  return (one === two && one === three && one === four && one !== 'gray' && one !== undefined);
}
function gameEnd(winningPlayer) {
  $('h3').fadeOut();
  $('h2').fadeOut();
  $('h1').html(`${winningPlayer} has won! 🏆<br><small>Refresh or Restart to play again!</small>`).css("fontSize", "40px");
}

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

function diagonalWinCheck() {
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 7; col++) {
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

// 💥 Game Loop
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

  $('#playerTurn').text(`${currentName}'s Turn ${currentPlayer === 1 ? "🔵" : "🔴"}`);
  updateHoverColor(currentColor);
});
