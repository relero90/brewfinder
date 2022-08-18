/** @format */

//Sarah is taking lines 1-70
//global variables
var cityInput = document.querySelector("#cityInput");
var eventBtn = document.querySelector(".seeEvents");
var eventsSection = document.querySelector("#eventsSection");
var eventCard = document.querySelector("#eventCard");
var eventUnorderedList = document.querySelector("#eventUnorderedList");
var enterBtn = document.querySelector("#cityInput");
var count = 0;

//Key press Enter starts localSave function
enterBtn.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    localSave();
  }
});

//event listeners

eventBtn.addEventListener("click", localSave, clear);
  

  function clear() {
  count ++;
  console.log(count);
  if (count > 1) {
    eventsSection.innerText = "";
  }}

//saving info locally
function localSave() {
  selectedCity = cityInput.value;
  console.log(selectedCity);
  localStorage.setItem("city", selectedCity);
  showEvents();
  clear();
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
      eventsSection.display = "inline-block";
      var eventCard = document.createElement("div");
      eventCard.setAttribute("class", "card")
      eventCard.style.width = "100%";
      eventsSection.append(eventCard);
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
        address.textContent = data[j].street + ", " + data[j].city + ", " + data[j].state;
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

// Still in progress - need to rework local storage to be an array so it doesn't overwrite itself
var savedCitiesDiv = $("#saved-cities");
function renderSearchHistory() {
  var pulledSearch = JSON.parse(localStorage.getItem("city"));
  if (pulledSearch !== null) {
    // For each item in the pulledCities array,
    for (var i = 0; i < pulledCities.length; i++) {
      var savedCity = document.createElement("button");
      savedCity.textContent = pulledSearch[i];
      savedCity.classList.add(pulledSearch[i]);
      savedCity.setAttribute("data-index", i);
      savedCitiesDiv.append(savedCity);
    }
  }
}
// renderSearchHistory();
