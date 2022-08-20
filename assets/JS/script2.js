var states = {
  AL: "ALABAMA",
  AK: "ALASKA",
  AS: "AMERICAN SAMOA",
  AZ: "ARIZONA",
  AR: "ARKANSAS",
  CA: "CALIFORNIA",
  CO: "COLORADO",
  CT: "CONNECTICUT",
  DE: "DELAWARE",
  DC: "DISTRICT OF COLUMBIA",
  FM: "FEDERATED STATES OF MICRONESIA",
  FL: "FLORIDA",
  GA: "GEORGIA",
  GU: "GUAM GU",
  HI: "HAWAII",
  ID: "IDAHO",
  IL: "ILLINOIS",
  IN: "INDIANA",
  IA: "IOWA",
  KS: "KANSAS",
  KY: "KENTUCKY",
  LA: "LOUISIANA",
  ME: "MAINE",
  MH: "MARSHALL ISLANDS",
  MD: "MARYLAND",
  MA: "MASSACHUSETTS",
  MI: "MICHIGAN",
  MN: "MINNESOTA",
  MS: "MISSISSIPPI",
  MO: "MISSOURI",
  MT: "MONTANA",
  NE: "NEBRASKA",
  NV: "NEVADA",
  NH: "NEW HAMPSHIRE",
  NJ: "NEW JERSEY",
  NM: "NEW MEXICO",
  NY: "NEW YORK",
  NC: "NORTH CAROLINA",
  ND: "NORTH DAKOTA",
  MP: "NORTHERN MARIANA ISLANDS",
  OH: "OHIO",
  OK: "OKLAHOMA",
  OR: "OREGON",
  PW: "PALAU",
  PA: "PENNSYLVANIA",
  PR: "PUERTO RICO",
  RI: "RHODE ISLAND",
  SC: "SOUTH CAROLINA",
  SD: "SOUTH DAKOTA",
  TN: "TENNESSEE",
  TX: "TEXAS",
  UT: "UTAH",
  VT: "VERMONT",
  VI: "VIRGIN ISLANDS",
  VA: "VIRGINIA",
  WA: "WASHINGTON",
  WV: "WEST VIRGINIA",
  WI: "WISCONSIN",
  WY: "WYOMING",
};
var weatherSection = document.querySelector("#weatherSection");
//object to show weather
var weather = {
  APIkey: "501721a232530766e41f1ad70cfed92b",
  //Call weather based on city defined
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + weather.APIkey)
      .then((response) => response.json())
      .then((data) => weather.displayWeather(data));
  },
  // Call var from Object to display in console
  displayWeather: function (data) {
    for (var i = 0; i <= 35; i += 8) {
      var dataList = data.list[i];
      var newWeatherCard = document.createElement("div");
      newWeatherCard.setAttribute("class", "card");
      // newWeatherCard.style.width = "100%";
      weatherSection.append(newWeatherCard);

      var weatherCardBody = document.createElement("div");
      weatherCardBody.setAttribute("class", "card-body");
      newWeatherCard.append(weatherCardBody);

      //Create p tags to display weather conditions
      var newCardIcon = document.createElement("img");
      newCardIcon.setAttribute("class", "card-img-top");
      weatherCardBody.append(newCardIcon);

      var newDescription = document.createElement("p");
      newDescription.setAttribute("class", "description");
      weatherCardBody.append(newDescription);

      var newDateText = document.createElement("p");
      newDateText.setAttribute("class", "dateText");
      weatherCardBody.append(newDateText);

      var newTemp = document.createElement("p");
      newTemp.setAttribute("class", "temperature");
      weatherCardBody.append(newTemp);

      var newFeelsLike = document.createElement("p");
      newFeelsLike.setAttribute("class", "feels-like");
      weatherCardBody.append(newFeelsLike);

      var newHumidity = document.createElement("p");
      newHumidity.setAttribute("class", "humidity");
      weatherCardBody.append(newHumidity);

      var newWindSpeed = document.createElement("p");
      newWindSpeed.setAttribute("class", "wind-speed");
      weatherCardBody.append(newWindSpeed);

      // document.body.children["appBody"].children["weatherSection"].createElement("div");
      //Weather conditions
      var { icon, description } = dataList.weather[0];
      var { dt_txt } = dataList;
      var { temp, humidity } = dataList.main;
      var { speed } = dataList.wind;
      var { feels_like } = dataList.main;
      // console.log(name, icon, description, temp, humidity, speed);

      //Display Weather data in the weather card
      // document.querySelector(".card-img-top").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      newCardIcon.setAttribute("src", "http://openweathermap.org/img/wn/" + icon + "@2x.png");
      // document.querySelector(".description").innerText = description;
      newDescription.innerText = description;
      // document.querySelector(".dateText").innerText = dt_txt;
      newDateText.innerText = dt_txt;
      // document.querySelector(".temperature").innerText = "Temperature : " + temp + "°F";
      newTemp.innerText = "Temperature : " + temp + "°F";
      // document.querySelector(".feels-like").innerText = "Feels Like : " + feels_like + "°F";
      newFeelsLike.innerText = "Feels Like : " + feels_like + "°F";
      // document.querySelector(".humidity").innerText = "Humidity : " + humidity + "%";
      newHumidity.innerText = "Humidity : " + humidity + "%";
      // document.querySelector(".wind-speed").innerText = "Wind Speed : " + speed + "mph";
      newWindSpeed.innerText = "Wind Speed : " + speed + "mph";
    }
  },
  search: function () {
    weather.fetchWeather(document.querySelector("#cityInput").value);
  },
};
//search button from users input
document.querySelector(".container button").addEventListener("click", function () {
  weather.search();
});
//Return keypress starts search function
document.querySelector("#cityInput").addEventListener("keydown", function (event) {
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
    console.log(date);
  }
});
