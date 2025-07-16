function toggleUserMenu() {
  const e = document.getElementById("user-menu");
  if (e) {
    const n = e.classList.toggle("show");
    e.style.display = n ? "block" : "none";
  }
}
function logoutUser() {
  fetch("/api/logout", { method: "POST" }).finally(() => {
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
    ((t.innerHTML = `\n      <div id="user-circle" class="user-circle">${n}</div>\n      <div id="user-menu" class="user-menu" style="display: none;">\n        <div class="user-menu-header">\n          <div class="user-initial-circle">${n}</div>\n          <div class="user-info-text">\n            <p class="user-name">${e.fullName}</p>\n            <p class="user-email">${e.email}</p>\n          </div>\n        </div>\n        <hr />\n        <div class="user-menu-links">\n          <a href="dashboard.html" class="menu-link">My Profile</a>\n          <button onclick="logoutUser()" class="logout-btn">Logout</button>\n        </div>\n      </div>\n    `),
    document
      .getElementById("user-circle")
      .addEventListener("click", toggleUserMenu));
}
window.addEventListener("click", (e) => {
  const n = document.getElementById("user-menu"),
    t = document.getElementById("user-circle");
  n &&
    t &&
    !n.contains(e.target) &&
    !t.contains(e.target) &&
    ((n.style.display = "none"), n.classList.remove("show"));
}),
  window.addEventListener("DOMContentLoaded", () => {
    const e = document.getElementById("loginForm");
    e &&
      e.addEventListener("submit", async (n) => {
        n.preventDefault();
        const t = new FormData(e),
          s = Object.fromEntries(t.entries());
        try {
          const e = await fetch("/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(s),
            }),
            n = await e.json();
          e.ok && n.success
            ? (localStorage.setItem("ssphere_user", JSON.stringify(n.user)),
              localStorage.setItem("ssphere_name", n.user.fullName),
              (window.location.href = "dashboard.html"))
            : alert("❌ " + (n.message || "Login failed."));
        } catch (e) {
          alert("❌ Network/server error. Try again later.");
        }
      });
  });
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirm_password) {
      alert("❌ Passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        window.location.href = "dashboard.html";
      } else {
        alert("❌ " + (result.message || "Registration failed."));
      }
    } catch {
      alert("❌ Network/server error.");
    }
  });
});
