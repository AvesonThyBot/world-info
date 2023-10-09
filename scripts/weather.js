// --------------- Import api key ---------------
import * as apikey from "./apikey.js";

let url = apikey.url;
let options = apikey.options;

let weatherData;
// function for weather
function weather() {
	// Assign data based on search
	if (document.querySelector("#search-bar").value !== "") {
		// Assign value to city variable
		let city = document.querySelector("#search-bar").value;

		// Use the city variable in the URL
		url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
	}
	fetch(url, options)
		.then((data) => data.json())
		.then((data) => {
			weatherData = data;
			console.log(data);

			// Assign location
			const displayLocation = document.querySelector("#location");
			displayLocation.textContent = `${data.location.name}, ${data.location.country}`;

			// Assign search bar placeholder
			const searchBar = document.querySelector("#search-bar");
			searchBar.placeholder = `${data.location.name}`;

			// Assign date & time
			const dateDiv = document.querySelector("#date");
			dateDiv.textContent = `Date: ${covertTime(data.location.localtime)}`;
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
			today.innerHTML = `<p id="today-title">${covertTime(data.forecast.forecastday[0].date)}</p>
			<span class="icon-container"><img id="today-icon" src="${data.forecast.forecastday[0].day.condition.icon}" alt="weather icon" /></span>
			<span id="today-high">High - ${data.forecast.forecastday[0].day.maxtemp_c}°C</span>
			<span id="today-low">Low - ${data.forecast.forecastday[0].day.mintemp_c}°C</span>`;
			// Tommorow container
			tommorow.innerHTML = `<p id="tommorow-title">${covertTime(data.forecast.forecastday[1].date)}</p>
			<span class="icon-container"><img id="tommorow-icon" src="${data.forecast.forecastday[1].day.condition.icon}" alt="weather icon" /></span>
			<span id="tommorow-high">High - ${data.forecast.forecastday[1].day.maxtemp_c}°C</span>
			<span id="tommorow-low">Low - ${data.forecast.forecastday[1].day.mintemp_c}°C</span>`;
			// Overmorrow container
			overmorrow.innerHTML = `<p id="overmorrow-title">${covertTime(data.forecast.forecastday[2].date)}</p>
			<span class="icon-container"><img id="overmorrow-icon" src="${data.forecast.forecastday[2].day.condition.icon}" alt="weather icon" /></span>
			<span id="overmorrow-high">High - ${data.forecast.forecastday[2].day.maxtemp_c}°C</span>
			<span id="overmorrow-low">Low - ${data.forecast.forecastday[2].day.mintemp_c}°C</span>`;

			// Assign today's hours.
			hourAssign(data, 1);

			// // Assign temperature
			// const temperature = document.querySelector("#temperature");
			// temperature.textContent = `Temperature: ${data.current.temp_c}°C`;

			// // Assign wind speed
			// const windSpeed = document.querySelector("#wind-speed");
			// windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;

			// Assign last updated
			const lastUpdated = document.querySelector(".bottom-row");
			lastUpdated.textContent = `Last updated: ${covertTime(data.current.last_updated)}`;
		});
}

// Filter to local time in word format
function covertTime(date) {
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

// --------------- Search function & event listeners ---------------

//variables
const search = document.querySelector("#search-bar");
const searchBtn = document.querySelector("#search-button");

// search event listener for enter
search.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		event.preventDefault();
		weather();
	}
});
//search event listener for click
searchBtn.addEventListener("click", weather);

// Function to put the correct hours depending on day
function hourAssign(data, day) {
	const hoursBox = document.querySelector(".hour-box");
	hoursBox.innerHTML = "";
	if (day == 1) {
		// Assign today's hours.
		for (let hour = 0; hour < 24; hour++) {
			hoursBox.innerHTML += `						<div class="hour-card-${hour} hour-card">
					<h5 class="hour-title">${data.forecast.forecastday[0].hour[hour].time.slice(11, 16)}</h5>
					<img class="hour-icon" src="${data.forecast.forecastday[0].hour[hour].condition.icon}" alt="" />
					<span class="hour-temperature">${data.forecast.forecastday[0].hour[hour].temp_c}°C</span>
					<span class="hour-humidity">${data.forecast.forecastday[0].hour[hour].humidity}q</span>
				</div>`;
		}
	} else if (day == 2) {
		// Assign tommorow's hours.
		for (let hour = 0; hour < 24; hour++) {
			hoursBox.innerHTML += `						<div class="hour-card-${hour} hour-card">
					<h5 class="hour-title">${data.forecast.forecastday[1].hour[hour].time.slice(11, 16)}</h5>
					<img class="hour-icon" src="${data.forecast.forecastday[1].hour[hour].condition.icon}" alt="" />
					<span class="hour-temperature">${data.forecast.forecastday[1].hour[hour].temp_c}°C</span>
					<span class="hour-humidity">${data.forecast.forecastday[1].hour[hour].humidity}q</span>
				</div>`;
		}
	} else if (day == 3) {
		// Assign overmorrow's hours.
		for (let hour = 0; hour < 24; hour++) {
			hoursBox.innerHTML += `						<div class="hour-card-${hour} hour-card">
					<h5 class="hour-title">${data.forecast.forecastday[2].hour[hour].time.slice(11, 16)}</h5>
					<img class="hour-icon" src="${data.forecast.forecastday[2].hour[hour].condition.icon}" alt="" />
					<span class="hour-temperature">${data.forecast.forecastday[2].hour[hour].temp_c}°C</span>
					<span class="hour-humidity">${data.forecast.forecastday[2].hour[hour].humidity}q</span>
				</div>`;
		}
	}
}

// on click event listener for the 3 days
const todayButton = document.querySelector("#today");
const tommorowButton = document.querySelector("#tommorow");
const overmorrowButton = document.querySelector("#overmorrow");

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

// --------------- Run program ---------------

// Run program
weather();
