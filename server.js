const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password:
    "GHHJghjgYT&T&*h%^*%^6oVHGT&D%$etybHUTUGHIT*jNKHGT&RR^EYyigURUYUhuiyWREGRNCDWRES@RDFYT%D$ERDFHGUG&^FYERDFGHJKLIHUYTHJOLI):P(", // change if needed
  database: "success_sphere",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Serve HTML pages
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

// Register POST handler
app.post("/register", (req, res) => {
  const { fullName, email, phone, password, confirm_password } = req.body;
  if (password !== confirm_password) {
    return res.send("❌ Passwords do not match.");
  }

  const sql =
    "INSERT INTO users (fullName, email, phone, password) VALUES (?, ?, ?, ?)";
  db.query(sql, [fullName, email, phone, password], (err) => {
    if (err) {
      return res.send("❌ Registration failed: " + err.message);
    }
    res.send(
      "✅ Registration successful. <a href='/dashboard'>Go to Dashboard</a>"
    );
  });
});

// Login POST handler
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.send("❌ Login error: " + err.message);
    if (results.length === 0) return res.send("❌ Invalid email or password.");

    const user = results[0];
    res.send(`
        <p>✅ Registration successful. Redirecting to dashboard...</p>
        <script>
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        </script>
      `);
  });
});

// Fallback route
app.use((req, res) => {
  res.status(404).send("404: Page not found");
});

app.listen(PORT, () => {
  console.log("🌐 Server running on http://localhost:" + PORT);
});
