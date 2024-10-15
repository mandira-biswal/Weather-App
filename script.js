const apiKey = '52031b3958eab68084c1e4afcca24a0b';

document.addEventListener("DOMContentLoaded", () => {
    const formElement = document.querySelector(".search-form");
    const inputElement = document.querySelector(".city-input");
    const weatherIcon = document.getElementById("weather-icon");

    // Select the necessary elements
    const cityElement = document.querySelector(".city");
    const tempElement = document.querySelector(".temp");
    const humidityElement = document.querySelector(".humidity");
    const windElement = document.querySelector(".wind-speed");
    const visibilityElement = document.querySelector(".visibility");
    const errorElement = document.querySelector(".error");
    const weatherElement = document.querySelector(".weather");

    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        checkWeather(inputElement.value);
    });

    async function checkWeather(city) {
        try {
            console.log(`Fetching weather for: ${city}`);
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

            if (response.ok) {
                const data = await response.json();
                console.log(data); // Log the entire data for debugging

                cityElement.textContent = data.name;
                tempElement.textContent = `${Math.round(data.main.temp)}°C`;
                humidityElement.textContent = `${data.main.humidity}%`;
                windElement.textContent = `${data.wind.speed} km/h`;
                visibilityElement.textContent = `${data.visibility / 1000} km`;

                const weatherCondition = data.weather[0].main.toLowerCase();
                weatherIcon.src = getWeatherIcon(weatherCondition);

                // Show the weather info and hide the error
                weatherElement.style.display = "block";
                errorElement.style.display = "none";
            } else {
                // Handle different HTTP response statuses
                if (response.status === 404) {
                    errorElement.textContent = "City not found. Please try again.";
                } else {
                    errorElement.textContent = "An error occurred. Please try again.";
                }
                errorElement.style.display = "block";
                weatherElement.style.display = "none";
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    function getWeatherIcon(condition) {
        switch (condition) {
            case 'clear':
                return "Images/Sun.png";
            case 'clouds':
                return "Images/clouds.png";
            case 'drizzle':
                return "Images/drizzle.png";
            case 'rain':
                return "Images/rain.png";
            case 'snow':
                return "Images/snow.png";
            case 'humidity':
                return "Images/humidity.png"
            default:
                return "Images/clouds.png"; // Fallback icon
        }
    }
});


