function updateTime() {
  let cities = document.querySelectorAll(".city");

  cities.forEach((city) => {
    let timezone = city.dataset.timezone; //Australia/Sydney
    let localTime = moment().tz(timezone);
    let date = localTime.format("dddd Do YYYY");
    let time = localTime.format("h:mm:ss [<small]>A[</small>]");

    city.querySelector(".date").innerHTML = date;
    city.querySelector(".time").innerHTML = time;

    checkDayTime(city, time);
  });
}

function updateCityList(event) {
  let selectedTimezone = event.target.value;
  if (event.target.value === "current") {
    selectedTimezone = moment.tz.guess();
  }
  let cities = document.querySelectorAll(".city");
  let cityExists = Array.from(cities).some(
    (city) => city.dataset.timezone === selectedTimezone
  ); // Check if the city is already in the list

  if (event.target.value && !cityExists) {
    let cityName = selectedTimezone.replace("_", " ").split(`/`)[1];
    let localTime = moment().tz(selectedTimezone);
    let date = localTime.format("dddd Do YYYY");
    let time = localTime.format("h:mm:ss [<small]>A[</small>]");
    let cityList = document.querySelector(".cityList");

    cityList.innerHTML += `<div class="city-container">
				<span class="delete-button">Delete</span><div class="city" data-timezone="${selectedTimezone}">
    <div>
    <h2>${cityName}</h2>
    <div class="date">${date}</div>
    </div>
    <div class="time">${time}</div>
    </div></div>`;

    addHomeButton();
  }
}

function addHomeButton() {
  let cityList = document.querySelector(".cityList");
  let homeButtonContainer = document.querySelector(".homeBtn-container");

  if (homeButtonContainer) {
    homeButtonContainer.remove();
  }

  cityList.innerHTML += `<div class="homeBtn-container">
				<a href="/" class="homeBtn">Return to Home Page</a>
			</div>`;
}

function checkDayTime(city, time) {
  let isPM = time.includes("PM");

  // Change background color if PM
  if (isPM) {
    city.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
    city.style.color = "var(--lightcream-color)"; // Adjust text color for better visibility
  }
}

function deleteCity(event) {
  if (event.target.classList.contains("delete-button")) {
    let cityContainer = event.target.closest(".city-container");
    if (cityContainer) {
      cityContainer.remove();

      addHomeButton();
    }
  }
}

/////////////////////////////////////////////////
let cityList = document.querySelector(".cityList");
let selectedCity = document.querySelector("#selected-city");

cityList.addEventListener("click", deleteCity);
selectedCity.addEventListener("change", updateCityList);

updateTime();
setInterval(updateTime, 1000);
