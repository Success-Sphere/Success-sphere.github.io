<?php
$host = '127.0.0.1';      // or ''
$username = 'XAMPP';       // your MySQL username (default for /WAMP is 'root')
$password = '';           // your MySQL password (default is empty)
$database = 'success_sphere'; // replace with your database name

$conn = mysqli_connect($host, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
?>
