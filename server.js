import express from "express";
import mysql from "mysql2";
import cors from "cors";
const app = express(),
  PORT = 3e3,
  db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password:
      "GHHJghjgYT&T&*h%^*%^6oVHGT&D%$etybHUTUGHIT*jNKHGT&RR^EYyigURUYUhuiyWREGRNCDWRES@RDFYT%D$ERDFHGUG&^FYERDFGHJKLIHUYTHJOLI):P(",
    database: "success_sphere",
  });
db.connect((s) => {
  if (s) throw s;
}),
  app.use(cors()),
  app.use(express.json()),
  app.use(express.static(".")),
  app.post("/login", (s, e) => {
    const { email: o, password: r } = s.body;
    db.query(
      "SELECT fullName, email FROM users WHERE email = ? AND password = ?",
      [o, r],
      (s, o) => {
        if (s)
          return e
            .status(500)
            .json({ success: !1, message: "Database error." });
        if (0 === o.length)
          return e
            .status(401)
            .json({ success: !1, message: "Invalid credentials." });
        const r = o[0];
        e.json({ success: !0, user: r });
      }
    );
  }),
  app.post("/register", (s, e) => {
    const { fullName: o, email: r, phone: a, password: t } = s.body;
    db.query(
      "INSERT INTO users (fullName, email, phone, password) VALUES (?, ?, ?, ?)",
      [o, r, a, t],
      (s, o) => {
        if (s)
          return "ER_DUP_ENTRY" === s.code
            ? e
                .status(400)
                .json({ success: !1, message: "User already exists." })
            : e
                .status(500)
                .json({ success: !1, message: "Registration failed." });
        e.json({ success: !0 });
      }
    );
  }),
  app.post("/api/logout", (s, e) => {
    e.json({ success: !0 });
  }),
  app.listen(3e3, () => {
    console.log("Server running on http://localhost:3000");
  });
