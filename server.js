// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, "public")));

// Root route
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API route example
app.get("/api/users", (req, res) => {
  // Fetch from DB later...
  res.json([{ name: "Test User", email: "test@domain.com" }]);
});

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).send("404: Cannot GET " + req.url);
});

// Start server
app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
