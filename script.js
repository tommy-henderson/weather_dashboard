function searchWeather() {
    const apiKey = "d8aa6a37fdec617dd7c486ab30f41f27";
    const cityInput = document.getElementById("cityInput").value;

    if (cityInput.trim() === "") {
        alert("Please enter a city name");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("Error fetching weather data. Please try again.");
        });
}

function displayWeather(data) {
    const weatherInfoDiv = document.getElementById("weatherInfo");
    weatherInfoDiv.innerHTML = "";

    if (data.cod !== "200") {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    const cityName = data.city.name;
    const forecastList = data.list;

    weatherInfoDiv.innerHTML += `<h2>${cityName} - 5 Day Forecast</h2>`;

    forecastList.forEach(forecast => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const temperature = forecast.main.temp.toFixed(1);
        const description = forecast.weather[0].description;

        weatherInfoDiv.innerHTML += `
            <div class="forecast">
                <p>${day}</p>
                <p>${temperature} °C</p>
                <p>${description}</p>
            </div>
        `;
    });
}
