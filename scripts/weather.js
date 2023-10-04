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

			// Assign date time
			date = covertTime(data.location.localtime);
			let time = data.location.localtime.slice(11, 16);
			const dateDiv = document.querySelector("#date");
			dateDiv.textContent = date;
			const timeDiv = document.querySelector("#time");
			timeDiv.textContent = time;

			// Assign temperature
			const temperature = document.querySelector("#temperature");
			temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
		});
}

// Filter to local time in word format
function covertTime(date) {
	// variables
	let day = date.slice(8, 10);
	let month = date.slice(5, 7);
	const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	month = months[month - 1];
	let year = date.slice(0, 4);
	let weekday = new Date(date).getDay();
	weekday = isNaN(weekday) ? null : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][weekday];
	return `${weekday}, ${day} ${month} ${year}.`;
}

weather();
