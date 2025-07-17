fetch("/api/session", {
  headers: {
    Authorization: `Bearer ${document.cookie.replace("token=", "")}`,
  },
})
  .then((res) => res.json())
  .then((data) => {
    if (data.fullName) {
      document.getElementById("user-name").innerText = data.fullName;
    } else {
      window.location.href = "login.html";
    }
  })
  .catch(() => {
    window.location.href = "login.html";
  });
