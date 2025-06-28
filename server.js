const express = require("express"),
  path = require("path"),
  app = express(),
  PORT = 3e3;
app.use(express.static(path.join(__dirname, "public"))),
  app.use(express.static(__dirname)),
  app.get("/", (e, s) => {
    s.sendFile(path.join(__dirname, "index.html"));
  }),
  app.get("/api/users", (e, s) => {
    s.json([{ name: "Test User", email: "test@domain.com" }]);
  }),
  app.use((e, s) => {
    s.status(404).send("404: Cannot GET " + e.url);
  }),
  app.listen(3e3, () =>
    console.log("Server listening on http://localhost:3000")
  );
