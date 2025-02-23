let cells = document.querySelectorAll('.cell');
let resetBtn = document.querySelector('#resetBtn');
let board = document.getElementById('board');
let bombsCounter = document.getElementById('bombsCounter');
let gameOn = false;
let bombsNum = 40;
let boomCounterValue = bombsNum;
let bombs = [];
let boardMaker = {};
let boardSize = 16;
let boardGrid = [];
//מעדכן לוח
function createBoard() {
    //reset
    boomCounterValue = bombsNum;
    bombs = [];
    resetBtn.setAttribute('src', "./images/smileyReset.png");
    bombsCounter.innerText = boomCounterValue;
    boardGrid = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));

    //יצירת לוח ל פי כמות משבצות    
    let x = 0;
    let y = 0;
    for (let index = 0; index < (boardSize * boardSize); index++) {
        if (x == boardSize) {
            x = 0;
            y++;
        }
        boardMaker[index] = [x, y];
        x++;
    }

    //איפוס הסידור של הלוח
    board.innerHTML = '';
    board.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    board.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    //בניית התאים עם ההגדרות
    for (let index = 0; index < (boardSize * boardSize); index++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-x', boardMaker[index][0]);
        cell.setAttribute('data-y', boardMaker[index][1]);
        cell.setAttribute('id', index);
        cell.setAttribute('status', 'null');

        //פונקציות תא
        cell.addEventListener('click', () => revealCell(cell));
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            toggleFlag(cell);
        });

        // הוספת התא ללוח
        board.appendChild(cell);
    }

    //מכניס מיקומי פצצות למערך
    while (bombs.length < bombsNum) {
        const bomb = Math.floor(Math.random() * (boardSize * boardSize));

        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    //מעדכן ערך לתא הרלוונטי
    for (let index = 0; index < bombs.length; index++) {
        const bomb = document.getElementById(bombs[index]);
        bomb.setAttribute('data-value', 'bomb');
    }

    updateNumbers();
}

//חשיפת תא
function revealCell(cell) {
    startTimer()
    if (cell.getAttribute('status') == 'null') {
        cell.setAttribute('status', 'clicked');
        if (cell.getAttribute('data-value') == 'bomb') {
            cell.innerHTML = `<img src="./images/Mine.webp" alt="bomb">`;
            cell.style.backgroundColor = 'rgb(145, 0, 0)';
            stopTimer();
            resetBtn.setAttribute('src', './images/smileyLose.png')
            gameOn = false;
            for (let index = 0; index < bombs.length; index++) {
                const bomb = document.getElementById(bombs[index]);
                bomb.innerHTML = `<img src="./images/Mine.webp" alt="bomb">`;
                bomb.setAttribute('status', 'clicked');
            }
        }
        else {
            const x = parseInt(cell.getAttribute('data-x'));
            const y = parseInt(cell.getAttribute('data-y'));
            cell.style.backgroundColor = '#bbb';

            if (boardGrid[y][x] > 0) {
                cell.innerHTML = boardGrid[y][x];  // הצגת המספר
            } else {
                cell.innerHTML = '';
                revealEmptyCells(y, x);
            }
        }
    }
    setTimeout(checkWin(), 500)
        ;
}
//סימון תא
function toggleFlag(cell) {
    if (cell.getAttribute('status') == 'clicked') {
        return
    }
    else if (cell.getAttribute('status') == 'null') {
        cell.innerHTML = '&#128681;';
        cell.setAttribute('status', 'flag');
        boomCounterValue--;
        bombsCounter.innerText = boomCounterValue;
    }
    else if (cell.getAttribute('status') == 'flag') {
        cell.innerHTML = '&#10067;';
        cell.setAttribute('status', '?');
        boomCounterValue++;
        bombsCounter.innerText = boomCounterValue;
    }
    else {
        cell.innerHTML = '';
        cell.setAttribute('status', 'null');
        bombsCounter.innerText = boomCounterValue;
    }
}

