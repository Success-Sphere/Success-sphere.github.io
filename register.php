<?php
// Start session
session_start();

// Database connection
$host = "localhost";
$user = "root";
$password = "";
$dbname = "edumasterpro";

$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Handle registration form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Sanitize input
  $name = trim($_POST["name"]);
  $email = trim($_POST["email"]);
  $password = trim($_POST["password"]);
  $confirm_password = trim($_POST["confirm_password"]);

  // Validate inputs
  if (empty($name) || empty($email) || empty($password)) {
    $_SESSION['error'] = "All fields are required.";
    header("Location: ../register.html");
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $_SESSION['error'] = "Invalid email format.";
    header("Location: ../register.html");
    exit;
  }

  if ($password !== $confirm_password) {
    $_SESSION['error'] = "Passwords do not match.";
    header("Location: ../register.html");
    exit;
  }

  // Check if email already exists
  $stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows > 0) {
    $_SESSION['error'] = "Email already registered.";
    header("Location: ../register.html");
    exit;
  }
  $stmt->close();

  // Hash password
  $hashed_password = password_hash($password, PASSWORD_DEFAULT);

  // Insert user
  $stmt = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $name, $email, $hashed_password);

  if ($stmt->execute()) {
    $_SESSION['success'] = "Registration successful! You can now log in.";
    header("Location: ../login.html");
  } else {
    $_SESSION['error'] = "Registration failed. Please try again.";
    header("Location: ../register.html");
  }

  $stmt->close();
  $conn->close();
} else {
  header("Location: ../register.html");
}
?>
