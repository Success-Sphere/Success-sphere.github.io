<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "youremail@example.com"; // replace with your email or admin recipient
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $subject = htmlspecialchars($_POST["subject"]);
    $message = htmlspecialchars($_POST["message"]);

    $full_subject = "New Inquiry: $subject";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $courseInfo = "
      <h3>Thank you for contacting Success Sphere!</h3>
      <p>Here are our available plans:</p>
      <ul>
        <li><strong>Basic Plan ($25):</strong> Class Nursery to Class 5, 3 Domains, 20 Emails, No Live Support</li>
        <li><strong>Standard Plan ($50):</strong> Class 6 to Class 10, 5 Domains, Unlimited Emails, No Live Support</li>
        <li><strong>Premium Plan ($100):</strong> Class 11 to Class 12, Unlimited Domains, Unlimited Emails, Live Support</li>
      </ul>
    ";

    $body = "
      <html>
      <body>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Subject:</strong> $subject</p>
        <p><strong>Message:</strong><br/>$message</p>
        <hr>
        $courseInfo
      </body>
      </html>
    ";

    if (mail($to, $full_subject, $body, $headers)) {
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again later.";
    }
}
?>
