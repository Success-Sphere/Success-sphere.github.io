fetch("/api/session", {
  method: "GET",
  credentials: "include", // ✅ Important: includes any cookies
})
  .then((res) => res.json())
  .then((data) => {
    const userName = document.getElementById("user-name");
    const userInitial = document.getElementById("user-initial");
    const content = document.getElementById("dashboard-content");

    if (data.fullName) {
      if (userName) userName.innerText = data.fullName;
      if (userInitial) userInitial.innerText = data.fullName[0].toUpperCase();
      if (content) {
        content.innerHTML = `
          <h2>Welcome back, ${data.fullName} 👋</h2>
          <p>This is your personalized dashboard.</p>
        `;
      }
    } else {
      showGuestFallback();
    }
  })
  .catch(showGuestFallback);

function showGuestFallback() {
  const userName = document.getElementById("user-name");
  const userInitial = document.getElementById("user-initial");
  const content = document.getElementById("dashboard-content");

  if (userName) userName.innerText = "Guest";
  if (userInitial) userInitial.innerText = "G";
  if (content) {
    content.innerHTML = `
      <h2>You are not logged in.</h2>
      <p><a href="login.html">Click here to log in.</a></p>
    `;
  }
}
