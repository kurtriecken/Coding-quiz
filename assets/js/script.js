// Global variables
const startButton = document.getElementById("start");
const welcome = document.getElementById("welcome_card");
const qCard = document.getElementById("question_card");
const butt_1 = document.getElementById("button_1");
const butt_2 = document.getElementById("button_2");
const butt_3 = document.getElementById("button_3");
const butt_4 = document.getElementById("button_4");
const highScores = document.getElementById("high_scores");

// functions
function validateScore() {
    console.log();
}

function generateNewQuestion() {
  // change text in qCard to be a new question
}

function changeDisplay(e) {
  let currButton = e.currentTarget;

  if (currButton === startButton) {
    welcome.setAttribute("hidden", "hidden");
    qCard.removeAttribute("hidden");
  }
  else if (currButton === butt_1 || currButton === butt_2 ||
           currButton === butt_3 || currButton === butt_4) {
            generateNewQuestion();
  }
  // Options:
  // Click to start game
    // Show next question with answers

  // CLick answer of a question
    // AT FINAL QUESTION, screen changes differently
  
  // On high score page, clicking to go back and restart quiz
    // Show home page again
}

// Event listeners
startButton.addEventListener("click", function(event) {
  changeDisplay(event)
});

// var firstNameInput = document.querySelector("#first-name");
// var lastNameInput = document.querySelector("#last-name");
// var emailInput = document.querySelector("#email");
// var passwordInput = document.querySelector("#password");
// var signUpButton = document.querySelector("#sign-up");

// signUpButton.addEventListener("click", function(event) {
//   event.preventDefault();
  
//   // TODO: Create user object from submission
//   var person = {
//     firstName : firstNameInput.value.trim(),
//     lastName : lastNameInput.value.trim(),
//     email : email.value.trim(),
//     password : passwordInput.value.trim()
//   };

  // TODO: Set new submission to local storage 
  // localStorage.setItem("person", JSON.stringify(person));

  // console.log(person);
// });
// const center = document.getElementById("center_card");
// const button = document.getElementById("start");
// const welcome = document.getElementById("welcome");
// const backButton = document.getElementById("back");
// let choices = ["choice 1", "choice 2", "choice 3", "choice 4"];


// button.addEventListener("click", addButtons);
// backButton.addEventListener("click", putBack);

// function addButtons() {
//     button.setAttribute("hidden", "hidden");
//     // changeText();
//     for (let i = 0; i < 4; i++) {
//         let newButton = document.createElement("button");
//         newButton.innerHTML = `${choices[i]}`
//         center.appendChild(newButton);
//     }
// }

// function removeFunction() {
//     button.hidden = hidden;
// }

// function putBack() {
//     welcome.hidden = false;
// }

// function changeText() {
//     welcome.innerHTML = "Question 1: What is your name?";
// }

// const head = document.getElementById("head");
// let scores = document.createElement("a");

// scores.innerHTML = `This is a link`;
// scores.href = `https://www.w3schools.com/html/html_links.asp`;

// head.appendChild(scores);

// let timer = document.createElement("p");

// timer.innerHTML = "Time: 0";

// head.appendChild(timer);
