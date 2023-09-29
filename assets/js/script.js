const center = document.getElementById("center_card");
const button = document.getElementById("start");
let welcome = document.createElement("h1");
let choices = ["choice 1", "choice 2", "choice 3", "choice 4"];

welcome.innerHTML = `Welcome to the coding quiz!`;
center.insertBefore(welcome, center.children[0]);

button.addEventListener("click", addButtons);

function addButtons() {
    removeFunction();
    changeText();
    for (let i = 0; i < 4; i++) {
        let newButton = document.createElement("button");
        newButton.innerHTML = `${choices[i]}`
        center.appendChild(newButton);
    }
}

function removeFunction() {
    button.remove();
}

function changeText() {
    welcome.innerHTML = "Question 1: What is your name?";
}

// const head = document.getElementById("head");
// let scores = document.createElement("a");

// scores.innerHTML = `This is a link`;
// scores.href = `https://www.w3schools.com/html/html_links.asp`;

// head.appendChild(scores);

// let timer = document.createElement("p");

// timer.innerHTML = "Time: 0";

// head.appendChild(timer);
