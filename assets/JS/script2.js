//object to show weather
var weather = {
  APIkey: "501721a232530766e41f1ad70cfed92b",
  //Call weather based on city defined
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        weather.APIkey
    )
      .then((response) => response.json())
      .then((data) => weather.displayWeather(data));
  },
  // Call var from Object to display in console
  displayWeather: function (data) {
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    var { feels_like } = data.main;
    // console.log(name, icon, description, temp, humidity, speed);

    //Display Weather data in the weather card
    document.querySelector(".card-img-top").src =
      "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".tempature").innerText =
      "Temperature : " + temp + "°F";
    document.querySelector(".feels-like").innerText =
      "Feels Like : " + feels_like + "°F";
    document.querySelector(".humidity").innerText =
      "Humidity : " + humidity + "%";
    document.querySelector(".wind-speed").innerText =
      "Wind Speed : " + speed + "mph";
  },
  search: function () {
    weather.fetchWeather(document.querySelector("#cityInput").value);
  },
};
//search button from users input
document
  .querySelector(".container button")
  .addEventListener("click", function () {
    weather.search();
  });
//Return keypress starts search function
document
  .querySelector("#cityInput")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      weather.search();
    }
  });

//date picker
$(function () {
  $("#datepicker").datepicker();
});

//date range
$(function () {
  var dateFormat = "mm/dd/yy",
    from = $("#from")
      .datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 2,
      })
      .on("change", function () {
        to.datepicker("option", "minDate", getDate(this));
      }),
    to = $("#to")
      .datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 2,
      })
      .on("change", function () {
        from.datepicker("option", "maxDate", getDate(this));
      });

  function getDate(element) {
    var date;
    try {
      date = $.datepicker.parseDate(dateFormat, element.value);
    } catch (error) {
      date = null;
    }
    return date;
  }
});
