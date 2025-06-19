// === Sidebar Toggle ===
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

// Close Sidebar on Outside Click
document.addEventListener("click", (e) => {
  const sidebar = document.getElementById("mobileSidebar");
  const topbar = document.querySelector(".topbar");
  if (
    sidebar &&
    !sidebar.contains(e.target) &&
    !topbar.contains(e.target) &&
    sidebar.classList.contains("open")
  ) {
    sidebar.classList.remove("open");
  }
});

// === Circular User Button Logic ===
window.addEventListener("DOMContentLoaded", () => {
  const authArea = document.getElementById("auth-area");
  if (!authArea) return;

  const firstName = localStorage.getItem("ssphere_name") || "User";
  const email = localStorage.getItem("ssphere_email") || "user@example.com";

  authArea.innerHTML = `
    <div class="user-circle" onclick="toggleUserMenu()">
      ${firstName.charAt(0).toUpperCase()}
    </div>
    <div id="user-menu" class="user-menu" style="display: none;">
      <div class="user-menu-header">
        <div class="user-initial-circle">${firstName
          .charAt(0)
          .toUpperCase()}</div>
        <div class="user-info-text">
          <p class="user-name">${firstName}</p>
          <p class="user-email">${email}</p>
        </div>
      </div>
      <hr />
      <div class="user-menu-links">
        <a href="dashboard.html" class="menu-link">My Profile</a>
        <button onclick="logoutUser()" class="menu-link logout-btn">Logout</button>
      </div>
    </div>
  `;
});

function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

function logoutUser() {
  localStorage.removeItem("ssphere_name");
  localStorage.removeItem("ssphere_email");
  location.reload();
}

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential);
  localStorage.setItem("user", JSON.stringify(data));
  showUserProfile();
  window.location.href = "index.html";
}

function showUserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    document.getElementById("auth-area").innerHTML = `
      <div class="user-profile" onclick="toggleUserMenu()">
        <img src="${user.picture}" alt="User" class="user-avatar">
      </div>
      <div id="user-menu" class="user-menu" style="display: none;">
        <p>${user.name}</p>
        <button onclick="signOut()">Sign Out</button>
      </div>
    `;
  }
}

function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function signOut() {
  localStorage.removeItem("user");
  location.reload();
}

window.onload = showUserProfile;

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
function validateForm(form) {
  const inputs = form.querySelectorAll("input[required]");
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add("error");
      input.nextElementSibling.textContent = "This field is required.";
    } else {
      input.classList.remove("error");
      input.nextElementSibling.textContent = "";
    }
  });
  fetch("register-alt.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: document.querySelector("#email").value,
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    }),
  });
  if (isValid) {
    // Additional validation logic can be added here
    const email = form.querySelector('input[name="email"]');
    const password = form.querySelector('input[name="password"]');

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      isValid = false;
      email.classList.add("error");
      email.nextElementSibling.textContent = "Please enter a valid email.";
    }

    if (password && password.value.length < 6) {
      isValid = false;
      password.classList.add("error");
      password.nextElementSibling.textContent =
        "Password must be at least 6 characters long.";
    }
  }
  return isValid;
}
