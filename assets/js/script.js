// Global variables
// Button variables
const startButton = document.getElementById("start");
const ansButton1 = document.getElementById("button_1");
const ansButton2 = document.getElementById("button_2");
const ansButton3 = document.getElementById("button_3");
const ansButton4 = document.getElementById("button_4");
const submitButton = document.getElementById("submit");
const backButton = document.getElementById("back");
const clearScoresButton = document.getElementById("clear_scores");
const HSButton = document.getElementById("view_scores");

// Section variables to hide/unhide
const header = document.getElementById("head");
const timer = document.getElementById("timer");
const welcome = document.getElementById("welcome_card");
const qCard = document.getElementById("question_card");
const questionText = document.getElementById("question_text");
const choices = document.getElementById("choice_wrapper");
const initialsEntry = document.getElementById("initials_entry");
const scoreText = document.getElementById("score_text");
const inputForm = document.getElementById("input_form");
const initials = document.getElementById("initials");
const qResult = document.getElementById("question_result");
const highScores = document.getElementById("high_scores");
const scoreList = document.getElementById("topScoreList");

const grave = new Audio("./assets/audio/grave.wav");
const sparkle = new Audio("./assets/audio/sparkle.mp3");
const buzz = new Audio("./assets/audio/buzz.mp3");
const trumpets = new Audio("./assets/audio/trumpets.mp3");
const pIR = new Audio("./assets/audio/PIR_sad.mp3");

// Quiz questions
let quizQuestions = 
  [
    {
      question: "Which of these signifies an id in HTML?",
      answers: ["#", ".", "_", "*"],
      solution: "#"
    },

    {
      question: "Which characters will does this regex: [a-z] refer to?",
      answers: ["a, -, z", "lower case letters", "any letters", "a, z"],
      solution: "lower case letters"
    },

    {
      question: "Which of these, when added to justify-content, will put the same spacing between items?",
      answers: ["space-evenly", "space-around", "space-between", "center"],
      solution: "space-evenly"
    },

    {
      question: "A ________ HTML element is one which describes its function as part of the page.",
      answers: ["specific", "semantic", "javascript", "div"],
      solution: "semantic"
    },

    {
      question: "Why should you comment your code?",
      answers: ["For your own sake", "For your team's sake", "For clarity's sake", "All of these"],
      solution: "All of these"
    },

    {
      question: "Which type of files should NOT be in the assets folder?",
      answers: ["HTML", "CSS", "JavaScript", "Screenshots"],
      solution: "HTML"
    }
  ];

// Instance variables
const timerWord = "Time: "
let timeRemaining = 0;
let timeVar;
let currQuestion = "";
let questSolution = "";
let choiceArr;
let questArr;

// Functions
// Welcome screen initialization
function init() {
  timeRemaining = 75;
  currQuestion = "";
  questSolution = "";
  choiceArr = [];
  questArr = structuredClone(quizQuestions);
  timer.innerHTML = timerWord + timeRemaining;
  initialsEntry.setAttribute("style", "display: none");
  qCard.setAttribute("style", "display: none");
  header.setAttribute("style", "display: flex");
  welcome.setAttribute("style", "display: block");
  qResult.setAttribute("style", "display: none");
  highScores.setAttribute("style", "display: none");
  while (scoreList.hasChildNodes()) {
    scoreList.removeChild(scoreList.firstChild);
  }
  scoreText.innerHTML = "Your final score is ";
  inputForm.reset();

}

// Clock timer decrementer
function tickDown() {
  timeRemaining--;
  if (timeRemaining <= 0) {
    timeRemaining = 0;
    pIR.play();
    finishGame();
  }
  timer.innerHTML = timerWord + timeRemaining;
}

function finishGame() {
  clearInterval(timeVar);
  scoreText.innerHTML += timeRemaining;
  qCard.setAttribute("style", "display: none");
  initialsEntry.setAttribute("style", "display: block");
}

// Generates a new question to the screen
function generateNewQuestion(button) {  

  // If a question has been answered, print result to bottom of page
  if (questSolution !== "") {
    if (button.textContent.substring(3) == questSolution) {
      qResult.innerHTML = "Correct!";
      sparkle.play();
    }
    else {
      qResult.innerHTML = "Wrong =(";
      timeRemaining -= 10;
      if (timeRemaining < 0) {
        timeRemaining = 0;
      }
      buzz.play();
    }
  }

  // Once no more questions are available, display final results
  if (questArr.length == 0) {
    trumpets.play();
    finishGame();
    return;
  }

  // Change focus from button previously pressed to body
  if (document.activeElement.className == "choices") {
    document.activeElement.blur();
  }

  // Select random question from Questions array
    // Use that to populate #question_text and .choices buttons
    // Set global solution variable to the solution from selected question object
  const questIdx = Math.floor(Math.random() * questArr.length);

  // Creates a clone of the question so that the question can be safely removed from
  // play without effecting future playthroughs.
  const questionClone = structuredClone(questArr[questIdx]);
  currQuestion = questionClone;
  questSolution = currQuestion.solution;
  choiceArr = currQuestion.answers;

  // Fills the choice buttons with text (in a random order)
  for (let i = 1; i <= 4; i++) {
    // Grab a random element and assign it to the button i
    // Then splice out that choice from the options
    let currChoiceIdx = Math.floor(Math.random() * choiceArr.length);
    let buttonText = choiceArr[currChoiceIdx];
    switch (i) {
      case 1:
        ansButton1.textContent = "1) " + buttonText;
        break;
      case 2:
        ansButton2.textContent = "2) " + buttonText;
        break;
      case 3:
        ansButton3.textContent = "3) " + buttonText;
        break;
      case 4:
        ansButton4.textContent = "4) " + buttonText;
      break;
    }
    choiceArr.splice(currChoiceIdx, 1);
  }

  // Sets question text
  questionText.innerHTML = currQuestion.question;
  // Removes selected question from possibilities
  questArr.splice(questIdx, 1);
}