function revealEmptyCells(y, x) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    directions.forEach(([dy, dx]) => {
        let newY = y + dy;
        let newX = x + dx;

        if (newY >= 0 && newY < boardSize && newX >= 0 && newX < boardSize) {
            const neighborCell = document.querySelector(`[data-x="${newX}"][data-y="${newY}"]`);

            if (neighborCell && neighborCell.getAttribute('status') === 'null') {
                revealCell(neighborCell);
            }
        }
    }
    );
}

//בונה מספרים
function updateNumbers() {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    for (let index = 0; index < bombs.length; index++) {
        const bombId = bombs[index];
        const bombCell = document.getElementById(`${bombId}`);
        const x = parseInt(bombCell.getAttribute('data-x'));
        const y = parseInt(bombCell.getAttribute('data-y'));
        boardGrid[y][x] = 'bomb';

        directions.forEach(([dy, dx]) => {
            let newX = x + dx;
            let newY = y + dy;

            if (newY >= 0 && newY < boardSize && newX >= 0 && newX < boardSize) {
                if (boardGrid[newY][newX] !== 'bomb') {
                    boardGrid[newY][newX]++;
                }
            }
        });
        bombCell.setAttribute('data-value', 'bomb');
    }
};


//בודק נצחונות
function checkWin() {
    let clickedCells = document.querySelectorAll('.cell[status="clicked"]');

    if (clickedCells.length == (boardSize * boardSize - bombsNum)) {
        stopTimer();
        resetBtn.setAttribute('src', './images/smileyWon.png');
        alert(`You Won! Time: ${time} seconds`)
    }
}


//פונקציות של הטיימר
let time = 0;
let timer;
function startTimer() {
    if (!gameOn) {
        gameOn = true;
        timer = setInterval(() => {
            time++;
            document.getElementById('timer').innerHTML = time;
        }, 1000);
    }
}

function stopTimer() {
    clearInterval(timer);
    gameOn = false;
}

function resetTimer() {
    stopTimer();
    time = 0;
    document.getElementById('timer').innerHTML = time;

}

//יזימת יצירת לוח וריסטרט
createBoard()
resetBtn.addEventListener('click', () => {
    createBoard();
    resetTimer();
})




//level settings
const settingBtn = document.getElementById('settingBtn')
const settingControl = document.getElementById('settingControl')
const btnLevel = document.querySelectorAll('.levelBtn');

settingBtn.addEventListener('click', () => {
    settingControl.style.display = 'flex';
})

btnLevel.forEach(element => {
    element.addEventListener('click', () => {
        let level = element.getAttribute('id');
        levelSelector(level);
    })
});

//הגדרות רמות קושי
function levelSelector(level) {
    const header = document.querySelector('.header');
    if (level == 'easy') {
        bombsNum = 10;
        boardSize = 9;
        createBoard();
        header.style.maxWidth = `calc(50px*9)`
        cells = document.querySelectorAll('.cell');
        cells.forEach(element => {
            element.style.width = `calc(95vw/9)`;
            element.style.height = `calc(100vw/9)`;
        });
    }
    else if (level == 'medium') {
        bombsNum = 40;
        boardSize = 16;
        createBoard();
        header.style.maxWidth = `calc(50px*16)`
        cells = document.querySelectorAll('.cell');
        cells.forEach(element => {
            element.style.width = `calc(95vw/16)`;
            element.style.height = `calc(100vw/16)`;
        });
    }
    else if (level == 'hard') {
        bombsNum = 99;
        boardSize = 22;
        createBoard();
        header.style.maxWidth = `calc(50px*22)`
        cells = document.querySelectorAll('.cell');
        cells.forEach(element => {
            element.style.width = `calc(95vw/22)`;
            element.style.height = `calc(90vh/22)`;
        });
    }
    settingControl.style.display = 'none';
}
