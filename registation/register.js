let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(form);
  let name = formData.get("name");
  let email = formData.get("email");
  let gender = formData.get("gender");
  let password = formData.get("password");

  if (name === "" || email === "" || password === "" || gender === null) {
    alert("Fill All The Fields");
  } else {
    let userDetails = {
      name: name,
      email: email,
      gender: gender,
      password: password,
      easy: 0,
      medium: 0,
      hard: 0,
    };
    createUser(userDetails);
  }
});

let createUser = async (data) => {
  try {
    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("Registration Successful");
    location.href = "../loginpage/login.html"
  } catch (error) {
    console.log(error);
    alert("Something Went Wrong Try After Some Time")
  }
};
