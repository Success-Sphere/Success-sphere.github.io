const express = require("express"),
  mysql = require("mysql2"),
  path = require("path"),
  bodyParser = require("body-parser"),
  bcrypt = require("bcrypt"),
  app = express(),
  PORT = 3e3,
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:
      "GHHJghjgYT&T&*h%^*%^6oVHGT&D%$etybHUTUGHIT*jNKHGT&RR^EYyigURUYUhuiyWREGRNCDWRES@RDFYT%D$ERDFHGUG&^FYERDFGHJKLIHUYTHJOLI):P(",
    database: "success_sphere",
  });
(app.post("/api/logout", (e, s) => {
  s.status(200).send("Logged out");
}),
  db.connect((e) => {
    (e && (console.error("MySQL connection failed:", e), process.exit(1)),
      console.log("✅ Connected to MySQL"));
  }),
  app.use(express.static(__dirname)),
  app.use(bodyParser.urlencoded({ extended: !0 })),
  app.use(express.json()),
  app.get("/", (e, s) => s.sendFile(path.join(__dirname, "index.html"))),
  app.get("/register", (e, s) =>
    s.sendFile(path.join(__dirname, "register.html")),
  ),
  app.get("/login", (e, s) => s.sendFile(path.join(__dirname, "login.html"))),
  app.get("/dashboard", (e, s) =>
    s.sendFile(path.join(__dirname, "dashboard.html")),
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
        s.send("✅ Registration successful. Redirecting to Dashboard...");
      },
    );
  }),
  app.post("/login", (e, s) => {
    const { email: a, password: o } = e.body;
    db.query("SELECT * FROM users WHERE email = ?", [a], async (e, a) =>
      e
        ? s.status(500).send("❌ Login error: " + e.message)
        : 0 === a.length
          ? s.status(401).send("❌ Invalid email or password.")
          : (await bcrypt.compare(o, a[0].password))
            ? void s.send(
                '\n        <p>✅ Login successful. Redirecting…</p>\n        <script>\n          window.location.href = "/dashboard?login=success";\n        <\/script>\n      ',
              )
            : s.status(401).send("❌ Invalid email or password."),
    );
  }),
  app.listen(3e3, () => {
    console.log("🌐 Server running at http://localhost:3000");
  }));
