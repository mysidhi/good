<?php
include "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $email    = mysqli_real_escape_string($conn, $_POST['email']);
    $password = $_POST['password'];

    // Password hashing (important)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Check email exists
    $check = "SELECT id FROM users WHERE email='$email'";
    $result = mysqli_query($conn, $check);

    if (mysqli_num_rows($result) > 0) {
        echo "Email already registered";
        exit;
    }

    $sql = "INSERT INTO users (username, email, password) 
            VALUES ('$username', '$email', '$hashedPassword')";

    if (mysqli_query($conn, $sql)) {
        echo "Signup successful";
    } else {
        echo "Error: " . mysqli_error($conn);
    }
}
?>
