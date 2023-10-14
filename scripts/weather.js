// --------------- Import api key ---------------
import * as apikey from "./apikey.js";

let url = apikey.url;
let options = apikey.options;

// --------------- Global variables ---------------

const todayButton = document.querySelector("#today");
const tommorowButton = document.querySelector("#tommorow");
const overmorrowButton = document.querySelector("#overmorrow");

// --------------- Main displaying functions ---------------

// Check if the browser supports geolocation
window.onload = function () {
	if (navigator.geolocation) {
		weather(3);
	}
};
// Import countryName
const countryName = localStorage.getItem("countryName");

// Use the URL with countryName if it exists
if (localStorage.getItem("countryName") !== null) {
	weather(1);
}

let weatherData;
// function for weather
function weather(option) {
	// iterate the right option
	if (option === 1) {
		if (localStorage.getItem("countryName") !== null) {
			// Use the URL with countryName if it exists
			url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${countryName}&days=3&aqi=yes`;
			localStorage.removeItem("countryName");
		}
	} else if (option === 2) {
		// If countryName is null and search bar has a value, use the city variable in the URL
		if (localStorage.getItem("countryName") === null && document.querySelector("#search-bar").value !== "") {
			let city = document.querySelector("#search-bar").value;
			url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3&aqi=yes`;
		}
	} else if (option === 3) {
		navigator.geolocation.getCurrentPosition((position) => {
			const latitude = position.coords.latitude;
			const longitude = position.coords.longitude;
			let city = `${latitude} ${longitude}`;
			url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latitude} ${longitude}&days=3&aqi=yes`;
		});
	}
	fetch(url, options)
		.then((data) => data.json())
		.then((data) => {
			weatherData = data;
			console.log(data);

			// Remove hide class and selected day class
			// remove all hide class
			document.querySelectorAll(".hide").forEach((element) => {
				element.classList.remove("hide");
			});

			// select day class
			todayButton.classList.add("active-day");
			tommorowButton.classList.remove("active-day");
			overmorrowButton.classList.remove("active-day");

			// Assign location
			const displayLocation = document.querySelector("#location");
			displayLocation.textContent = `${data.location.name}, ${data.location.country}`;

			// Assign search bar placeholder
			const searchBar = document.querySelector("#search-bar");
			searchBar.placeholder = `${data.location.name}`;

			// Assign date & time
			const dateDiv = document.querySelector("#date");
			dateDiv.textContent = `Date: ${convertTime(data.location.localtime)}`;
			const timeDiv = document.querySelector("#time");
			timeDiv.textContent = `Time: ${data.location.localtime.slice(11, 16)}`;

			// Assign sun & moon rise/set
			const sunrise = document.querySelector("#sunrise");
			const sunset = document.querySelector("#sunset");
			const moonrise = document.querySelector("#moonrise");
			const moonset = document.querySelector("#moonset");
			sunrise.textContent = `Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`;
			sunset.textContent = `Sunset: ${data.forecast.forecastday[0].astro.sunset}`;
			moonrise.textContent = `Moonrise: ${data.forecast.forecastday[0].astro.moonrise}`;
			moonset.textContent = `Moonset: ${data.forecast.forecastday[0].astro.moonset}`;

			// Assign each day's date
			const today = document.querySelector("#today");
			const tommorow = document.querySelector("#tommorow");
			const overmorrow = document.querySelector("#overmorrow");
			// Today container
			today.innerHTML = `<p id="today-title">${convertTime(data.forecast.forecastday[0].date)}</p>
			<span class="icon-container"><img id="today-icon" src="${data.forecast.forecastday[0].day.condition.icon}" alt="weather icon" /></span>
			<span id="today-high">High - ${data.forecast.forecastday[0].day.maxtemp_c}°C</span>
			<span id="today-low">Low - ${data.forecast.forecastday[0].day.mintemp_c}°C</span>`;
			// Tommorow container
			tommorow.innerHTML = `<p id="tommorow-title">${convertTime(data.forecast.forecastday[1].date)}</p>
			<span class="icon-container"><img id="tommorow-icon" src="${data.forecast.forecastday[1].day.condition.icon}" alt="weather icon" /></span>
			<span id="tommorow-high">High - ${data.forecast.forecastday[1].day.maxtemp_c}°C</span>
			<span id="tommorow-low">Low - ${data.forecast.forecastday[1].day.mintemp_c}°C</span>`;
			// Overmorrow container
			overmorrow.innerHTML = `<p id="overmorrow-title">${convertTime(data.forecast.forecastday[2].date)}</p>
			<span class="icon-container"><img id="overmorrow-icon" src="${data.forecast.forecastday[2].day.condition.icon}" alt="weather icon" /></span>
			<span id="overmorrow-high">High - ${data.forecast.forecastday[2].day.maxtemp_c}°C</span>
			<span id="overmorrow-low">Low - ${data.forecast.forecastday[2].day.mintemp_c}°C</span>`;

			// Assign today's hours.
			hourAssign(data, 1);

			// Middle div
			displayCenter();

			// Assign last updated
			const lastUpdated = document.querySelector(".bottom-row");
			lastUpdated.textContent = `Last updated ${parseInt(data.location.localtime.slice(14, 16)) - parseInt(data.current.last_updated.slice(14, 16))} minutes ago.`;
		});
}

// Filter to local time in word format
function convertTime(date) {
	// variables
	let weekday = new Date(date).getDay();
	weekday = isNaN(weekday) ? null : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][weekday];
	let day = date.slice(8, 10);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let month = date.slice(5, 7);
	month = months[month - 1];
	let year = date.slice(0, 4);
	return `${weekday}, ${day} ${month} ${year}.`;
}

// Function to put the correct hours depending on day
function hourAssign(data, day) {
	const hoursBox = document.querySelector(".hour-box");
	hoursBox.innerHTML = "";
	let currentTime = data.location.localtime.slice(11, 13);
	currentTime = currentTime.replace(/:/g, "");

	if (day == 1) {
		// Assign today's hours.
		for (let hour = currentTime; hour < 24; hour++) {
			hoursBox.innerHTML += `						<div class="hour-card-${hour} hour-card" onclick="activeHour(this)">
					<h5 class="hour-title">${data.forecast.forecastday[0].hour[hour].time.slice(11, 16)}</h5>
					<img class="hour-icon" src="${data.forecast.forecastday[0].hour[hour].condition.icon}" alt="" />
					<span class="hour-temperature">${data.forecast.forecastday[0].hour[hour].temp_c}°C</span>
					<span class="hour-humidity">${data.forecast.forecastday[0].hour[hour].humidity}q</span>
				</div>`;
		}
		todayButton.classList.add("active-day");
		tommorowButton.classList.remove("active-day");
		overmorrowButton.classList.remove("active-day");
	} else if (day == 2) {
		// Assign tommorow's hours.
		for (let hour = 0; hour < 24; hour++) {
			hoursBox.innerHTML += `						<div class="hour-card-${hour} hour-card" onclick="activeHour(this)">
					<h5 class="hour-title">${data.forecast.forecastday[1].hour[hour].time.slice(11, 16)}</h5>
					<img class="hour-icon" src="${data.forecast.forecastday[1].hour[hour].condition.icon}" alt="" />
					<span class="hour-temperature">${data.forecast.forecastday[1].hour[hour].temp_c}°C</span>
					<span class="hour-humidity">${data.forecast.forecastday[1].hour[hour].humidity}q</span>
				</div>`;
		}
		todayButton.classList.remove("active-day");
		tommorowButton.classList.add("active-day");
		overmorrowButton.classList.remove("active-day");
	} else if (day == 3) {
		// Assign overmorrow's hours.
		for (let hour = 0; hour < 24; hour++) {
			hoursBox.innerHTML += `						<div class="hour-card-${hour} hour-card" onclick="activeHour(this)">
					<h5 class="hour-title">${data.forecast.forecastday[2].hour[hour].time.slice(11, 16)}</h5>
					<img class="hour-icon" src="${data.forecast.forecastday[2].hour[hour].condition.icon}" alt="" />
					<span class="hour-temperature">${data.forecast.forecastday[2].hour[hour].temp_c}°C</span>
					<span class="hour-humidity">${data.forecast.forecastday[2].hour[hour].humidity}q</span>
				</div>`;
		}
		todayButton.classList.remove("active-day");
		tommorowButton.classList.remove("active-day");
		overmorrowButton.classList.add("active-day");
	}

	// assigns first hour the active hour
	hoursBox.firstElementChild.classList.add("active-hour");

	// scroll to start of hourBox
	hoursBox.scrollLeft = 0;
}

// Function for displaying the center div
function displayCenter() {
	// variables
	const detailsHourly = document.querySelector(".details-hourly");
	const detailsDay = document.querySelector(".details-day");
	detailsHourly.innerHTML = `<h3>Hour!</h3>`;
	detailsDay.innerHTML = `<h3>Day!</h3>`;
}

// --------------- Search function & event listeners ---------------

//variables
const search = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-button");

// search event listener for enter
search.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		weather(2);
	}
});
//search event listener for click
searchBtn.onclick = () => {
	weather(2);
};

// --------------- On click event listeners ---------------
// Today button
todayButton.onclick = () => {
	hourAssign(weatherData, 1);
};

// Tommorow button
tommorowButton.onclick = () => {
	hourAssign(weatherData, 2);
};

// Overmorrow button
overmorrowButton.onclick = () => {
	hourAssign(weatherData, 3);
};
