let citiesDropDown = document.querySelector("#citiesDropDown");
let weatherDiv = document.querySelector("#weatherDiv")

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
citiesDropDown.onchange = () => getWeatherStation(citiesDropDown.value)

function init() {
    for (const city of cities) {
        let option = new Option(city.name, city.latitude + "," + city.longitude)
        citiesDropDown.appendChild(option)
    }
}

async function getWeatherStation(coordinates) {
    let responce = await fetch(`https://api.weather.gov/points/${coordinates}`);
    let data = await responce.json();
    let properties = data.properties
    getForcast(properties.gridId, properties.gridX, properties.gridY);
}

async function getForcast(office, gridX, gridY) {
    let responce = await fetch(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`);
    let data = await responce.json();
    let weeklyForcast = data.properties.periods
    console.log(weeklyForcast);
}

function createCard() {
    
}