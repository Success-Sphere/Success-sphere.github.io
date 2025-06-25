const authArea = document.getElementById("auth-area");
const userRaw = localStorage.getItem("ssphere_user");
let user = null;

try {
  user = userRaw ? JSON.parse(userRaw) : null;
} catch {
  user = null;
}

if (user && user.fullName && user.email) {
  const initials = user.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  authArea.innerHTML = `
  <div class="user-circle" onclick="toggleMenu()">${initials}</div>
  <div id="user-menu" class="user-menu" style="display:none">
    <p><strong>${user.fullName}</strong></p>
    <p>${user.email}</p>
    <a href="dashboard.html" class="menu-link">My Profile</a>
    <button onclick="logoutUser()">Logout</button>
  </div>
`;
}

function logoutUser() {
  localStorage.removeItem("ssphere_user");
  window.location.href = "index.html";
}

function toggleMenu() {
  const menu = document.getElementById("user-menu");
  if (menu) {
    menu.style.display = menu.style.display === "block" ? "none" : "block";
  }
}

window.addEventListener("click", (e) => {
  const menu = document.getElementById("user-menu");
  if (menu && !authArea.contains(e.target)) {
    menu.style.display = "none";
  }
});
