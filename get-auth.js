fetch("/api/session", {
  headers: {
    Authorization: `Bearer ${document.cookie.replace("token=", "")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    const userSpan = document.getElementById("user-name");
    if (!userSpan) return;
    if (data.fullName) {
      userSpan.innerText = data.fullName;
    } else {
      userSpan.innerText = "Guest";
    }
  })
  .catch(() => {
    const userSpan = document.getElementById("user-name");
    if (userSpan) userSpan.innerText = "Guest";
  });
then((data) => {
  if (data.fullName) {
    document.getElementById("user-name").innerText = data.fullName;
  } else {
    document.getElementById("user-name").innerText = "Guest"; // ✅ No redirect
  }
}).catch(() => {
  const userNameElement = document.getElementById("user-name");
  if (userNameElement) userNameElement.innerText = "Guest";
});
