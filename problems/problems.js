let problem_statement = document.querySelector(".problem_statement");
let currentIndex = 0;
let dataDisplay = document.querySelector(".dataDisplay");

let problems = async () => {
  let response = await fetch("http://localhost:3000/problems");
  let responseData = await response.json();
  console.log(responseData);

  let backButton = document.createElement("button");
  let fwdButton = document.createElement("button");
  let buttonContainer = document.createElement("div");
  buttonContainer.className = "backAndFwd";

  backButton.innerHTML = "Back";
  fwdButton.innerHTML = "Next";
  buttonContainer.append(backButton, fwdButton);
  problem_statement.append(buttonContainer);

  fwdButton.addEventListener("click", () => {
    if (currentIndex < responseData.length) {
      currentIndex++;
      let question = responseData[currentIndex];
      console.log(question);
      displayProblem(question);
    } else {
      let h1 = document.createElement("h1");
      h1.innerHTML = "Data Not Found";
      problem_statement.append(h1);
    }
  });
  backButton.addEventListener("click", () => {
    currentIndex = currentIndex - 1;

    if (currentIndex < responseData.length) {
      let question = responseData[currentIndex];
      console.log(question);
      displayProblem(question);
    } else {
      let h1 = document.createElement("h1");
      h1.innerHTML = "Data Not Found";
      problem_statement.append(h1);
    }
  });

  console.log(currentIndex);
};
problems();

let displayProblem = (data) => {
  let questionNO = document.createElement("p");
  let title = document.createElement("p");
  let description = document.createElement("p");
  let level = document.createElement("p");
  let container = document.createElement("aside");
  container.className = "dataDisplay";
  questionNO.innerHTML = `Question No : ${data.problem_id}`;
  title.innerHTML = `Title: ${data.title}`;
  description.innerHTML = `Description: ${data.description} `;
  level.innerHTML = `Level: ${data.difficulty}`;
  container.append(questionNO, title, level, description);
  problem_statement.append(container);
};
