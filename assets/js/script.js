// Global variables
// Buttons
const startButton = document.getElementById("start");
const ans1Button = document.getElementById("button_1");
const ans2Button = document.getElementById("button_2");
const ans3Button = document.getElementById("button_3");
const ans4Button = document.getElementById("button_4");
const backButton = document.getElementById("back");
const clearScoresButton = document.getElementById("clear_scores");
const HSButton = document.getElementById("view_scores");

// Sections to hide/unhide
const welcome = document.getElementById("welcome_card");
const qCard = document.getElementById("question_card");
const choices = document.getElementById("choice_wrapper");
const qResult = document.getElementById("question_result");
const highScores = document.getElementById("high_scores");

// functions
// Was the answer right? Print result to bottom of screen
function validateAnswer() {
    qResult.removeAttribute("hidden");
}

function generateNewQuestion() {
  // change text in qCard to be a new question

}

function changeDisplay(e) {
  let currButton = e.target;

  // Click to start game
  // Show next question with answers
  if (currButton === startButton) {
    welcome.setAttribute("hidden", "hidden");
    qCard.removeAttribute("hidden");
  }
  else if (currButton === ans1Button || currButton === ans2Button ||
           currButton === ans3Button || currButton === ans4Button) {
            console.log(currButton);
            validateAnswer();
            generateNewQuestion();
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
  changeDisplay(event)
});

choices.addEventListener("click", function(event) {
  let clickedOn = event.target.nodeName;
  if (clickedOn !== 'BUTTON') {
    return;
  }
  // event.stopPropagation();
  console.log(event.target);
  changeDisplay(event)
});

