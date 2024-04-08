<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bookings Details</title>
    <link rel="stylesheet" href="style.css">
    <script defer src="https://cdn.tailwindcss.com"></script>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
            /* Add some space between tables */
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

        .date-header {
            font-weight: bold;
            text-align: center;
        }
    </style>
</head>

<body>
    <div class="px-2 py-4 md:p-8">
        <h2 class="text-2xl md:text-5xl">Bookings</h2>
        <div id="tablesContainer" class="mt-8 overflow-x-auto"></div>
    </div>

    <script>
        function reverseDateFormat(dateString) {
            const day = dateString.slice(0, 2);
            const month = dateString.slice(2, 4);
            const year = dateString.slice(4, 8);
            return `${year}-${month}-${day}`;
        }

        function fetchEntries() {
            fetch('fetch_entries.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const dates = new Set(data.map(row => row.date));
                    dates.forEach(date => {
                        const entriesForDate = data.filter(row => row.date === date);
                        createTableForDate(date, entriesForDate);
                    });
                })
                .catch(error => console.error('Error fetching entries:', error));
        }

        function createTableForDate(date, entries) {
            const container = document.getElementById('tablesContainer');
            const table = document.createElement('table');
            table.classList.add("max-xl:w-[1440px]")
            table.innerHTML = `
                <tr>
                    <th colspan="12" class="date-header">${reverseDateFormat(date)}</th>
                </tr>
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
                    
                    <th>Cakes</th>
                    <th>Gifts</th>
                </tr>
            `;
            entries.forEach(rowData => addEntryToTable(rowData, table));
            container.appendChild(table);
        }

        function addEntryToTable(rowData, table) {
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
                <td>${rowData.eventName||rowData.decorationDetails}</td>
                <td>${rowData.decoration}</td>
               
                <td>${rowData.cakes}</td>
                <td>${rowData.gifts}</td>
            `;
        }

        // Fetch entries when the page loads
        document.addEventListener('DOMContentLoaded', fetchEntries);
    </script>

</body>

</html>