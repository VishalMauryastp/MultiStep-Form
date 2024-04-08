<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "booking_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM bookings";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Initialize an empty array to store the results
    $entries = array();

    // Fetch each row and add it to the entries array
    while ($row = $result->fetch_assoc()) {
        $entries[] = $row;
    }

    // Convert the array to JSON and output it
    echo json_encode($entries);
} else {
    echo json_encode(array()); // Return an empty array if no results
}

$conn->close();
