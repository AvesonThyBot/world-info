import { url, options } from "./apikey.js";

function displayMap() {
	fetch(url, options)
		.then((data) => data.json())
		.then((data) => {
			// check data
			console.log(data);
		});
}

displayMap();
