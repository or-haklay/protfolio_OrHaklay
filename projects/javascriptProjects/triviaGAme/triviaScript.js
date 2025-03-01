import { quizBank } from "./bank.js";

//מיקומים בדף
const btns = document.querySelectorAll(".btn");
const answerBtns = document.querySelectorAll(".answerBtn");
const backHomeBtn = document.querySelector("#backHomeBtn");
const timerElement = document.querySelector("#timer");
const mainSub = document.querySelector("#mainSub");
const secondly = document.querySelector("#secondly");
const homeScreen = document.querySelector("#homeScreen");
const gameScreen = document.querySelector("#gameScreen");
const resultScreen = document.querySelector("#resultScreen");
const scoreDisplay = document.querySelector("#scoreDisplay");
const restartBtn = document.querySelector("#restartBtn");
const infScreen = document.querySelector("#infScreen");
const infoBtn = document.querySelector("#infoBtn");
const infoCloseBtn = document.querySelector("#infoCloseBtn");
const backHomeBtnInGame = document.querySelector("#backHomeBtnInGame");

//משתנים
let selectedSub = "";
let timer;
let timeLeft = 60;
let currentQuestionIndex = 0;
let score = 0;
let quiz;

//בחירת נושא
function selectSub(element) {
  selectedSub = element.getAttribute("data-subject");
  console.log(`Selected Subject: ${selectedSub}`);
  quiz = quizBySub(selectedSub);
  currentQuestionIndex = 0;
  startGame();
}

function playAgain() {
  console.log(`Selected Subject: ${selectedSub}`);
  quiz = quizBySub(selectedSub);
  currentQuestionIndex = 0;
  startGame();
}

btns.forEach((element) => {
  element.addEventListener("click", () => {
    selectSub(element);
  });
});

//מגריל שאלות לפי נושא
function quizBySub(Subject) {
  let randNum;
  let randomQuestions = [];
  while (randomQuestions.length < 10) {
    randNum = Math.floor(Math.random() * 30);
    if (!randomQuestions.includes(randNum)) {
      randomQuestions.push(randNum);
    }
  }

  if (Subject == "geography") {
    for (let index = 0; index < randomQuestions.length; index++) {
      randomQuestions[index] = quizBank.geography[randomQuestions[index]];
    }
  } else if (Subject == "moviesTV") {
    for (let index = 0; index < randomQuestions.length; index++) {
      randomQuestions[index] = quizBank.moviesTV[randomQuestions[index]];
    }
  } else if (Subject == "general") {
    for (let index = 0; index < randomQuestions.length; index++) {
      randomQuestions[index] = quizBank.general[randomQuestions[index]];
    }
  } else if (Subject == "sports") {
    for (let index = 0; index < randomQuestions.length; index++) {
      randomQuestions[index] = quizBank.sports[randomQuestions[index]];
    }
  } else {
    console.error("Subject Not Found");
  }
  console.log(randomQuestions);
  return randomQuestions;
}

//מתחיל משחק
function startGame() {
  homeScreen.style.display = "none";
  infScreen.style.display = "none";
  resultScreen.style.display = "none";
  gameScreen.style.display = "flex";
  currentQuestionIndex = 0;
  score = 0;
  showQuestion();
}

//חזרה לדף בית
function backHome() {
  gameScreen.style.display = "none";
  infScreen.style.display = "none";
  resultScreen.style.display = "none";
  homeScreen.style.display = "flex";
}

//כפתורים
infoCloseBtn.addEventListener("click", () => {
  backHome();
});

infoBtn.addEventListener("click", () => {
  openInfo();
});

backHomeBtn.addEventListener("click", () => {
  backHome();
});

backHomeBtnInGame.addEventListener("click", () => {
  backHome();
});

restartBtn.addEventListener("click", () => {
  playAgain();
});

//פתיחת הוראות
function openInfo() {
  homeScreen.style.display = "none";
  gameScreen.style.display = "none";
  resultScreen.style.display = "none";
  infScreen.style.display = "flex";
}

// סיום המשחק
function endGame() {
  stopTimer();
  gameScreen.style.display = "none";
  homeScreen.style.display = "none";
  infScreen.style.display = "none";
  resultScreen.style.display = "flex";
  scoreDisplay.innerHTML = `Your Score: ${score}/10`;
}

//בדיקת תשובה
function checkAnswer(button, correctAnser) {
  if (button.textContent == correctAnser) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
  }

  setTimeout(() => {
    if (currentQuestionIndex < quiz.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      endGame();
    }
  }, 1000);
}

//הצגת שאלה
function showQuestion() {
  console.log(currentQuestionIndex);

  if (currentQuestionIndex >= quiz.length) {
    endGame();
    return;
  }

  const questionObj = quiz[currentQuestionIndex];
  mainSub.innerHTML = questionObj.quistion;
  secondly.innerHTML = "Select Your Answer:";

  let answers = [
    questionObj.correct,
    questionObj.worng1,
    questionObj.worng2,
    questionObj.worng3,
  ];
  answers.sort(() => Math.random() - 0.5);

  answerBtns.forEach((button, index) => {
    button.innerHTML = answers[index];
    button.classList.remove("correct", "wrong");
    button.onclick = () => checkAnswer(button, questionObj.correct);
  });

  startTimer();
}

//פונקציות של הטיימר
function startTimer() {
  timeLeft = 60;

  clearInterval(timer);
  timerElement.textContent = `${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;

    timerElement.textContent = `${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      currentQuestionIndex++;
      showQuestion();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}
