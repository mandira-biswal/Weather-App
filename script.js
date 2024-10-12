const apiKey = `52031b3958eab68084c1e4afcca24a0b`;

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        console.log(data); // Log the data for debugging
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

const cityElement = document.querySelector(".city");
const temperatureElement = document.querySelector(".temp");
const windSpeedElement = document.querySelector(".wind-speed");
const humidityElement = document.querySelector(".humidity");
const visibilityElement = document.querySelector(".visibility-distance");
const descriptionText = document.querySelector(".description-text");
const dateElement = document.querySelector(".date");
const weatherIconElement = document.getElementById("weather-icon");

function updateWeatherUI(data) {
    cityElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
    visibilityElement.textContent = `${data.visibility / 1000} km`;
    descriptionText.textContent = data.weather[0].description;

    const weatherCondition = data.weather[0].main.toLowerCase(); // Get the main weather condition
    const iconUrl = getWeatherIcon(weatherCondition); // Get the icon URL based on the condition
    weatherIconElement.src = iconUrl; // Update the icon src

    const currentDate = new Date();
    dateElement.textContent = currentDate.toDateString();
}

// Function to get weather icon URL based on the condition
function getWeatherIcon(condition) {
    switch (condition) {
        case 'clear':
            return "C:/Weather Application/Images/Sun.png"; // Use forward slashes
        case 'clouds':
            return "C:/Weather Application/Images/clouds.png"; // Use forward slashes
        case 'rain':
            return "C:/Weather Application/Images/rain.png"; // Use forward slashes
        case 'snow':
            return "C:/Weather Application/Images/snow.png"; // Use forward slashes
        case 'drizzle':
            return "C:/Weather Application/Images/drizzle.png"; // Use forward slashes
        default:
            return "C:/Weather Application/Images/default.png"; // Fallback icon
    }
}

// Set the current date on page load
const currentDate = new Date();
dateElement.textContent = currentDate.toDateString();

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");
document.addEventListener("DOMContentLoaded", () => {
    
});

formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    const city = inputElement.value.trim(); // Trim whitespace
    if (city !== "") {
        fetchWeatherData(city);
    }
});

