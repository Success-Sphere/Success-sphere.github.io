// Sidebar Toggle
function toggleSidebar() {
  const sidebar = document.getElementById("mobileSidebar");
  sidebar.classList.toggle("open");
}

// Close Sidebar on Link Click
document.querySelectorAll(".sidebar a").forEach((link) => {
  link.addEventListener("click", () => {
    toggleSidebar();
  });
});

// Close Sidebar on Outside Click (Mobile Only)
document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("mobileSidebar");
  const topbar = document.querySelector(".topbar");

  if (
    !sidebar.contains(e.target) &&
    !topbar.contains(e.target) &&
    sidebar.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
  }
});

// Close Sidebar on Escape Key Press
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const sidebar = document.getElementById("mobileSidebar");
    sidebar.classList.remove("open");
  }
});

// Smooth Scroll for Internal Links
document.querySelectorAll("a[href^='#']").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Button Hover Effects
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.transform = "scale(1.05)";
  });
  button.addEventListener("mouseout", () => {
    button.style.transform = "scale(1)";
  });
});

// Hero Button Animation
const heroButton = document.querySelector(".hero .btn");
if (heroButton) {
  heroButton.addEventListener("mouseover", () => {
    heroButton.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
  });
  heroButton.addEventListener("mouseout", () => {
    heroButton.style.boxShadow = "none";
  });
}

// Form Validation (Optional)
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (e) => {
    const inputs = form.querySelectorAll("input[required]");
    for (let input of inputs) {
      if (!input.value.trim()) {
        e.preventDefault();
        alert("Please fill in all required fields.");
        input.focus();
        return;
      }
    }
  });
});

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
