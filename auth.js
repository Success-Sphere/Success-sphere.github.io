// auth.js

window.handleCredentialResponse = (response) => {
  const data = jwt_decode(response.credential);

  const userData = {
    firstName: data.given_name || "User",
    email: data.email,
    picture: data.picture || "",
  };
  localStorage.setItem(
    "ssphere_name",
    userData.fullName,
    JSON.stringify(userData)
  );
  localStorage.setItem(
    "ssphere_email",
    userData.email,
    JSON.stringify(userData)
  );

  window.location.href = "dashboard.html";
};

// Just redirect logic if needed (optional cleanup)
window.onload = function () {
  const userData = JSON.parse(localStorage.getItem("ssphere_name")) || {};
  if (userData && userData.firstName) {
    const authArea = document.getElementById("auth-area");
    if (authArea) {
      authArea.innerHTML = `
        <div class="user-circle" onclick="toggleUserMenu()">
          ${userData.firstName.charAt(0).toUpperCase()}
        </div>
        <div id="user-menu" class="user-menu" style="display: none;">
          <div class="user-menu-header">
            <div class="user-initial-circle">${userData.fullName
              .charAt(0)
              .toUpperCase()}</div>
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
  localStorage.removeItem("ssphere_name");
  localStorage.removeItem("ssphere_email");
  location.href = "index.html";
}

function toggleUserMenu() {
  const menu = document.getElementById("user-menu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}
