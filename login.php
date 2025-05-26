<?php
require 'vendor/autoload.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'edumaster201345@gmail.com';
        $mail->Password = 'bcai cqgb dovk mwuu';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        $mail->setFrom('edumaster201345@gmail.com', 'Success Sphere');
        $mail->addAddress($email);

        $mail->isHTML(true);
        $mail->Subject = 'Login Notification';
        $mail->Body = "Hello,<br><br>A login attempt was made to your account. If this was you, no action is needed.<br><br>If this wasn't you, please reset your password.<br><br>Regards,<br>Success Sphere Team";

        $mail->send();
        echo "✅ Login successful. Notification sent to $email.";
    } catch (Exception $e) {
        echo "❌ Could not send login email. Error: {$mail->ErrorInfo}";
    }
}
?>
