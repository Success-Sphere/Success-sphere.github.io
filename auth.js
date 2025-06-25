// auth.js

window.handleCredentialResponse = (response) => {
  const data = jwt_decode(response.credential);

  const userData = {
    fullName: data.name || "User",
    firstName: data.given_name || "User",
    email: data.email,
    picture: data.picture || "",
  };

  localStorage.setItem("ssphere_user", JSON.stringify(userData));
  window.location.href = "dashboard.html";
};

window.onload = function () {
  const userData = JSON.parse(localStorage.getItem("ssphere_user")) || {};
  if (userData && userData.fullName && userData.email) {
    const initials = userData.fullName
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("")
      .slice(0, 2);

    const authArea = document.getElementById("auth-area");
    if (authArea) {
      authArea.innerHTML = `
        <div class="user-circle" onclick="toggleUserMenu()">${initials}</div>
        <div id="user-menu" class="user-menu" style="display: none;">
          <div class="user-menu-header">
            <div class="user-initial-circle">${initials}</div>
            <div class="user-info-text">
              <p class="user-name">${userData.fullName}</p>
              <p class="user-email">${userData.email}</p>
            </div>
          </div>
          <hr />
          <div class="user-menu-links">
            <a href="dashboard.html" class="menu-link">My Profile</a>
            <button onclick="logoutUser()" class="menu-link logout-btn">Logout</button>
          </div>
        </div>
      `;
    }
  }
};

function logoutUser() {
  localStorage.removeItem("ssphere_user");
  location.href = "index.html";
}

function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}