/** @format */

//Sarah is taking lines 1-70
//global variables
var cityInput = document.querySelector("#cityInput");
var eventBtn = document.querySelector(".seeEvents");
var eventsSection = document.querySelector("#eventsSection");
var eventCard = document.querySelector("#eventCard");
var eventUnorderedList = document.querySelector("#eventUnorderedList");
// Becca added empty array to hold search history & div to append buttons
var savedCitySearches = [];
var savedCitiesDiv = $("#saved-cities");

var enterBtn = document.querySelector("#cityInput");

//Key press Enter starts localSave function
enterBtn.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    localSave();
  }
});

//event listeners
eventBtn.addEventListener("click", localSave);

//saving info locally
function localSave() {
  selectedCity = cityInput.value;
  console.log(selectedCity);
  // Becca added push to populate empty array
  savedCitySearches.push(selectedCity);
  console.log(savedCitySearches);
  // Becca sent array to localStorage
  var storedStringInput = JSON.stringify(savedCitySearches);
  localStorage.setItem("savedCitiesString", storedStringInput);

  localStorage.setItem("city", selectedCity);
  showEvents();
}

function showEvents() {
  var retrieveCity = localStorage.getItem("city");
  console.log(retrieveCity);
  var requestUrl =
    "https://api.openbrewerydb.org/breweries?by_city=" +
    retrieveCity +
    "&per_page=100";

  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < 5; i++) {
        var j = Math.floor(Math.random() * data.length);
        var breweryName = document.createElement("div");
        breweryName.setAttribute("class", "card-header");
        breweryName.textContent = data[j].name;
        eventCard.append(breweryName);
        var typeOfBrewery = document.createElement("li");
        var newUnorderedList = document.createElement("ul");
        newUnorderedList.setAttribute("class", "list-group list-group-flush");
        breweryName.append(newUnorderedList);
        typeOfBrewery.setAttribute("class", "list-group-item");
        typeOfBrewery.textContent = data[j].brewery_type;
        newUnorderedList.append(typeOfBrewery);
        var phoneNumber = document.createElement("li");
        phoneNumber.setAttribute("class", "list-group-item");
        phoneNumber.textContent = data[j].phone;
        newUnorderedList.append(phoneNumber);
        var address = document.createElement("li");
        address.setAttribute("class", "list-group-item");
        address.textContent = data[j].street + data[j].city + data[j].state;
        newUnorderedList.append(address);
        var websiteLink = document.createElement("li");
        websiteLink.setAttribute("class", "list-group-item");
        websiteLink.textContent = data[j].website_url;
        newUnorderedList.append(websiteLink);
      }
      return;
    });
}

//https://ridb.recreation.gov/api/v1/campsites?limit=50&offset=0&api_key=751f29a1-ede4-455b-81ff-495611b01b48
//link for the government api that im waiting on

// Function to render any old searches in localstorage as buttons at app startup
function renderSearchHistory() {
  var pulledSearch = JSON.parse(localStorage.getItem("savedCitiesString"));
  console.log(pulledSearch);
  if (pulledSearch !== null) {
    // For each item in the pulledCities array,
    for (var i = 0; i < pulledSearch.length; i++) {
      var savedCity = document.createElement("button");
      savedCity.textContent = pulledSearch[i];
      savedCity.classList.add(pulledSearch[i]);
      savedCity.setAttribute("data-index", i);
      savedCity.setAttribute("id", "btn-2");
      savedCitiesDiv.append(savedCity);
    }
  }
}
renderSearchHistory();

var savedCityBtns = document.querySelectorAll("#btn-2");

for (var i = 0; i < savedCityBtns.length; i++) {
  savedCityBtns[i].addEventListener("click", function (event) {
    var clickedBtn = event.target;
    var retrieveCity = clickedBtn.classList.value;

    var requestUrl =
      "https://api.openbrewerydb.org/breweries?by_city=" +
      retrieveCity +
      "&per_page=100";

    fetch(requestUrl)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        for (var i = 0; i < 5; i++) {
          var j = Math.floor(Math.random() * data.length);
          var breweryName = document.createElement("div");
          breweryName.setAttribute("class", "card-header");
          breweryName.textContent = data[j].name;
          eventCard.append(breweryName);
          var typeOfBrewery = document.createElement("li");
          var newUnorderedList = document.createElement("ul");
          newUnorderedList.setAttribute("class", "list-group list-group-flush");
          breweryName.append(newUnorderedList);
          typeOfBrewery.setAttribute("class", "list-group-item");
          typeOfBrewery.textContent = data[j].brewery_type;
          newUnorderedList.append(typeOfBrewery);
          var phoneNumber = document.createElement("li");
          phoneNumber.setAttribute("class", "list-group-item");
          phoneNumber.textContent = data[j].phone;
          newUnorderedList.append(phoneNumber);
          var address = document.createElement("li");
          address.setAttribute("class", "list-group-item");
          address.textContent = data[j].street + data[j].city + data[j].state;
          newUnorderedList.append(address);
          var websiteLink = document.createElement("li");
          websiteLink.setAttribute("class", "list-group-item");
          websiteLink.textContent = data[j].website_url;
          newUnorderedList.append(websiteLink);
        }
        return;
      });
  });
}
