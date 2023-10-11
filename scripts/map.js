// --------------- Import api key ---------------
import * as apikey from "./apikey.js";

let url = apikey.url;
let options = apikey.options;

// --------------- Function to display country ---------------

let countryData;
let countryName;
// function to display map and get info of map and api
function displayMap(countryName) {
	let city = countryName;
	url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;

	// Return the data (global use)
	return fetch(url, options)
		.then((response) => response.json())
		.then((data) => {
			countryData = data;
			// check data
		});
}

// --------------- On click for any country ---------------

// Get name of the path element that is picked.
const pathElements = document.querySelectorAll("path");
pathElements.forEach((pathElement) => {
	pathElement.addEventListener("click", () => {
		let countryName = pathElement.getAttribute("name");

		if (pathElement.classList.length === 0 && countryName) {
			countryName = countryName;
		} else {
			countryName = pathElement.classList.value;
		}

		// Use the returned promise to log or use the data
		displayMap(countryName).then((data) => {
			popupModal(countryData, countryName);
		});
	});
});

// --------------- Modal & extra functions ---------------

// Modal
function popupModal(data, countryName) {
	countryName = countryName;
	// Modal variables
	let countryModal = new bootstrap.Modal(document.getElementById("mapModal"));
	const modalTitle = document.querySelector(".modal-title");
	const modalBody = document.querySelector(".modal-body");

	// Assign title name
	modalTitle.textContent = `${countryName}`;

	// console.log(data);

	modalBody.innerHTML = `<span id="country-time">${convertTime(data.location.localtime)}</span>
        <span id="country-tz">${data.location.tz_id}</span><br>
        <span id="country-time">${convertTime(data.location.localtime)}</span><br>
        <span id="country-lat">Lat: ${data.location.lat}</span><br>
        <span id="country-lon">Lon: ${data.location.lon}</span><br>
        <span id="country-name">${data.location.name}</span><br>
        <span id="country-region">${data.location.region}</span><br>
        <a href="/weather.html" id="check-weather">Check Weather</a>`;

	countryModal.show();
	console.log(countryName);
	// saves to local storage
	localStorage.setItem("countryName", countryName);
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

// --------------- event listeners ---------------

// onclick event listener
const closeBtn = document.querySelector(".close-btn");
closeBtn.onclick = () => {
	document.querySelectorAll(".modal-backdrop show").forEach((element) => {
		element.classList.remove(".modal-backdrop show");
	});
};
