let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  let email = formData.get("email");
  let password = formData.get("password");
  if (email === "" || password === "") {
    alert("Fill All The Fields");
  } else {
    validation(email, password);
  }
});

let validation = async (email, password) => {
  try {
    let response = await fetch("http://localhost:3000/users");
    let responseData = await response.json();

    let singleUser = responseData.find(
      (value) => value.email === email && value.password === password,
    );

    if (singleUser === undefined) {
      alert("User Not Found");
    } else {
      alert("Login Successful");
      location.href = "../homepage/index.html";
    }
  } catch (error) {
    console.log(error);
    alert("Something Went Wrong Try After Sometime");
  }
};
