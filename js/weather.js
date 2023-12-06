let citiesDropDown = document.querySelector("#citiesDropDown");
let weatherDiv = document.querySelector("#weatherDiv");

let cities = [
   {
      name: "Pittsburgh, PA",
      latitude: 40.440624,
      longitude: -79.995888,
   },
   {
      name: "Philadelphia, PA",
      latitude: 39.9526,
      longitude: -75.1652,
   },
   {
      name: "Harrisburg, PA",
      latitude: 40.273191,
      longitude: -76.8867,
   },
   {
      name: "Allentown, PA",
      latitude: 40.602206,
      longitude: -75.471394,
   },
   {
      name: "Scranton, PA",
      latitude: 41.408969,
      longitude: -75.662412,
   },
   {
      name: "Erie, PA",
      latitude: 42.129224,
      longitude: -80.085059,
   },
   {
      name: "Baltimore, MD",
      latitude: 39.2904,
      longitude: -76.6122,
   },
];

document.onload = init();
citiesDropDown.onchange = () => getWeatherStation(citiesDropDown.value);

function init() {
   for (const city of cities) {
      let option = new Option(city.name, city.latitude + "," + city.longitude);
      citiesDropDown.appendChild(option);
   }
}

async function getWeatherStation(coordinates) {
   let responce = await fetch(`https://api.weather.gov/points/${coordinates}`);
   let data = await responce.json();
   let properties = data.properties;
   getForcast(properties.gridId, properties.gridX, properties.gridY);
}

async function getForcast(office, gridX, gridY) {
   let responce = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`);
   let data = await responce.json();
   let weeklyForcast = data.properties.periods[0];
   createCard(
      weeklyForcast.name,
      weeklyForcast.temperature,
      weeklyForcast.windSpeed,
      weeklyForcast.windDirection,
      weeklyForcast.dewpoint.value,
      weeklyForcast.relativeHumidity.value,
      weeklyForcast.probabilityOfPrecipitation.value,
      weeklyForcast.shortForecast
   );
}

function createCard(
   name,
   tempature,
   windSpeed,
   windDirection,
   dewPoint,
   humidity,
   pOP,
   shortForecast,
   detailedForecast
) {
   let card = document.createElement("div");
   card.className = "card";

   let cardTitle = document.createElement("h5");
   cardTitle.innerText = name;
   cardTitle.className = "card-title";

   let cardBody = document.createElement("div");
   cardBody.className = "card-body";

   let daysTempature = document.createElement("h3");
   daysTempature.innerText = `${tempature} °F`;
   daysTempature.className = "card-text";

   let wind = document.createElement("p");
   wind.innerText = `Wind: ${windSpeed} from ${windDirection}`;
   wind.className = "card-text";

   let dewNHumidity = document.createElement("p");
   dewNHumidity.innerText = `Dewpoint: ${dewPoint.toFixed(2)}°C | Humidity: ${humidity}%`;
   dewNHumidity.className = "card-text";

   let percipitation = document.createElement("p");
   percipitation.innerText = `${pOP}% chance of percipitation`;
   percipitation.className = "card-text";

   let briefForecast = document.createElement("p");
   briefForecast.innerText = shortForecast;
   briefForecast.className = "card-text";

   cardBody.appendChild(cardTitle);
   cardBody.appendChild(daysTempature);
   cardBody.appendChild(wind);
   cardBody.appendChild(dewNHumidity);
   
    if (pOP) {
        cardBody.appendChild(percipitation);
    }
    
   cardBody.appendChild(briefForecast);

   card.appendChild(cardBody);

   weatherDiv.appendChild(card);
}
