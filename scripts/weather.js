import { url, options } from "./apikey.js";

// function for weather
function weather() {
	fetch(url, options)
		.then((data) => data.json())
		.then((data) => {
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

			// Assign each day's date
			const today = document.querySelector("#today");
			const tommorow = document.querySelector("#tommorow");
			const overmorrow = document.querySelector("#overmorrow");
			// Today container
			today.innerHTML = `<p id="today-title">${covertTime(data.forecast.forecastday[0].date)}</p>
			<span class="icon-container"><img id="today-icon" src="${data.forecast.forecastday[0].day.condition.icon}" alt="weather icon" /></span>
			<span id="today-high">${data.forecast.forecastday[0].day.maxtemp_c}°C</span>
			<span id="today-low">${data.forecast.forecastday[0].day.mintemp_c}°C</span>`;
			// Tommorow container
			tommorow.innerHTML = `<p id="tommorow-title">${covertTime(data.forecast.forecastday[1].date)}</p>
			<span class="icon-container"><img id="tommorow-icon" src="${data.forecast.forecastday[1].day.condition.icon}" alt="weather icon" /></span>
			<span id="tommorow-high">${data.forecast.forecastday[1].day.maxtemp_c}°C</span>
			<span id="tommorow-low">${data.forecast.forecastday[1].day.mintemp_c}°C</span>`;
			// Overmorrow container
			overmorrow.innerHTML = `<p id="overmorrow-title">${covertTime(data.forecast.forecastday[2].date)}</p>
			<span class="icon-container"><img id="overmorrow-icon" src="${data.forecast.forecastday[2].day.condition.icon}" alt="weather icon" /></span>
			<span id="overmorrow-high">${data.forecast.forecastday[2].day.maxtemp_c}°C</span>
			<span id="overmorrow-low">${data.forecast.forecastday[2].day.mintemp_c}°C</span>`;

			// Assign temperature (closed until designed)
			// const hoursBox = document.querySelector(".hour-box");
			// for (let index = 0; index < 24; index++) {
			// 	hoursBox.innerHTML += `<span class="hours">${data.forecast.forecastday[0].hour[index].cloud}</span>`;
			// }

			// Assign temperature
			const temperature = document.querySelector("#temperature");
			temperature.textContent = `Temperature: ${data.current.temp_c}°C`;

			// Assign wind speed
			const windSpeed = document.querySelector("#wind-speed");
			windSpeed.textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
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

weather();
