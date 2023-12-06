let citiesDropDown = document.querySelector("#citiesDropDown");
let weatherTable  = document.querySelector("#weatherTable")

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

function init() {
    let i = 0;
    for (const city of cities) {
        let option = new Option(city.name, i)
        citiesDropDown.appendChild(option)
        ++i
    }
}