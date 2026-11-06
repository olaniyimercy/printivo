// Login
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document
      .getElementById("username")
      .value.trim()
      .toLowerCase();
    const password = document.getElementById("passwordIn").value;

    if (!username || !password) {
      alert("Please enter your name/email and password.");
      return;
    }

    let user;
    try {
      user = JSON.parse(localStorage.getItem("user") || "null");
    } catch (error) {
      user = null;
    }

    if (!user) {
      alert("No account found. Please sign up first.");
      return;
    }

    const nameMatches =
      user.name && username === user.name.trim().toLowerCase();
    const emailMatches =
      user.email && username === user.email.trim().toLowerCase();
    if ((!nameMatches && !emailMatches) || password !== user.password) {
      alert("Incorrect name/email or password.");
      return;
    }

    sessionStorage.setItem("loggedIn", "true");
    alert("Login successful.");
    window.location.href = "homepage.html";
  });
}
