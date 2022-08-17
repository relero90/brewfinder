//object to show weather
var weather = {
  APIkey: "501721a232530766e41f1ad70cfed92b",
  //Call weather based on city defined
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + weather.APIkey)
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  // Call var from Object to display in console
  displayWeather: function (data) {
    var { name } = data;
    var { icon, description } = data.weather;
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
  },
};
