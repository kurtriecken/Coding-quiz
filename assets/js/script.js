let welcome = document.createElement("h1");
welcome.innerHTML = `Welcome to the coding quiz!`;

const center = document.getElementById("center_card");

center.insertBefore(welcome, center.children[0]);

const button = document.getElementById("start");

button.addEventListener("click", removeFunction);

function removeFunction() {
    let child = center.children[0];
    child.remove();
}

// const head = document.getElementById("head");
// let scores = document.createElement("a");

// scores.innerHTML = `This is a link`;
// scores.href = `https://www.w3schools.com/html/html_links.asp`;

// head.appendChild(scores);

// let timer = document.createElement("p");

// timer.innerHTML = "Time: 0";

// head.appendChild(timer);
