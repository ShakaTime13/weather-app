let now = new Date();

function currentTime(event) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let date = event.getDate();
  let day = days[event.getDay()];
  let hour = event.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = event.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let current = `${day}  ${date} ${hour}:${minute}`;
  return current;
}
let h2 = document.querySelector("h2");
h2.innerHTML = currentTime(now);

function weather(response) {
  // console.log(response.data);
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${Math.round(response.data.main.temp)}°F`;
}

function search(event) {
  event.preventDefault();
  let key = "b225369a8758e13a1aef61ce4e1a6043";
  let searchInput = document.querySelector("#search-bar");
  let h1 = document.querySelector("h1");
  let city = searchInput.value;
  h1.innerHTML = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;

  axios.get(apiUrl).then(weather);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

function currentLocation(event) {
  let latitude = event.coords.latitude;
  let longitude = event.coords.longitude;
  let apiKey = `bf14d6c56856845e46caa5161a336f68`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  console.log(response);

  let temperature = Math.round(response.data.main.temp);
  let name = response.data.name;

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${name}`;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${Math.round(response.data.main.temp)}°F`;

  navigator.geolocation.getCurrentPosition(currentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);
