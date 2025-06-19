<?php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $fullname = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Validation
    if ($password !== $confirm_password) {
        echo "<script>alert('Passwords do not match.'); window.history.back();</script>";
        exit();
    }

    // Hash the password
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    // Insert user into DB
    $stmt = $conn->prepare("INSERT INTO users (fullname, email, phone, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullname, $email, $phone, $hashed_password);

    if ($stmt->execute()) {
        echo "<script>
            alert('✅ Registration successful!');
            localStorage.setItem('ssphere_user', JSON.stringify({ firstName: '" . explode(' ', $fullname)[0] . "' }));
            window.location.href = 'dashboard.html';
        </script>";
    } else {
        echo "❌ Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request.";
}
?>
