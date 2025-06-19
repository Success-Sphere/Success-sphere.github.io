<?php
include('db.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = trim($_POST['email']);
    $password = $_POST['password'];

    // Get user by email
    $stmt = $conn->prepare("SELECT fullname, password FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows == 1) {
        $stmt->bind_result($fullname, $hashed_password);
        $stmt->fetch();

        if (password_verify($password, $hashed_password)) {
            $firstName = explode(' ', $fullname)[0];
            echo "<script>
                alert('✅ Login successful!');
                localStorage.setItem('ssphere_user', JSON.stringify({ firstName: '$firstName' }));
                window.location.href = 'dashboard.html';
            </script>";
        } else {
            echo "<script>alert('❌ Incorrect password.'); window.history.back();</script>";
        }
    } else {
        echo "<script>alert('❌ No user found with that email.'); window.history.back();</script>";
    }

    $stmt->close();
    $conn->close();
} else {
    echo "Invalid request.";
}
?>
