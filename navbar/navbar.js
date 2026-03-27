let logo = [
  {
    name: "logo",
    path: "#",
  },
];

let navigation = [
  {
    name: "problems",
    path: "#",
  },
  {
    name: "statistics",
    path: "../statistics/statistics.html",
  },
];

let profile = [
  {
    name: "log in",
    path: "../loginpage/login.html",
  },
  {
    name: "sign in",
    path: "../registation/register.html",
  },
  {
    name: "logout",
  },
];

let nav_container = document.getElementById("nav_container");

let createNavbar = (data) => {
  let container = document.createElement("article");
  let ul = document.createElement("ul");

  data.forEach((element) => {
    let li = document.createElement("li");
    let a = document.createElement("a");
    if (element.name === "logo") {
      let image = document.createElement("img");
      image.src = element.path;
      image.alt = element.name;
      a.append(image);
      a.href = "../homepage/index.html";
      li.append(a);
    } else if (element.name === "logout") {
      let button = document.createElement("button");
      button.innerHTML = element.name;

      button.addEventListener("click", () => {
        sessionStorage.removeItem("id");
        location.reload();
      });
      li.append(button);
    } else {
      a.innerHTML = element.name;
      a.href = element.path;
      li.append(a);
    }
    li.className = element.name;
    ul.append(li);
  });
  container.append(ul);
  nav_container.append(container);
};

createNavbar(logo);
createNavbar(navigation);
createNavbar(profile);

let logIn = document.querySelector(".log");
let signIn = document.querySelector(".sign");
let logout = document.querySelector(".logout");

let userId = sessionStorage.getItem("id");
if (userId) {
  logIn.style.display = "none";
  signIn.style.display = "none";
} else {
  logout.style.display = "none";
}
