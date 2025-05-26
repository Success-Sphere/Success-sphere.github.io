<?php
require 'vendor/autoload.php';
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';  // Replace with your SMTP server
    $mail->SMTPAuth   = true;
    $mail->Username   = 'edumaster201345@gmail.com';    // SMTP username
    $mail->Password   = 'bcai cqgb dovk mwuu';      // SMTP password
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    //Recipients
    $mail->setFrom('edumaster201345@gmail.com', 'Success Sphere');
    $mail->addAddress($_POST['email'], $_POST['fullname']); 

    // Content
    $mail->isHTML(true);
    $mail->Subject = 'Registration Confirmation - Success Sphere';
    $mail->Body    = 'Thank you for registering with Success Sphere. <br><br>We are excited to have ' . htmlspecialchars($_POST['fullname']) . ' on board!<br><br> Here are your Credentials: (email: ' . htmlspecialchars($_POST['email']) . ', password: ' . htmlspecialchars($_POST['password']) . ')<br><br> Here are our available plans:<br>
    <ul>
        <li><strong>Basic Plan (₹25):</strong> 10GB Space, 3 Domains, 20 Emails, No Live Support</li>
        <li><strong>Standard Plan (₹50):</strong> 50GB Space, 5 Domains, Unlimited Emails, No Live Support</li>
        <li><strong>Premium Plan (₹100):</strong> Unlimited Space, 30 Domains, Unlimited Emails, Live Support</li>
    </ul>
    <br>Feel free to reach out if you have any questions or need assistance.<br><br><br>Thanks and Regards,<br>Success Sphere Team';

    $mail->send();
    echo '✅ Message has been sent to ' . htmlspecialchars($_POST['email']) . '!';
    // Optionally, you can redirect to a success page or display a success message
} catch (Exception $e) {
    echo "❌ Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>

