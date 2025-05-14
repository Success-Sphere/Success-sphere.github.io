<?php
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

// Handle login form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $email = trim($_POST["email"]);
  $password = trim($_POST["password"]);

  // Validate input
  if (empty($email) || empty($password)) {
    $_SESSION['error'] = "Please fill in all fields.";
    header("Location: ../login.html");
    exit;
  }

  // Fetch user from database
  $stmt = $conn->prepare("SELECT id, name, password FROM users WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows === 1) {
    $stmt->bind_result($user_id, $user_name, $hashed_password);
    $stmt->fetch();

    // Verify password
    if (password_verify($password, $hashed_password)) {
      $_SESSION['user_id'] = $user_id;
      $_SESSION['user_name'] = $user_name;
      header("Location: ../index.html"); // or dashboard.html
      exit;
    } else {
      $_SESSION['error'] = "Invalid password.";
      header("Location: ../login.html");
      exit;
    }
  } else {
    $_SESSION['error'] = "No account found with that email.";
    header("Location: ../login.html");
    exit;
  }

  $stmt->close();
  $conn->close();
} else {
  header("Location: ../login.html");
}
?>
