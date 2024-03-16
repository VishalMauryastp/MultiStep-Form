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

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const guests = document.getElementById("guests").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
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
    time,
    location: location2,
    decoration,
    decorationDetails,
    cakes,
    gifts,
  };

  console.log("Booking Data:", bookingData);
});
