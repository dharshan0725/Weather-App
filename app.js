const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "453f2196648dd59afb7cb5c34b16a42b";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value;
  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      getWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayerror(error);
    }
  } else {
    displayerror(`Please Enter The City`);
  }
});

async function getWeatherData(city) {
  const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiurl);

  if (!response.ok) {
    throw new Error("Could Not Fetch Data");
  }
  return await response.json();
}

function getWeatherInfo(data) {
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement(`p`);

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `Humidity : ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
  switch (true) {
    case weatherId > 200 && weatherId < 299:
      return "⛈";
    case weatherId >= 300 && weatherId < 499:
      return `🌦`;
    case weatherId >= 500 && weatherId < 599:
      return `🌧`;
    case weatherId >= 600 && weatherId < 700:
      return `❄`;
    case weatherId >= 701 && weatherId < 781:
      return `🌫`;
    case weatherId === 800:
      return `🌞`;
    case weatherId >= 801:
      return `🌥`;
    default:
      return `⁉`;
  }
}

function displayerror(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
