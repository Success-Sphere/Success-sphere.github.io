// auth.js

function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

function logoutUser() {
  fetch("/api/logout", { method: "POST" }).then(() => {
    window.location.href = "index.html";
  });
}

function renderUserProfile(user) {
  const initials = user.fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const authArea = document.getElementById("auth-area");
  if (!authArea) return;

  authArea.innerHTML = `
      <div class="user-circle" onclick="toggleUserMenu()">${initials}</div>
      <div id="user-menu" class="user-menu" style="display: none;">
        <div class="user-menu-header">
          <div class="user-initial-circle">${initials}</div>
          <div class="user-info-text">
            <p class="user-name">${user.fullName}</p>
            <p class="user-email">${user.email}</p>
          </div>
        </div>
        <hr />
        <div class="user-menu-links">
          <a href="dashboard.html" class="menu-link">My Profile</a>
          <button onclick="logoutUser()" class="logout-btn">Logout</button>
        </div>
      </div>
    `;
}

window.addEventListener("DOMContentLoaded", () => {
  fetch("/api/session")
    .then((res) => res.json())
    .then((user) => {
      if (user && user.fullName) {
        renderUserProfile(user);
      }
    })
    .catch(() => {
      console.warn("⚠️ User not logged in.");
    });
});
