CREATE DATABASE booking_system;

USE booking_system;

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15),
    guests INT,
    date DATE,
    time VARCHAR(50),
    location VARCHAR(255),
    EventName VARCHAR(255),
    decoration VARCHAR(255),
    decorationDetails VARCHAR(255),
    cakes TEXT,
    gifts TEXT
);
