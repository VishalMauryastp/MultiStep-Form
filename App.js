const BookedData = [];
let currentStep = 1;
const form = document.getElementById("bookingForm");

const cakeOptions = [
  {
    name: "Black Forest Cake",
    imageUrl: "./public/Black Forest Cake (500).png",
  },
  {
    name: "Butterscotch Cake",
    imageUrl: "./public/Butterscotch Cake (500).png",
  },
  {
    name: "Chocolate Cake",
    imageUrl: "./public/Chocolate Cake (500).png",
  },
  {
    name: "Pineapple Cake",
    imageUrl: "./public/Pineapple Cake (500).png",
  },
  {
    name: "Round Red Velvet Cake",
    imageUrl: "./public/Round Red Velvet Cake (600).png",
  },
  {
    name: "Blueberry Cake",
    imageUrl: "./public/Blueberry Cake (600).png",
  },
  {
    name: "Mango Cake",
    imageUrl: "./public/Mango Cake (600).png",
  },
  {
    name: "Heart Red Velvet Cake",
    imageUrl: "./public/Heart Red Velvet Cake (700).png",
  },
  {
    name: "Death by chocolate Cake",
    imageUrl: "./public//Death by chocolate Cake (700).png",
  },
  {
    name: "Choco Almond Cake",
    imageUrl: "./public/Choco Almond Cake (750).png",
  },
  {
    name: "Heart Pinata Cake",
    imageUrl: "./public/Heart Pinata Cake (850).png",
  },
];
const cakeOptionsContainer = document.getElementById("cakeOptionsContainer");

function generateCakeOptions() {
  cakeOptionsContainer.innerHTML = cakeOptions
    .map(
      (cake, index) => `
      <label for="cakeOption${index + 1}">
      <input
        type="checkbox"
        id="cakeOption${index + 1}"
        name="cake"
        value="${cake.name}"
      />
      <img  class="w-[50%] mx-auto" src="${cake.imageUrl}" alt="" />
      <p class="mt-1 text-center">${cake.name}</p>
    </label>
  `
    )
    .join("");
}
generateCakeOptions();

function nextStep() {
  document.getElementById(`step${currentStep}`).style.display = "none";
  currentStep++;
  document.getElementById(`step${currentStep}`).style.display = "block";
}

function prevStep() {
  document.getElementById(`step${currentStep}`).style.display = "none";
  currentStep--;
  document.getElementById(`step${currentStep}`).style.display = "block";
}

function createTimeSlotButtons() {
  if (window.location.pathname.includes("vip")) {
    var timeSlots = [
      "09:30 AM to 12:30 PM  ",
      "01:00 PM to 04:00 PM",
      "05:00 PM to 06:00 PM",
      "06:30 PM to 09:30 PM",
      "10:30 PM to 01:00 PM",
    ];
  } else {
    var timeSlots = [
      "09:00 AM to 12:00 PM  ",
      "12:30 PM to 03:30 PM",
      "04:30 PM to 05:30 PM",
      "06:00 PM to 09:00 PM",
      "09:30 PM to 12:30 PM",
    ];
  }

  const selectedDate = formatDateStringForMySQL(
    document.getElementById("date").value
  );
  const bookingsForDate = BookedData.filter(
    (booking) => booking.date === selectedDate
  );
  // console.log(bookingsForDate);

  const timeSlotsContainer = document.getElementById("timeSlots");

  const buttonsHTML = timeSlots
    .map((slot, i) => {
      const isBooked = bookingsForDate.some((booking) => booking.time === slot);
      // console.log(isBooked);

      const borderColor = isBooked
        ? "border-4 border-red-500"
        : "border-4 border-green-500";

      const isDisabled = isBooked ? "disabled" : "";

      return `
        <button 

        id="timeSlots${i}"
          class="bg-white text-[12px] ${borderColor} flex-grow md:flex-[0_0_200px] text-black px-4 py-2 rounded shadow focus:outline-none"
          ${isDisabled}
          onclick="selectTime(this, '${slot}')"
        >
          ${slot}
        </button>
      `;
    })
    .join("");

  timeSlotsContainer.innerHTML = buttonsHTML;
}

let selectedTime = "";

// Function to handle time slot selection
function selectTime(clickedButton, slot) {
  const buttons = document.querySelectorAll("#timeSlots button");
  buttons.forEach((button) => {
    button.classList.remove("bg-green-400"); // Deselect all buttons
    button.classList.add("bg-white"); // Deselect all buttons
  });

  clickedButton.classList.remove("bg-white"); // Select the clicked button
  clickedButton.classList.add("bg-green-400"); // Select the clicked button

  // Set the selectedTime variable
  selectedTime = slot;
  // Log the selected time
  // console.log("Selected Time:", selectedTime);
}

