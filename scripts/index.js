// Signup and password-strength validation
const signupForm = document.getElementById("signupForm");
const passwordInput = document.getElementById("firstpassword");
const confirmInput = document.getElementById("confirm");
const strengthMessage = document.getElementById("displayStrength");

if (passwordInput && strengthMessage) {
  passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    if (!password) {
      strengthMessage.textContent = "";
      return;
    }

    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    if (password.length < 5 || !hasLetters || !hasNumbers || !hasSpecial) {
      strengthMessage.textContent =
        "Weak — use letters, numbers and special characters";
      strengthMessage.style.color = "red";
    } else if (password.length <= 8) {
      strengthMessage.textContent = "Medium";
      strengthMessage.style.color = "#b58900";
    } else {
      strengthMessage.textContent = "Strong";
      strengthMessage.style.color = "green";
    }
  });
}

if (signupForm) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = passwordInput.value;
    const confirmation = confirmInput.value;

    if (!name || !email || !password || !confirmation) {
      alert("Please complete all fields.");
      return;
    }
    if (password !== confirmation) {
      alert("Passwords do not match.");
      confirmInput.focus();
      return;
    }
    if (
      password.length < 5 ||
      !/[a-zA-Z]/.test(password) ||
      !/[0-9]/.test(password) ||
      !/[^a-zA-Z0-9]/.test(password)
    ) {
      alert(
        "Please choose a password containing letters, numbers and a special character (at least 5 characters).",
      );
      passwordInput.focus();
      return;
    }

    const userDetails = { name, email, password };
    localStorage.setItem("user", JSON.stringify(userDetails));
    alert("Account created successfully. Please log in.");
    window.location.href = "signin.html";
  });
}
