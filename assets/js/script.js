// Global variables
// Buttons
const startButton = document.getElementById("start");
const ansButton1 = document.getElementById("button_1");
const ansButton2 = document.getElementById("button_2");
const ansButton3 = document.getElementById("button_3");
const ansButton4 = document.getElementById("button_4");
const backButton = document.getElementById("back");
const clearScoresButton = document.getElementById("clear_scores");
const HSButton = document.getElementById("view_scores");

// Sections to hide/unhide
const timer = document.getElementById("timer");
const welcome = document.getElementById("welcome_card");
const qCard = document.getElementById("question_card");
const questionText = document.getElementById("question_text");
const choices = document.getElementById("choice_wrapper");
const initialsEntry = document.getElementById("initials_entry");
const scoreText = document.getElementById("score_text");
const qResult = document.getElementById("question_result");
const highScores = document.getElementById("high_scores");

// Quiz questions
let quizQuestions = 
  [
    {
      question: "What is your name?",
      answers: ["Your mom", "Steve", "Mr. Bigglesworth", "Bonko"],
      solution: "Bonko"
    },

    {
      question: "What is your problem?",
      answers: ["Nothing", "What's it to you?", "idk", "I have an astigmatism"],
      solution: "idk"
    },

    {
      question: "Who do you think you are?",
      answers: ["Steve Jobs", "Jeve Stobs", "Stove Jebs", "Bonko"],
      solution: "Stove Jebs"
    }
  ];

// Other variables
const timerWord = "Time: "
let timeRemaining = 0;
let timeVar;
let currQuestion = "";
let questSolution = "";
let choiceArr;
let questArr;

// functions
// Was the answer right? Print result to bottom of screen

function init() {
  timeRemaining = 75;
  currQuestion = "";
  questSolution = "";
  choiceArr = [];
  questArr = structuredClone(quizQuestions);
  timer.innerHTML = timerWord + timeRemaining;
}

function tickDown() {
  timeRemaining--;
  timer.innerHTML = timerWord + timeRemaining;
}

function generateNewQuestion(button) {  

  // If a question has been answered, print result to bottom of page
  qResult.removeAttribute("hidden");
  if (questSolution !== "") {
    if (button.innerHTML == questSolution) {
      qResult.innerHTML = "Correct!";
    }
    else {
      qResult.innerHTML = "Wrong =(";
      // TODO: Timer minus 10
      timeRemaining -= 10;
    }
  }

  if (questArr.length == 0) {
    clearInterval(timeVar);
    scoreText.innerHTML += timeRemaining;
    qCard.setAttribute("hidden", "hidden");
    initialsEntry.removeAttribute("hidden");
    return;
  }

  // Select random question from quizQuestions
    // Use that to populate #question_text and .choices buttons
    // Also, set global solution variable to the solution from question
  const questIdx = Math.floor(Math.random() * questArr.length);
  const questionClone = structuredClone(questArr[questIdx]);

  currQuestion = questionClone;
  questSolution = currQuestion.solution;
  choiceArr = currQuestion.answers;
  // This for loop fills the choice buttons with text (random order)
  for (let i = 0; i < 4; i++) {
    // Grab a random element and assign it to the button i+1
    // Splice out that element
    let currChoiceIdx = Math.floor(Math.random() * choiceArr.length);
    let buttonText = choiceArr[currChoiceIdx];
    switch (i+1) {
      case 1:
        ansButton1.innerHTML = buttonText;
        break;
      case 2:
        ansButton2.innerHTML = buttonText;
        break;
      case 3:
        ansButton3.innerHTML = buttonText;
        break;
      case 4:
        ansButton4.innerHTML = buttonText;
      break;
    }
    choiceArr.splice(currChoiceIdx, 1);
  }
  // Sets question text
  questionText.innerHTML = currQuestion.question;
  // Removes selected question from possibilities
  questArr.splice(questIdx, 1);
  console.log("Just removed a question. Let's see what's left");
  console.log(questArr);
}

function changeDisplay(e) {
  let currButton = e.target;

  // Click to start game
  // Show next question with answers
  if (currButton === startButton) {
    welcome.setAttribute("hidden", "hidden");
    qCard.removeAttribute("hidden");
    generateNewQuestion();
  }
  else if (currButton === ansButton1 || currButton === ansButton2 ||
           currButton === ansButton3 || currButton === ansButton4) {
            generateNewQuestion(currButton);
  }
  // Options:


  // CLick answer of a question
    // AT FINAL QUESTION, screen changes differently
  
  // On high score page, clicking to go back and restart quiz
    // Show home page again
  
  // On high score page, clicking to clear scores does so (local storage)
}

// Event listeners
startButton.addEventListener("click", function(event) {
  timeVar = setInterval(tickDown, 1000);
  changeDisplay(event)
});

choices.addEventListener("click", function(event) {
  let clickedOn = event.target.nodeName;
  if (clickedOn !== 'BUTTON') {
    return;
  }
  // event.stopPropagation();
  // console.log(event.target);
  changeDisplay(event)
});

choices.addEventListener("mouseover", function(e) {
  e.stopPropagation();
  console.log("I see you...");
  let mouseOver = e.target.nodeName;
  if (mouseOver !== 'BUTTON') {
    return;
  }
  qResult.setAttribute("hidden", "hidden");
})

init();