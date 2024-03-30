let currentStep = 1;
const form = document.getElementById("bookingForm");

const cakeOptions = [
  {
    name: "Black Forest Cake (500)",
    imageUrl: "/public/Black Forest Cake (500).png",
  },
  {
    name: "Butterscotch Cake (500)",
    imageUrl: "/public/Butterscotch Cake (500).png",
  },
  {
    name: "Chocolate Cake (500)",
    imageUrl: "/public/Chocolate Cake (500).png",
  },
  {
    name: "Pineapple Cake (500)",
    imageUrl: "/public/Pineapple Cake (500).png",
  },
  {
    name: "Round Red Velvet Cake (600)",
    imageUrl: "/public/Round Red Velvet Cake (600).png",
  },
  {
    name: "Blueberry Cake (600)",
    imageUrl: "/public/Blueberry Cake (600).png",
  },
  {
    name: "Mango Cake (600)",
    imageUrl: "/public/Mango Cake (600).png",
  },
  {
    name: "Heart Red Velvet Cake (700)",
    imageUrl: "/public/Heart Red Velvet Cake (700).png",
  },
  {
    name: "Death by chocolate Cake (700)",
    imageUrl: "/public//Death by chocolate Cake (700).png",
  },
  {
    name: "Choco Almond Cake (750)",
    imageUrl: "/public/Choco Almond Cake (750).png",
  },
  {
    name: "Heart Pinata Cake (850)",
    imageUrl: "/public/Heart Pinata Cake (850).png",
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
      "09:00 AM to 12:00 PM  ",
      "12:30 PM to 03:30 PM",
      "04:30 PM to 05:30 PM",
      "06:00 PM to 09:00 PM",
      "09:30 PM to 12:30 PM",
    ];
  } else {
    var timeSlots = [
      "09:30 AM to 12:30 PM  ",
      "01:00 PM to 04:00 PM",
      "05:00 PM to 06:00 PM",
      "06:30 PM to 09:30 PM",
      "10:30 PM to 01:00 PM",
    ];
  }

  const timeSlotsContainer = document.getElementById("timeSlots");

  const buttonsHTML = timeSlots
    .map((slot) => {
      return `
        <button 
          class="bg-white text-[12px] flex-grow md:flex-[0_0_200px] text-black px-4 py-2 rounded shadow focus:outline-none"
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
  console.log("Selected Time:", selectedTime);
}

// Call function to generate time slot buttons
createTimeSlotButtons();
//

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const guests = document.getElementById("guests").value;
  const date = document.getElementById("date").value;
  // const time = document.getElementById("time").value;
  const decoration = document.getElementById("decoration").value;
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
  console.log(location2);

  const bookingData = {
    name,
    email,
    phone,
    guests,
    date,
    // time:selectedTime,
    time: selectedTime,
    location: location2,
    decoration,
    decorationDetails,
    cakes,
    gifts,
  };

  console.log("Booking Data:", bookingData);
});
