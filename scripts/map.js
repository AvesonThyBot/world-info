import { url, options } from "./apikey.js";

// function to display map and get info of map and api
function displayMap() {
	fetch(url, options)
		.then((data) => data.json())
		.then((data) => {
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
					popupModal(countryName);
				});
			});

			// check data
			console.log(data);
		});
}

// Modal
function popupModal(countryName) {
	// Modal variables
	let countryModal = new bootstrap.Modal(document.getElementById("mapModal"));
	const modalTitle = document.querySelector(".modal-title");

	// Assign header name
	modalTitle.textContent = `${countryName}`;

	countryModal.show();
}

displayMap();
