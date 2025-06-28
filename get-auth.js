// TODO: Replace this with cookie-based session or token verification via MySQL
fetch("/api/session")
  .then((res) => res.json())
  .then((user) => {
    if (user && user.fullName) {
      const initials = user.fullName
        .split(" ")
        .map((e) => e[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const authArea = document.getElementById("auth-area");
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
  })
  .catch(() => {
    console.warn("Not logged in.");
  });

function logoutUser() {
  fetch("/api/logout", { method: "POST" })
    .then(() => {
      window.location.href = "index.html";
    });
}