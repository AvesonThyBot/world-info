// type writer
const text = "This website is dedicated to displaying the statistics and weather of the world using a SVG map and Weather API.";
document.querySelector(".typewriter-effect").innerHTML = text;
document.querySelector(".typewriter-effect").style.setProperty("--characters", text.length);
