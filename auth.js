document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Login successful");
        window.location.href = "dashboard.html";
      } else {
        alert(`❌ ${data.message}`);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Registration successful");
        window.location.href = "login.html";
      } else {
        alert(`❌ ${data.message}`);
      }
    });
  }
});