// Call function to generate time slot buttons
createTimeSlotButtons();
//

function formatDateStringForMySQL(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${day}${month}${year}`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const guests = document.getElementById("guests").value;
  const date = document.getElementById("date").value;
  // const time = document.getElementById("time").value;
  const decoration = document.getElementById("decoration").value;
  const EventName = document.getElementById("eventname").value;

  const decorationDetails = document.querySelector(
    'input[name="decoration"]:checked'
  )
    ? document.querySelector('input[name="decoration"]:checked').value
    : "None";
  const cakes = [
    ...document.querySelectorAll('input[name="cake"]:checked'),
  ].map((checkbox) => checkbox.value);

  var gifts = [];
  var checkboxes = document.querySelectorAll('input[name="gift"]:checked');
  checkboxes.forEach(function (checkbox) {
    gifts.push(checkbox.value);
  });

  var location2 = window.location.pathname;
  // console.log(location2);

  const bookingData = {
    name,
    email,
    phone,
    guests,
    date: formatDateStringForMySQL(date),

    // time:selectedTime,
    time: selectedTime,
    location: location2,
    EventName,
    decoration,
    decorationDetails,
    cakes,
    gifts,
  };

  // console.log("Booking Data:", bookingData);

  const jsonData = JSON.stringify(bookingData);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "save_booking.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log(xhr.responseText); // Log response from PHP script
    } else {
      console.error("Request failed with status:", xhr.status);
    }
  };
  xhr.send(jsonData);
});

// input vaildation

function step1() {
  const selectedDate = new Date(document.getElementById("date").value);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  if (!selectedDate || isNaN(selectedDate.getTime())) {
    return alert("Please select a valid date!");
  }

  if (selectedDate < currentDate) {
    return alert("Please select a date today or in the future!");
  }

  if (!selectedTime) {
    return alert("Please select a time slot!");
  }

  nextStep();
}

function step2() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const guests = document.getElementById("guests").value;
  const decoration = document.getElementById("decoration").value;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^\d{10}$/;

  if (!name) {
    return alert("Please enter your name!");
  }
  if (!email) {
    return alert("Please enter your email!");
  }

  if (!emailPattern.test(email)) {
    return alert("Please enter a valid email address!");
  }
  if (!phone) {
    return alert("Please enter your phone number!");
  }

  if (!phonePattern.test(phone)) {
    return alert("Please enter a valid 10-digit phone number!");
  }
  if (!guests) {
    return alert("Please enter the number of guests!");
  }
  if (!decoration) {
    return alert("Please select the decoration option!");
  }

  nextStep();
}

function step3() {
  // const decorationDetails = document.querySelector(
  //   'input[name="decoration"]:checked'
  // )
  //   ? document.querySelector('input[name="decoration"]:checked').value
  //   : "None";

  // // if(!decorationDetails){
  // //   return alert("Please select the one decoration option!")
  // // }
  // if (decorationDetails === "None") {
  //   alert("Please select a decoration option!");
  //   return;
  // }

  nextStep();
}
function step4() {
  // const cakes = [
  //   ...document.querySelectorAll('input[name="cake"]:checked'),
  // ].map((checkbox) => checkbox.value);

  // // Check if any cake option is selected
  // if (cakes.length === 0) {
  //   alert("Please select at least one cake option!");
  //   return;
  // }

  nextStep();
}
function step5() {
  // var gifts = [];
  // var checkboxes = document.querySelectorAll('input[name="gift"]:checked');
  // checkboxes.forEach(function (checkbox) {
  //   gifts.push(checkbox.value);
  // });
  // if (gifts.length === 0) {
  //   alert("Please select at least one gift or decoration !");
  //   return;
  // }

  nextStep();
}

// save locally

// function reverseDateFormat(dateString) {
//   const day = dateString.slice(8, 10);
//   const month = dateString.slice(5, 7);
//   const year = dateString.slice(0, 4);

//   return `${year}-${month}-${day}`;
// }

function fetchEntries() {
  fetch("fetch_entries.php")
    .then((response) => response.json())
    .then((data) => {
      // console.log("Complete data:", data);
      data.forEach((rowData) => {
        BookedData.push(rowData);
        // addEntryToTable(rowData);
      });
    })
    .catch((error) => console.error("Error fetching entries:", error));
}

fetchEntries();
