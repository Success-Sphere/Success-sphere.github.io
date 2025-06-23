<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = 'GHHJghjgYT&T&*h%^*%^6oVHGT&D%$etybHUTUGHIT*jNKHGT&RR^EYyigURUYUhuiyWREGRNCDWRES@RDFYT%D$ERDFHGUG&^FYERDFGHJKLIHUYTHJOLI):P(';
$dbname = "success_sphere";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

// Sanitize and receive POST data
$fullname = trim($_POST['fullname']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$password = $_POST['password'];
$confirm_password = $_POST['confirm_password'];

// Basic validation
if (empty($fullname) || empty($email) || empty($phone) || empty($password)) {
  die("All fields are required.");
}

if ($password !== $confirm_password) {
  die("Passwords do not match.");
}

// Hash password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO users (fullname, email, phone, password) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $fullname, $email, $phone, $hashed_password);

// Execute and respond
if ($stmt->execute()) {
  echo "<script>
    alert('Registration successful! Redirecting to dashboard...');
    localStorage.setItem('ssphere_name', JSON.stringify({ fullname: '$fullname' }));
    localStorage.setItem('ssphere_email', JSON.stringify({ email: '$email' }));
    window.location.href = 'dashboard.html';
  </script>";
} else {
  echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
