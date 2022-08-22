/** @format */

//Sarah is taking lines 1-70
//global variables
var cityInput = document.querySelector("#cityInput");
var cityConcat = ""; // emtpy string to hold concatenation of multi-word city names
var eventBtn = document.querySelector(".seeEvents");
var eventsSection = document.querySelector("#eventsSection");
var eventCard = document.querySelector("#eventCard");
var eventUnorderedList = document.querySelector("#eventUnorderedList");
var selectedCity = "";
var savedCitiesDiv = $("#saved-cities");
var enterBtn = document.querySelector("#cityInput");
var count = 0;
var cityDisplayText = document.querySelector("#cityName");
console.log(cityDisplayText);
var stateInput = document.querySelector("#stateInput");
var stateConcat = "";
var selectedState = "";
var stateDisplayText = document.querySelector("#stateName");
var weatherSection = document.querySelector("#weatherSection");

//Key press Enter starts localSave function
enterBtn.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    localSave();
  }
});

//event listeners

eventBtn.addEventListener("click", localSave, clear);

//clears previous results from showing breweries when button is clicked more than once
function clear() {
  count++;
  console.log(count);
  if (count > 1) {
    eventsSection.innerText = "";
    weatherSection.innerText = "";
  }
}

//saving info locally
function localSave() {
  // savedCitySearches tries to populate with localStorage; if null, then value is set to an empty array
  var savedCitySearches =
    JSON.parse(localStorage.getItem("savedCitiesString")) || [];

  selectedCity = cityInput.value;
  cityConcat = selectedCity.replace(/\s/g, "+");
  selectedState = stateInput.value;
  stateConcat = selectedState.replace(/\s/g, "_");

  stateDisplayText.textContent = ", " + selectedState;
  cityDisplayText.textContent = selectedCity;
  // Becca added unshift to populate first spot in array
  savedCitySearches.unshift(selectedCity);
  console.log(savedCitySearches);

  var savedCity = document.createElement("button");
  savedCity.textContent = selectedCity;
  //  + ", " + selectedState;

  savedCity.setAttribute("data-city", selectedCity);
  savedCity.setAttribute("id", "btn-2");

  // prepend adds the button as the first child of savedCitiesDiv
  savedCitiesDiv.prepend(savedCity);
  // removes the 9th button element to limit the number shown
  savedCitiesDiv.children().eq(8).remove();
  // Becca sent array to localStorage
  var storedStringInput = JSON.stringify(savedCitySearches);
  localStorage.setItem("savedCitiesString", storedStringInput);
  localStorage.setItem("city", selectedCity);
  localStorage.setItem("state", selectedState);
  showEvents();
  clear();
}

function showEvents() {
  // var retrieveCity = localStorage.getItem("city"); // We might not need this variable anymore?
  // console.log(retrieveCity);
  // Switched out retrieveCity variable in the requestURL concatenation for var cityConcat - new global variable that gets its value in localSave() - it replaces spaces in user inputs with "+"
  var requestUrl =
    "https://api.openbrewerydb.org/breweries?by_city=" +
    cityConcat +
    "&by_state=" +
    stateConcat +
    "&per_page=100";
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      eventsSection.display = "inline-block";
      var eventCard = document.createElement("div");
      eventCard.setAttribute("class", "card");
      eventCard.style.width = "100%";
      eventsSection.append(eventCard);
      //if there is an error message when fetching the api url, then an error message will display instead of an empty div
      if (data.length == 0) {
        var errorMsg = document.createElement("div");
        errorMsg.setAttribute("class", "alert alert-danger");
        errorMsg.setAttribute("role", "alert");
        errorMsg.textContent =
          "Please make sure the city/state is spelled correctly!";
        eventsSection.append(errorMsg);
      }
      for (var i = 0; i < 5; i++) {
        var j = Math.floor(Math.random() * data.length);
        //addresses that have "null" won't sho
        //creating dynamic elements to nest info in
        var newUnorderedList = document.createElement("ul");
        var breweryName = document.createElement("div");
        var typeOfBrewery = document.createElement("li");
        var phoneNumber = document.createElement("li");
        var address = document.createElement("li");
        var websiteLink = document.createElement("a");
        //setting bootstrap classes to make format better
        newUnorderedList.setAttribute("class", "list-group list-group-flush");
        breweryName.setAttribute("class", "card-header");
        typeOfBrewery.setAttribute("class", "list-group-item");
        phoneNumber.setAttribute("class", "list-group-item");
        address.setAttribute("class", "list-group-item");
        websiteLink.setAttribute("class", "list-group-item");
        websiteLink.setAttribute("target", "_blank");
        websiteLink.href = data[j].website_url;
        //adding text content to each info div
        breweryName.textContent = data[j].name;
        typeOfBrewery.textContent = "Type of brewery: " + data[j].brewery_type;
        //if there's no phone number listed, it will return none instead of null
        if (data[j].phone == null) {
          phoneNumber.innerText = "Phone: none listed";
        } else {
          phoneNumber.innerText = "Phone: " + data[j].phone;
        }
        //if there's no address, it'll return none listed instead of nothing
        if (data[j].street == null) {
          address.innerText = "Address: none listed";
        } else {
          address.innerText =
            "Address: " +
            data[j].street +
            " " +
            data[j].city +
            ", " +
            data[j].state;
        }
        //if there's no website, it'll display none listed instead of nothing
        if (data[j].website_url == null) {
          websiteLink.innerText = "Website: none listed";
        } else {
          websiteLink.innerText = "Website: " + data[j].website_url;
        }
        //appending
        eventCard.append(breweryName);
        breweryName.append(newUnorderedList);
        newUnorderedList.append(typeOfBrewery);
        newUnorderedList.append(phoneNumber);
        var address = document.createElement("li");
        address.setAttribute("class", "list-group-item");
        address.textContent =
          data[j].street + ", " + data[j].city + ", " + data[j].state;
        newUnorderedList.append(address);
        newUnorderedList.append(websiteLink);
      }
      return;
    });
}

// Function to render any old searches in localstorage as buttons at app startup
function renderSearchHistory() {
  var pulledSearch = JSON.parse(localStorage.getItem("savedCitiesString"));
  console.log(pulledSearch);
  if (pulledSearch !== null) {
    // Up to 8 times, if saved data exists, create and prepend a button
    for (var i = 0; i < 8; i++) {
      if (pulledSearch[i] !== undefined) {
        var savedCity = document.createElement("button");
        savedCity.textContent = pulledSearch[i];
        savedCity.setAttribute("data-city", pulledSearch[i]);
        savedCity.setAttribute("data-index", i);
        savedCity.setAttribute("id", "btn-2");
        savedCitiesDiv.append(savedCity);
      }
    }
  }
}
renderSearchHistory();

var savedCityBtns = document.querySelectorAll("#btn-2");
for (var i = 0; i < savedCityBtns.length; i++) {
  savedCityBtns[i].addEventListener("click", function () {
    // grabs data-city attribute of clicked button (a text string)
    var retrieveCity = $(this).attr("data-city");
    // replaces spaces in retrieveCity with "+" and stores in global var cityConcat
    cityConcat = retrieveCity.replace(/\s/g, "+");

    cityDisplayText.textContent = retrieveCity;

    // clears any prior brewery results from the display
    clear();
    // passes value of cityConcat to showEvents()
    showEvents(cityConcat);
  });
}
function init() {
  //pulling stored dates from local satorage
  var inputDate = JSON.parse(localStorage.getItem("storedDates"));
  // if stored dates are pulled from local storage update
  if (inputDate !== null) {
    todos = storedDates;
  }
}
