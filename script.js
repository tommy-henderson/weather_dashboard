//searches API for city, returns weather data
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

//function to display data to HTML page
function displayWeather(data) {
    const weatherInfoDiv = document.getElementById("weatherInfo");
    weatherInfoDiv.innerHTML = "";

    //checks if API request went through and displays error message if not
    if (data.cod !== "200") {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
        return;
    }

    //creates variables for info and adds 5 days of weather to page using for loop
    const cityName = data.city.name;
    const forecastList = data.list;

    weatherInfoDiv.innerHTML += `<h2>${cityName} - 5 Day Forecast</h2>`;

    for (let i = 0; i < forecastList.length; i += 8) {
        const forecast = forecastList[i];
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
    }
}

function saveSearch(city) {
    let cities = [""];
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
}

function displaySavedCities() {
    const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
    const cityListContainer = document.getElementById("cityList");

    // Display the saved cities as a list
    if (savedCities.length > 0) {
        const cityList = document.createElement("ul");

        savedCities.forEach(city => {
            const listItem = document.createElement("li");
            listItem.textContent = city;
            cityList.appendChild(listItem);
        });

        cityListContainer.appendChild(cityList);
    }
}