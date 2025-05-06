<?php
// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Collect and sanitize input
  $name = htmlspecialchars(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $subject = htmlspecialchars(trim($_POST["subject"]));
  $message = htmlspecialchars(trim($_POST["message"]));

  // Validate
  if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo "Please fill in all fields.";
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format.";
    exit;
  }

  // Email settings
  $to = "ayoneteicha@gmail.com"; 
  $email_subject = "New Contact Form Message: $subject";
  $email_body = "You have received a new message from your website contact form.\n\n" .
                "Name: $name\nEmail: $email\n\nMessage:\n$message";
  $headers = "From: noreply@yourdomain.com\n"; 
  $headers .= "Reply-To: $email";

  // Send the email
  if (mail($to, $email_subject, $email_body, $headers)) {
    echo "Message sent successfully!";
  } else {
    echo "Sorry, something went wrong. Try again later.";
  }
} else {
  echo "Invalid request.";
}
?>
