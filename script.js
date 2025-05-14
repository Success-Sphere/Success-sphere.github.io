// Smooth scroll for navigation
document.querySelectorAll("a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
// Hero Button Click
document.querySelectorAll(".hero-btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    const target = e.target.getAttribute("href");
    if (target) {
      window.location.href = target;
    }
  });
});
// Form Validation for Login and Register
function validateForm(form) {
  let isValid = true;

  const username = form.querySelector('[name="username"]');
  const password = form.querySelector('[name="password"]');
  const email = form.querySelector('[name="email"]'); // For register form

  if (username && username.value.trim() === "") {
    isValid = false;
    alert("Username cannot be empty");
  }

  if (password && password.value.trim() === "") {
    isValid = false;
    alert("Password cannot be empty");
  }

  if (email && email.value.trim() === "") {
    isValid = false;
    alert("Email cannot be empty");
  }

  return isValid;
}

// Login Form Submission
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm(loginForm)) {
      // Logic for submitting login details, using AJAX or standard form submission
      alert("Login Successful!");
      // Redirect or perform login action
    }
  });
}

// Registration Form Submission
const registerForm = document.querySelector("#register-form");
if (registerForm) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm(registerForm)) {
      // Logic for submitting registration details, using AJAX or standard form submission
      alert("Registration Successful!");
      // Redirect or perform register action
    }
  });
}

// Contact Form Submission (with basic validation)
const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = contactForm.querySelector('[name="name"]');
    const email = contactForm.querySelector('[name="email"]');
    const message = contactForm.querySelector('[name="message"]');

    if (
      name.value.trim() === "" ||
      email.value.trim() === "" ||
      message.value.trim() === ""
    ) {
      alert("Please fill in all fields");
    } else {
      // Simulate successful form submission
      alert("Message sent successfully! We will get back to you soon.");
      contactForm.reset();
    }
  });
}
function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  sidebar.style.width = sidebar.style.width === "250px" ? "0" : "250px";
}
const courseCards = document.querySelectorAll(".course-card");
if (courseCards) {
  courseCards.forEach((card) => {
    card.addEventListener("click", function () {
      const courseName = this.querySelector("h3").innerText;
      alert(`You clicked on the course: ${courseName}`);
      // Redirect to course details page or perform another action
    });
  });
}

// Admin Settings Toggle (Example)
const settingsButton = document.querySelector("#settings-btn");
const settingsPanel = document.querySelector("#settings-panel");
if (settingsButton && settingsPanel) {
  settingsButton.addEventListener("click", function () {
    settingsPanel.classList.toggle("active");
  });
}

// Modal for Course Details (Example)
const courseModal = document.querySelector("#course-modal");
const courseDetailsBtns = document.querySelectorAll(".course-details-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");

if (courseDetailsBtns && courseModal && closeModalBtn) {
  courseDetailsBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const courseTitle = this.getAttribute("data-title");
      const courseDescription = this.getAttribute("data-description");
      courseModal.querySelector(".modal-title").innerText = courseTitle;
      courseModal.querySelector(".modal-description").innerText =
        courseDescription;
      courseModal.classList.add("active");
    });
  });

  closeModalBtn.addEventListener("click", function () {
    courseModal.classList.remove("active");
  });
}
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
