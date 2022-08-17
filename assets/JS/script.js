/** @format */

// /** @format */

//Sarah is taking lines 1-70
//global variables

var cityInput = document.querySelector("#cityInput");
var apiKey = "823f12c05cfad6b99a96790ab94c7a164c5aa774017edccf89027201473d584f";
var eventBtn = document.querySelector(".seeEvents");

eventBtn.addEventListener("click", localSave);

function localSave() {
  selectedCity = cityInput.value;
  console.log(selectedCity);
  localStorage.setItem("city", selectedCity);
  showEvents();
}

function showEvents() {
  var retrieveCity = localStorage.getItem("city");
  console.log(retrieveCity);
  var requestUrl =
    "https://serpapi.com/search.json?engine=google_events&q=Events+in+" +
    retrieveCity +
    "&api_key=" +
    apiKey;
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
     return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}