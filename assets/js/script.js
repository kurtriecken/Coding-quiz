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
const welcome = document.getElementById("welcome_card");
const qCard = document.getElementById("question_card");
const questionText = document.getElementById("question_text");
const choices = document.getElementById("choice_wrapper");
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
let currQuestion;
let questSolution = "";
let questArr;

// functions
// Was the answer right? Print result to bottom of screen

function generateNewQuestion(button) {  
  // Select random question from quizQuestions
    // Use that to populate h2 and choices buttons
    // Also, set global solution variable to the solution from question
  qResult.removeAttribute("hidden");
  if (questSolution !== "") {
    if (button.innerHTML == questSolution) {
      qResult.innerHTML = "Correct!";
    }
    else {
      qResult.innerHTML = "Wrong =(";
    }
  }


  const questionClone = structuredClone(quizQuestions[Math.floor(Math.random() * quizQuestions.length)]);

  currQuestion = questionClone;
  questSolution = currQuestion.solution;
  questArr = currQuestion.answers;
  // This for loop fills the choice buttons with text (random order)
  for (let i = 0; i < 4; i++) {
    // Grab a random element and assign it to the button i+1
    // Splice out that element
    let currChoiceIdx = Math.floor(Math.random() * questArr.length);
    let buttonText = questArr[currChoiceIdx];
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
    questArr.splice(currChoiceIdx, 1);
    console.log(`Questions: ${questArr}`);
  }
  // Sets question text
  questionText.innerHTML = currQuestion.question;
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
            // console.log(currButton);
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