// Populates the new screen for questions
function changeDisplay(e) {
  let currButton = e.target;

  // If start button was clicked, hides welcome screen and displays question box
  if (currButton === startButton) {
    welcome.setAttribute("style", "display: none");
    qCard.setAttribute("style", "display: block");
    generateNewQuestion();
  }

  // If a question was answered, generates the next one
  else if (currButton === ansButton1 || currButton === ansButton2 ||
           currButton === ansButton3 || currButton === ansButton4) {
            generateNewQuestion(currButton);
  }
}

// Generates and displays the high score screen with scores from local storage
function displayHighScores(scoresArr) {
  let highScore = 0;
  let highIdx = -1;
  let newArr = [];
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < scoresArr.length; j++) {
      if (scoresArr.length == 0) {
        break;
      }
      if (scoresArr[j].score > highScore) {
        highScore = scoresArr[j].score;
        highIdx = j;
      }
    }
    if (highIdx >= 0) {
      newArr.push(scoresArr[highIdx]);
      scoresArr.splice(highIdx, 1);
    }
    highScore = 0;
    highIdx = -1;
  }
  for (let idx = 0; idx < newArr.length; idx++) {
    let listItem = document.createElement("li");
    let newInit = newArr[idx].initials;
    let newScore = newArr[idx].score;
    listItem.innerHTML = `${idx+1}) ${newInit} --- ${newScore}`
    scoreList.appendChild(listItem);
  }
  highScores.setAttribute("style", "display: block");
}

// Event listeners
HSButton.addEventListener("click", function(e) {
  var localScores = JSON.parse(localStorage.getItem("localScores"));
  if (localScores != null) {
    displayHighScores(localScores);
  }
  e.preventDefault();
  clearInterval(timeVar);

  // Set hidden
  welcome.setAttribute("style", "display: none");
  header.setAttribute("style", "display: none");
  initialsEntry.setAttribute("style", "display: none");
  qResult.setAttribute("style", "display: none");
  qCard.setAttribute("style", "display: none");
  highScores.setAttribute("style", "display: block");
});

startButton.addEventListener("click", function(event) {
  grave.play();
  timeVar = setInterval(tickDown, 1000);
  qCard.setAttribute("style", "display: flex");
  qResult.setAttribute("style", "display: none");
  changeDisplay(event)
});

choices.addEventListener("click", function(event) {
  qResult.setAttribute("style", "display: block");
  let clickedOn = event.target.nodeName;
  if (clickedOn !== 'BUTTON') {
    return;
  }
  // event.stopPropagation();
  // console.log(event.target);
  changeDisplay(event)
});

// TODO: fix this function
choices.addEventListener("mouseenter", function(e) {
  e.stopPropagation();
  let mouseOver = e.target.nodeName;
  if (mouseOver !== 'BUTTON') {
    return;
  }
  qResult.setAttribute("style", "display: none")
});

submitButton.addEventListener("click", function(e) {
  e.preventDefault();

  // Initials entry data validation
  if (!initials.value.trim().match(/(^[A-Z]{2,3}$)/i)) {
    alert("Initials must be letters only and either 2 or 3 characters, please!");
    return;
  }
  // Storing of intials and score in score object, then into local storage
  var score = {
    initials: initials.value.trim(),
    score: timeRemaining
  };
  var localScores = JSON.parse(localStorage.getItem("localScores"));
  if (localScores != null) {
    localScores.push(score);
  }
  else {
    localScores = [score];
  }
  localStorage.setItem("localScores", JSON.stringify(localScores));

  // Hide all elements other than high scores
  initialsEntry.setAttribute("style", "display: none");
  header.setAttribute("style", "display: none");
  qResult.setAttribute("style", "display: none");

  // Parse and display top 5 high scores IN ORDER
  displayHighScores(localScores);
  highScores.setAttribute("style", "display: block");
});

backButton.addEventListener("click", function() {
  init();
});

clearScoresButton.addEventListener("click", function() {
  while (scoreList.hasChildNodes()) {
    scoreList.removeChild(scoreList.firstChild);
  }
  localStorage.removeItem("localScores");
});

// Runs initialization of page upon page load
init();



