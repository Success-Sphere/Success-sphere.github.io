function toggleUserMenu() {
  const e = document.getElementById("user-menu");
  e && (e.style.display = "block" === e.style.display ? "none" : "block");
}
function logoutUser() {
  fetch("/api/logout", { method: "POST" })
    .then((e) => {
      if (!e.ok) throw new Error("Server logout failed");
    })
    .catch(() => {
      console.warn(
        "⚠️ Logout failed on server. Proceeding with client cleanup."
      );
    })
    .finally(() => {
      localStorage.removeItem("ssphere_user"),
        localStorage.removeItem("ssphere_name"),
        (window.location.href = "index.html");
    });
}
function renderUserProfile(e) {
  const n = e.fullName
      .split(" ")
      .map((e) => e[0])
      .join("")
      .toUpperCase()
      .slice(0, 2),
    t = document.getElementById("auth-area");
  t &&
    (t.innerHTML = `\n    <div class="user-circle" onclick="toggleUserMenu()">${n}</div>\n    <div id="user-menu" class="user-menu" style="display: none;">\n      <div class="user-menu-header">\n        <div class="user-initial-circle">${n}</div>\n        <div class="user-info-text">\n          <p class="user-name">${e.fullName}</p>\n          <p class="user-email">${e.email}</p>\n        </div>\n      </div>\n      <hr />\n      <div class="user-menu-links">\n        <a href="dashboard.html" class="menu-link">My Profile</a>\n        <button onclick="logoutUser()" class="logout-btn">Logout</button>\n      </div>\n    </div>\n  `);
}
document.addEventListener("DOMContentLoaded", () => {
  const e = document.getElementById("registerForm");
  e &&
    e.addEventListener("submit", async (n) => {
      n.preventDefault();
      const t = new FormData(e),
        o = Object.fromEntries(t.entries());
      if (o.password === o.confirm_password)
        try {
          (
            await fetch("/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(o),
            })
          ).ok
            ? (window.location.href = "dashboard.html")
            : (alert("❌ Registration failed. Please try again."),
              (window.location.href = "index.html"));
        } catch (e) {
          console.error("⚠️ Registration error:", e),
            alert("❌ Something went wrong. Please try again."),
            (window.location.href = "index.html");
        }
      else alert("❌ Passwords do not match");
    });
}),
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
