<?php

$name = $_POST['name']; 
$visitor_email = $_POST['email']; 
$subject = $_POST['subject']; 
$message = $_POST['message']; 

$email_from = 'regurgitatedAI@miibty.com'; 
$email_subject = 'New Form Submission'; 
$email_body =   "User Name: $name.\n". 
                "User Email: $visitor_email.\n".
                "Subject: $subject.\n".
                "Message: $message.\n"; 

$to = 'regurgitatedAI@miibty.com'
$headers = "From: $email_from \r\n"; 
$headers . = "Reply-to: $visitor_email"

mail($to, $email_subject, $email_body, $headers)
header("Location: contact.html"); 
?>
