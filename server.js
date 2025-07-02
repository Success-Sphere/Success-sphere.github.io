const express = require("express"),
  mysql = require("mysql2"),
  path = require("path"),
  bodyParser = require("body-parser"),
  bcrypt = require("bcrypt"),
  app = express(),
  PORT = 3000,
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:
      "GHHJghjgYT&T&*h%^*%^6oVHGT&D%$etybHUTUGHIT*jNKHGT&RR^EYyigURUYUhuiyWREGRNCDWRES@RDFYT%D$ERDFHGUG&^FYERDFGHJKLIHUYTHJOLI):P(",
    database: "success_sphere",
  });
db.connect((e) => {
  e && (console.error("MySQL connection failed:", e), process.exit(1)),
    console.log("✅ Connected to MySQL");
}),
  app.use(express.static(__dirname)),
  app.use(bodyParser.urlencoded({ extended: !0 })),
  app.use(express.json()),
  app.get("/", (e, s) => s.sendFile(path.join(__dirname, "index.html"))),
  app.get("/register", (e, s) =>
    s.sendFile(path.join(__dirname, "register.html"))
  ),
  app.get("/login", (e, s) => s.sendFile(path.join(__dirname, "login.html"))),
  app.get("/dashboard", (e, s) =>
    s.sendFile(path.join(__dirname, "dashboard.html"))
  ),
  app.get("/about", (e, s) => s.sendFile(path.join(__dirname, "about.html"))),
  app.post("/register", (e, s) => {
    const {
      fullName: a,
      email: o,
      phone: r,
      password: t,
      confirm_password: n,
    } = e.body;
    if (t !== n) return s.status(400).send("❌ Passwords do not match.");
    db.query(
      "INSERT INTO users (fullName, email, phone, password) VALUES (?, ?, ?, ?)",
      [a, o, r, t],
      (e) => {
        if (e)
          return s.status(500).send("❌ Registration failed: " + e.message);
        s.send("✅ Registration successful");
      }
    );
  }),
  app.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) return res.status(500).send("❌ Login error: " + err.message);
        if (results.length === 0)
          return res.status(401).send("❌ Invalid email or password.");

        const match = await bcrypt.compare(password, results[0].password);
        if (!match)
          return res.status(401).send("❌ Invalid email or password.");

        // ✅ Fixed redirect with query param
        res.send(`
        <p>✅ Login successful. Redirecting…</p>
        <script>
          window.location.href = "/dashboard?login=success";
        </script>
      `);
      }
    );
  });
