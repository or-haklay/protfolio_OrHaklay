let board = Array(9).fill(null);

// הצהרת משתנים
let currentPlayer = "X";
let round = 0;
let isGameActive = true;
let xWins = 0;
let oWins = 0;

// הצהרה משתני html
const cells = document.querySelectorAll(".cell");
const statusElement = document.getElementById("status");
const resetButton = document.getElementById("reset");
const xWinsElement = document.getElementById("xWinsElement");
const oWinsElement = document.getElementById("oWinsElement");
const roundElement = document.getElementById("roundElement")


// אירוע קליק על ריבוע
function handleCellClick(event) {
  if (isGameActive == true && event.target.getAttribute('cell-status') == 'null') {
    round++;
    const index = event.target.getAttribute("id");

    /* event.target.textContent = currentPlayer; */
    event.target.innerHTML = `<img src="/XO/images/${currentPlayer}.png" alt="${currentPlayer}" class="playerImg"></img>`
    event.target['cell-status'] = currentPlayer;
    board[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.innerText = `Player ${currentPlayer}'s turn`
    check();
  }
}
cells.forEach((cell) => cell.addEventListener("click", handleCellClick));

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];


function check() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    const first = board[a];
    const second = board[b];
    const therd = board[c];

    if (board[a] == "O" || board[a] == "X") {
      if (board[a] == board[b] && board[b] == board[c]) {
        statusElement.innerText = `The Winner is ${first} `;
        document.getElementById(a).style.backgroundColor = '#4caf50'
        document.getElementById(b).style.backgroundColor = '#4caf50'
        document.getElementById(c).style.backgroundColor = '#4caf50'
        first == "X" ? xWins++ : oWins++;
        updateWinninng();
        return isGameActive = false;
      }
    }
  }
}

function updateWinninng() {
  xWinsElement.innerHTML = `X Wins: ${xWins}`;
  oWinsElement.innerHTML = `O Wins: ${oWins}`;
}

resetButton.addEventListener('click', () => {
  currentPlayer = "X";
  isGameActive = true;
  board = Array(9).fill(null);
  statusElement.innerText = `Player ${currentPlayer} 's turn`
  cells.forEach((cell) => cell.textContent = '');
  cells.forEach((cell) => cell.style.backgroundColor = '#fff');

})



