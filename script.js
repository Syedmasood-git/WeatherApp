const homeDiv = document.getElementById("land");
const container = document.getElementById("container");
const submit = document.getElementById("fetchButton");
const lowerSection = document.getElementById("lower-section");
const upperSection = document.getElementById("upper-section");

const api_key = "6980baf5787780b74808e7d8598bc7f8";
const Url =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}";
async function fetchGeoLocation() {
  try {
    const position = await getCurrentPosition();
    // console.log(position.coords.latitude);
    const { latitude, longitude } = position.coords;
    displayMap(latitude, longitude);
    // console.log(displayMap(latitude,longitude));
    const weatherData = await fetchWeatherData(latitude, longitude);
    const locname=await getLocationName(longitude,latitude);
    getLocationName(locname);
    console.log(locname);
    displayWeatherData(weatherData,locname);
  } catch (error) {
    if (error.code === 1) {
      alert("Allow Location in System Browser");
    } else {
      console.error("Error", error);
    }
  }
}
async function getLocationName(latitude,longitude){
    const endpoint=`https://api.openweathermap.org/geo/1.0/reverse?lat=13.0238071&lon=77.5963159&limit=1&appid=6980baf5787780b74808e7d8598bc7f8`
    const response=await fetch(endpoint);
    return result=await response.json();
}

function getWindDirection(degree){
    if (degree>337.5) return 'Northerly';
    if (degree>292.5) return 'North Westerly';
    if(degree>247.5) return 'Westerly';
    if(degree>202.5) return 'South Westerly';
    if(degree>157.5) return 'Southerly';
    if(degree>122.5) return 'South Easterly';
    if(degree>67.5) return 'Easterly';
    if(degree>22.5){return 'North Easterly';}
    return 'Northerly';
}

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject("Geolocation is not available.");
    }
  });
}


function displayMap(latitude, longitude) {
  homeDiv.style.display = "none";
  const map = document.createElement("div");
  map.className = "hero";
//   map.innerHTML = `<div class="hero">
                   map.innerHTML= `<div class="header">
                        <h1>Welcome To The Weather App</h1>
                        <p>Here is your current location</p>
                    </div>
                    <div class="latlong">
                        <div class="lat"><span>Lat: ${latitude}</span></div>
                        <div class="long"><span>Long: ${longitude}</span></div>
                    </div>
                    <div class="maps">
                        <iframe src="https://maps.google.com/maps?q=${latitude}, ${longitude}&z=15&output=embed" width="100%" height="100%" frameborder="0" style="border:0"></iframe>
                    </div>
                </div>
                
`;
  upperSection.appendChild(map);
}

async function fetchWeatherData(latitude, longitude) {
  const endpoint = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
  try {
    const response = await fetch(endpoint);
    return (result = await response.json());
  } catch (error) {
    console.log("Error", error);
  }
}
function displayWeatherData(weatherData,locname) {
    const data = document.createElement("div");
    data.className = "data";
    data.innerHTML = `<h1>Your Weather Data</h1>
                      <ul class="ul-data">
                          <li id="location">Location: ${locname[0].name}</li>
                          <li id="wind-speed" >Wind Speed:  ${weatherData.current.wind_speed}</li>
                          <li id="humidity">Humidity : ${weatherData.current.humidity}</li>
                          <li id="time-zone">Time Zone : GMT ${weatherData.timezone}</li>
                          <li id="pressure">Pressure: ${weatherData.current.pressure}</li>
                          <li id="wind-direction">Wind Direction : ${getWindDirection(weatherData.current.wind_deg)}</li>
                          <li id="uv-index">UV Index : ${weatherData.current.uvi}</li>
                          <li id="feels-like">Feels like: ${weatherData.current.feels_like}</li>
                      </ul>`;
    lowerSection.appendChild(data);
  }

submit.addEventListener("click", () => {
  fetchGeoLocation();
});
