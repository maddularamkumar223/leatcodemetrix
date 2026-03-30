let problem_statement = document.querySelector(".problem_statement");
let currentIndex = 0;
let dataDisplay = document.querySelector(".dataDisplay");
let userIdProblem = sessionStorage.getItem("id");

let problems = async () => {
  let response = await fetch("http://localhost:3000/problems");
  let responseData = await response.json();
  let backButton = document.createElement("button");
  let fwdButton = document.createElement("button");
  let buttonContainer = document.createElement("div");
  buttonContainer.className = "backAndFwd";

  backButton.innerHTML = "Back";
  fwdButton.innerHTML = "Next";
  buttonContainer.append(backButton, fwdButton);
  problem_statement.append(buttonContainer);

  fwdButton.addEventListener("click", () => {
    if (currentIndex < responseData.length - 1) {
      currentIndex++;
      let question = responseData[currentIndex];
      displayProblem(question);
      console.log(currentIndex);
    } else {
      fwdButton.style.disabled = "true";
      fwdButton.style.backgroundColor = "transparent";
      fwdButton.style.color = "gray";
    }
  });

  backButton.addEventListener("click", () => {
    currentIndex = currentIndex - 1;
    if (currentIndex === 1) {
      backButton.style.disabled = "true";
      backButton.style.backgroundColor = "transparent";
      backButton.style.color = "gray";
    } else {
      let question = responseData[currentIndex];
      displayProblem(question);
    }
  });
  displayProblem(responseData[0]);
};
problems();

let displayProblem = (data) => {
  let questionNO = document.querySelector(".questionNo");
  let title = document.querySelector(".title");
  let description = document.querySelector(".description");
  let level = document.querySelector(".level");
  questionNO.innerHTML = `Question No : ${data.problem_id}`;
  title.innerHTML = `Title: ${data.title}`;
  description.innerHTML = `Description: ${data.description} `;
  level.innerHTML = `Level: <span>${data.difficulty}</span>`;
};

let updateQuestion = async () => {
  let response = await fetch(`http://localhost:3000/users/${userIdProblem}`);
  let data = await response.json();
  let level = document.querySelector("span").innerText;
  if (level === "Easy") {
    let updateEasy = data.easy + 1;
    questionUpdate({ easy: updateEasy });
  } else if (level === "Medium") {
    let updateMedium = data.medium + 1;
    questionUpdate({ medium: updateMedium });
  } else if (level === "Hard") {
    let updateHard = data.hard + 1;
    questionUpdate({ hard: updateHard });
  }
};

let solveButton = document
  .querySelector(".solveButton")
  .addEventListener("click", async () => {
    console.log("Button Clicked");
    await updateQuestion();
  });

let questionUpdate = async (level) => {
  try {
    await fetch(`http://localhost:3000/users/${userIdProblem}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(level),
    });
  } catch (error) {
    console.log(error);
  }
};
