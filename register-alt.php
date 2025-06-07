<?php
session_start();
$filename = 'user.json';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<pre>";
    print_r($_POST);
    echo "</pre>";

    $fullname = $_POST['fullname'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $password = $_POST['password'] ?? '';
    $confirm_password = $_POST['confirm_password'] ?? '';

    if (!$fullname || !$email || !$phone || !$password || !$confirm_password) {
        echo json_encode(["success" => false, "message" => "All fields are required."]);
        exit;
    }

    // You can now safely use these variables.
    echo json_encode(["success" => true]);
}

$users = [];

if (file_exists($filename)) {
    $json = file_get_contents($filename);
    $users = json_decode($json, true);
}

// Check if email already exists
foreach ($users as $user) {
    if ($user['email'] === $email) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }
}

$users[] = [
    'fullname' => $fullname,
    'email' => $email,
    'phone' => $phone,
    'password' => $password
];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (!isset($_POST['email'])) {
        echo json_encode(["success" => false, "message" => "Email is missing"]);
        exit;
    }

    $email = $_POST['email'];
    // rest of your registration logic
}

echo '<pre>';
print_r($_POST);
echo '</pre>';

file_put_contents($filename, json_encode($users, JSON_PRETTY_PRINT));
$_SESSION['user'] = $fullname;
echo json_encode(['success' => true]);
?>
