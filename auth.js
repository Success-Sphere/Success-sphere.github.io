// --- Firebase Initialization (you already have this) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

// Firebase config (your values)
const firebaseConfig = {
  apiKey: "AIzaSyAr06yo3hUeGDsgtp_g3VwHyqLvdScYcRw",
  authDomain: "successsphere-b1559.firebaseapp.com",
  projectId: "successsphere-b1559",
  storageBucket: "successsphere-b1559.firebasestorage.app",
  messagingSenderId: "128589606608",
  appId: "1:128589606608:web:0c4b9f5e503957947278d5",
  measurementId: "G-C6LCK9KEHP",
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.handleCredentialResponse = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("ssphere_user", JSON.stringify(user));
    window.location.href = "dashboard.html"; // ✅ on success
  } catch (error) {
    console.error("Login failed:", error);
    alert("Google Sign-In failed.");
    window.location.href = "index.html"; // ✅ on failure
  }
};
// --- Logout Function ---
window.logout = function () {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("ssphere_user");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Logout error:", error);
    });
};

// --- Auth Guard (for dashboard.html) ---
if (window.location.pathname.endsWith("dashboard.html")) {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html"; // not logged in
    } else {
      const infoBox = document.createElement("div");
      infoBox.className = "user-info";
      infoBox.innerHTML = `
        <p>Welcome, ${user.displayName}</p>
        <p>Email: ${user.email}</p>
        <button onclick="logout()">Logout</button>
      `;
      document.body.prepend(infoBox);
    }
  });
}
