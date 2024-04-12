<?php
// Get the JSON data sent from JavaScript
$jsonData = file_get_contents('php://input');
// Decode JSON to PHP array
$data = json_decode($jsonData, true);
// Process the data or do whatever you want with it
// For example, print the received data
print_r($data);
?>



print_r($_POST);