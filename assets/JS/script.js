/** @format */

// /** @format */

//Sarah is taking lines 1-70
//global variables

var cityInput = document.querySelector("#cityInput");
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
    "https://api.openbrewerydb.org/breweries?by_city=" +
    retrieveCity + "&per_page=5";
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