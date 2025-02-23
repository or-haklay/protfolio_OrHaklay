//main parts in the html
const mainScreen = document.querySelector('#container');
const body = document.querySelector('body');

//game screens
let gameScreen;
let howToScreen;



if (!localStorage.getItem('score')) {
    localStorage.setItem('score', [0, 0])
}
let score = localStorage.getItem('score');

let turn = 'x';

//screen game part

//manu function
const startBtn = document.querySelector('#startBtn');
const how2Btn = document.querySelector('#how2Btn');
const resetScoreBtn = document.querySelector('#resetScoreBtn');

const homeIcon = document.querySelector('#homeIcone');

startBtn.addEventListener('click', () => { })
how2Btn.addEventListener('click', () => { })

resetScoreBtn.addEventListener('click', () => { localStorage.score = [0, 0] })

homeIcon.addEventListener('click', () => { })

//-------------------------------------------//
const cell1 = document.querySelector("#cell1");
const cell2 = document.querySelector("#cell2");
const cell3 = document.querySelector("#cell3");
const cell4 = document.querySelector("#cell4");
const cell5 = document.querySelector("#cell5");
const cell6 = document.querySelector("#cell6");
const cell7 = document.querySelector("#cell7");
const cell8 = document.querySelector("#cell8");
const cell9 = document.querySelector("#cell9");

function game() {
    let endGame = false;
    while (endGame == false) {
        if (turn == "x") {
            cell1.addEventListener('click', () => { if (cell1['']) { cell1.innerHTML = "<img src='/images/X.png'" } })
            cell2.addEventListener('click', () => { if (cell2['']) { cell2.innerHTML = "<img src='/images/X.png'" } })
            cell3.addEventListener('click', () => { if (cell3['']) { cell3.innerHTML = "<img src='/images/X.png'" } })
            cell4.addEventListener('click', () => { if (cell4['']) { cell4.innerHTML = "<img src='/images/X.png'" } })
            cell5.addEventListener('click', () => { if (cell5['']) { cell5.innerHTML = "<img src='/images/X.png'" } })
            cell6.addEventListener('click', () => { if (cell6['']) { cell6.innerHTML = "<img src='/images/X.png'" } })
            cell7.addEventListener('click', () => { if (cell7['']) { cell7.innerHTML = "<img src='/images/X.png'" } })
            cell8.addEventListener('click', () => { if (cell8['']) { cell8.innerHTML = "<img src='/images/X.png'" } })
            cell9.addEventListener('click', () => { if (cell9['']) { cell9.innerHTML = "<img src='/images/X.png'" } })
        }

    }
}

function xturn(cell) {
    console.log("hellow from");

}
