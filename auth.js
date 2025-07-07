function toggleUserMenu() {
  const e = document.getElementById("user-menu");
  e && (e.style.display = "block" === e.style.display ? "none" : "block");
}
function logoutUser() {
  fetch("/api/logout", { method: "POST" })
    .then((res) => {
      if (!res.ok) throw new Error("Server logout failed");
    })
    .catch(() => {
      console.warn(
        "⚠️ Logout failed on server. Proceeding with client cleanup."
      );
    })
    .finally(() => {
      // Clear localStorage values (used in your app)
      localStorage.removeItem("ssphere_user");
      localStorage.removeItem("ssphere_name");

      // Redirect to homepage
      window.location.href = "index.html";
    });
}
function renderUserProfile(e) {
  const n = e.fullName
      .split(" ")
      .map((e) => e[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    s = document.getElementById("auth-area");
  s &&
    (s.innerHTML = `\n    <div class="user-circle" onclick="toggleUserMenu()">${n}</div>\n    <div id="user-menu" class="user-menu" style="display: none;">\n      <div class="user-menu-header">\n        <div class="user-initial-circle">${n}</div>\n        <div class="user-info-text">\n          <p class="user-name">${e.fullName}</p>\n          <p class="user-email">${e.email}</p>\n        </div>\n      </div>\n      <hr />\n      <div class="user-menu-links">\n        <a href="dashboard.html" class="menu-link">My Profile</a>\n        <button onclick="logoutUser()" class="logout-btn">Logout</button>\n      </div>\n    </div>\n  `);
}
window.addEventListener("DOMContentLoaded", () => {
  fetch("/api/session")
    .then((e) => e.json())
    .then((e) => {
      e && e.fullName && renderUserProfile(e);
    })
    .catch(() => {
      console.warn("⚠️ Not logged in");
    });
});
