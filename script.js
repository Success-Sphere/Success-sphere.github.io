function toggleSidebar() {
  document.getElementById("mobileSidebar").classList.toggle("open");
}
function untoggleSidebar() {
  document.getElementById("mobileSidebar").classList.remove("open");
}
function handleCredentialResponse(e) {
  const t = jwt_decode(e.credential);
  (localStorage.setItem("user", JSON.stringify(t)),
    showUserProfile(),
    (window.location.href = "index.html"));
}
(document.querySelectorAll(".sidebar a").forEach((e) => {
  e.addEventListener("click", () => {
    toggleSidebar();
  });
}),
  document.addEventListener("click", (e) => {
    const t = document.getElementById("mobileSidebar"),
      o = document.querySelector(".topbar");
    t &&
      !t.contains(e.target) &&
      !o.contains(e.target) &&
      t.classList.contains("open") &&
      t.classList.remove("open");
  }),
  (window.onload = showUserProfile),
  document.addEventListener("keydown", (e) => {
    "Escape" === e.key &&
      document.getElementById("mobileSidebar").classList.remove("open");
  }),
  document.querySelectorAll("a[href^='#']").forEach((e) => {
    e.addEventListener("click", function (e) {
      e.preventDefault();
      const t = document.querySelector(this.getAttribute("href"));
      t && t.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }),
  document.querySelectorAll(".btn").forEach((e) => {
    (e.addEventListener("mouseover", () => {
      e.style.transform = "scale(1.05)";
    }),
      e.addEventListener("mouseout", () => {
        e.style.transform = "scale(1)";
      }));
  }));
const heroButton = document.querySelector(".hero .btn");
(heroButton &&
  (heroButton.addEventListener("mouseover", () => {
    heroButton.style.boxShadow = "0px 10px 20px rgba(0, 0, 0, 0.2)";
  }),
  heroButton.addEventListener("mouseout", () => {
    heroButton.style.boxShadow = "none";
  })),
  document.querySelectorAll("form").forEach((e) => {
    e.addEventListener("submit", (t) => {
      const o = e.querySelectorAll("input[required]");
      for (let e of o)
        if (!e.value.trim())
          return (
            t.preventDefault(),
            alert("Please fill in all required fields."),
            void e.focus()
          );
    });
  }));
const settingsButton = document.querySelector("#settings-btn"),
  settingsPanel = document.querySelector("#settings-panel");
settingsButton &&
  settingsPanel &&
  settingsButton.addEventListener("click", function () {
    settingsPanel.classList.toggle("active");
  });
const courseModal = document.querySelector("#course-modal"),
  courseDetailsBtns = document.querySelectorAll(".course-details-btn"),
  closeModalBtn = document.querySelector("#close-modal-btn");
courseDetailsBtns &&
  courseModal &&
  closeModalBtn &&
  (courseDetailsBtns.forEach((e) => {
    e.addEventListener("click", function () {
      const e = this.getAttribute("data-title"),
        t = this.getAttribute("data-description");
      ((courseModal.querySelector(".modal-title").innerText = e),
        (courseModal.querySelector(".modal-description").innerText = t),
        courseModal.classList.add("active"));
    });
  }),
  closeModalBtn.addEventListener("click", function () {
    courseModal.classList.remove("active");
  }));
