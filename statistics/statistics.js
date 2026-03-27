let usedData_id = sessionStorage.getItem("id");

let progress_easy = document.querySelector(".progress_easy");
let progress_medium = document.querySelector(".progress_medium");
let progress_hard = document.querySelector(".progress_hard");

let easy_question = document.querySelector(".easy_question");
let medium_question = document.querySelector(".medium_question");
let hard_question = document.querySelector(".hard_question");

let easy = document.querySelector(".easy");
let medium = document.querySelector(".medium");
let hard = document.querySelector(".hard");

let userData = async () => {
  let response = await fetch("http://localhost:3000/users");
  let responseData = await response.json();
  let singleUser = responseData.find((value) => value.id === usedData_id);

  //! Progress Bars
  progress_easy.style.width = `${singleUser.easy}%`;
  progress_easy.style.backgroundColor = "green";
  progress_medium.style.width = `${singleUser.medium}%`;
  progress_medium.style.backgroundColor = "blue";
  progress_hard.style.width = `${singleUser.hard}%`;
  progress_hard.style.backgroundColor = "red";

  //   ! Progress bars percentage
  easy.innerHTML = `${singleUser.easy}%`;
  medium.innerHTML = `${singleUser.medium}%`;
  hard.innerHTML = `${singleUser.hard}%`;

  //   ! Question update

  easy_question.innerHTML = `${singleUser.easy}/100`
  medium_question.innerHTML = `${singleUser.medium}/100`
  hard_question.innerHTML = `${singleUser.hard}/100`
};
userData();
