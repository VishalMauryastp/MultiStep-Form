<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entries Page</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="https://cdn.tailwindcss.com"></script>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }
    </style>
</head>

<body>

    <h2>Entries</h2>

    <table id="entriesTable">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Guests</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location </th>
            <th>Event Name</th>
            <th>Decoration</th>
            <th>Decoration Details</th>
            <th>Cakes</th>
            <th>Gifts</th>
        </tr>
    </table>

    <script>
        function reverseDateFormat(dateString) {
            const day = dateString.slice(0, 2);
            const month = dateString.slice(2, 4);
            const year = dateString.slice(4, 8);

            return `${year}-${month}-${day}`;
        }

        <?php
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "booking_system";

        $conn = new mysqli($servername, $username, $password, $dbname);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM bookings";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $date = $row["date"];
                echo "addEntryToTable(" . json_encode($row) . ");\n";
            }
        } else {
            echo "console.log('0 results');";
        }

        $conn->close();
        ?>

        function addEntryToTable(rowData) {
            const table = document.getElementById("entriesTable");
            const row = table.insertRow();

            const date = reverseDateFormat(rowData.date);

            row.innerHTML = `
            <td>${rowData.name}</td>
            <td>${rowData.email}</td>
            <td>${rowData.phone}</td>
            <td>${rowData.guests}</td>
            <td>${date}</td>
            <td class="w-fit">${rowData.time}</td>
            <td>${rowData.location}</td>
            <td>${rowData.EventName}</td>
            <td>${rowData.decoration}</td>
            <td>${rowData.decorationDetails}</td>
            <td>${rowData.cakes}</td>
            <td>${rowData.gifts}</td>
        `;
        }
    </script>

</body>

</html>