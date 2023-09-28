const head = document.getElementById("head");
let scores = document.createElement("a");

scores.innerHTML = `This is a link`;
scores.href = `https://www.w3schools.com/html/html_links.asp`;

head.appendChild(scores);

let timer = document.createElement("p");

timer.innerHTML = "Time: 0";

head.appendChild(timer);
