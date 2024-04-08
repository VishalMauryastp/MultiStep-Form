<?php

$jsonData = file_get_contents("php://input");


$bookingData = json_decode($jsonData, true);


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "booking_system";


$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL query
$sql = "INSERT INTO bookings(name, email, phone, guests, date, time, location, EventName, decoration, decorationDetails, cakes, gifts) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";


// Execute SQL query
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "sssiisssssss",
    $bookingData['name'],
    $bookingData['email'],
    $bookingData['phone'],
    $bookingData['guests'],
    $bookingData['date'],
    $bookingData['time'],
    $bookingData['location'],
    $bookingData['EventName'],
    $bookingData['decoration'],
    $bookingData['decorationDetails'],
    implode(", ", $bookingData['cakes']), // Convert cakes array to string
    implode(", ", $bookingData['gifts']) // Convert gifts array to string
);

if ($stmt->execute()) {
    echo "Booking saved successfully";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();
