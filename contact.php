<?php
// Set your email address where you want to receive emails
$to = 'malik.axif0124@gmail.com';

// Get form data
$name = isset($_POST['name']) ? htmlspecialchars(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$subject = isset($_POST['subject']) ? htmlspecialchars(trim($_POST['subject'])) : '';
$message = isset($_POST['message']) ? htmlspecialchars(trim($_POST['message'])) : '';

// Validate inputs
$errors = [];

if (empty($name)) {
    $errors[] = 'Name is required';
}

if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}

if (empty($subject)) {
    $errors[] = 'Subject is required';
}

if (empty($message)) {
    $errors[] = 'Message is required';
}

// If no errors, send email
if (empty($errors)) {
    // Email headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    // Email content
    $email_content = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #47b2e4; color: white; padding: 10px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; }
            .footer { margin-top: 20px; font-size: 12px; color: #777; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>New Contact Form Submission</h2>
            </div>
            <div class='content'>
                <p><strong>Name:</strong> $name</p>
                <p><strong>Email:</strong> $email</p>
                <p><strong>Subject:</strong> $subject</p>
                <p><strong>Message:</strong></p>
                <p>$message</p>
            </div>
            <div class='footer'>
                <p>This email was sent from your website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Send email
    $mail_sent = mail($to, $subject, $email_content, $headers);
    
    // Return response
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Thank you! Your message has been sent.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Oops! Something went wrong. Please try again later.']);
    }
} else {
    // Return errors
    echo json_encode(['success' => false, 'message' => 'Please fix the following errors:', 'errors' => $errors]);
}
?>