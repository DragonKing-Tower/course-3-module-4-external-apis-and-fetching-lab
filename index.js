// index.js

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
// - Use fetch() to retrieve data from the OpenWeather API
// - Handle the API response and parse the JSON
// - Log the data to the console for testing

async function fetchWeatherData(city) {
	const apiKey = "7c2bf33f70526ae138694a3dbb013e00";
	const website = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
		city
	)}&appid=${apiKey}`;

	const response = await fetch(website);
	if (!response.ok) {
		throw new Error("City not found");
	}

	const data = await response.json();
	return data;
}

// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
// - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
// - Ensure the function can handle the data format provided by the API
function displayWeather(data) {
	const weatherDisplay = document.querySelector("#weather-display"); //access the weather section of our website
	const weatherTemperature = document.createElement("p");
	const weatherHumidity = document.createElement("p");
	const weatherDescription = document.createElement("p"); //create the items we will add to it

	weatherTemperature.textContent = `${data.name} temperature is: ${
		data.main.temp - 273.15
	}°C`;
	weatherHumidity.textContent = `${data.name} humidity is: ${data.main.humidity}%`;
	weatherDescription.textContent = `${data.name} weather is: ${data.weather[0].description}`; //add the data to the items as text content

	weatherDisplay.append(
		weatherTemperature,
		weatherHumidity,
		weatherDescription
	); // append the items for the display
}

// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page
function displayError(message) {
	const error = document.getElementById("error-message");
	error.textContent = message;
	error.classList.remove("hidden");
}
// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
// - Retrieve the value from the input field
// - Call `fetchWeatherData(city)` with the user-provided city name
document.addEventListener("DOMContentLoaded", () => {
	const weatherButton = document.querySelector("#fetch-weather"); //find the weather button
	weatherButton.addEventListener("click", async () => {
		const cityInput = document.querySelector("#city-input").value; //find user input
		const data = await fetchWeatherData(cityInput);
		displayWeather(data);
	});
});

// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named
// BONUS: Loading Indicator
// - Optionally, add a loading spinner or text while the API request is in progress
// BONUS: Additional Features
// - Explore adding more features, such as displaying additional weather details (e.g., wind speed, sunrise/sunset)
// - Handle edge cases, such as empty input or API rate limits
// Event Listener for Fetch Button
// - Attach the main event listener to the button to start the process
module.exports = { fetchWeatherData, displayWeather, displayError };
