<?php
$host = "localhost";
$username = "root";
$password = "hjxfsdcvtzyxcshdgcuyscbsyu@@*&@&ncxvkjgzdbvhvdvh";
$database = "successsphere";

$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die("❌ Database connection failed: " . mysqli_connect_error());
}

mysqli_set_charset($conn, "utf8");
?>
