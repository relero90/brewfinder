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
  }
}

//saving info locally
function localSave() {
  // savedCitySearches tries to populate with localStorage; if null, then value is set to an empty array
  var savedCitySearches =
    JSON.parse(localStorage.getItem("savedCitiesString")) || [];

  selectedCity = cityInput.value;
  cityConcat = selectedCity.replace(/\s/g, "+");
  // console.log(cityConcat);

  cityDisplayText.textContent = selectedCity;
  // Becca added unshift to populate first spot in array
  savedCitySearches.unshift(selectedCity);
  console.log(savedCitySearches);

  var savedCity = document.createElement("button");
  savedCity.textContent = selectedCity;

  savedCity.setAttribute("data-city", selectedCity);
  savedCity.setAttribute("id", "btn-2");

  // prepend adds the button as the first child of savedCitiesDiv
  savedCitiesDiv.prepend(savedCity);
  // removes the 6th button element to limit the number shown
  savedCitiesDiv.children().eq(5).remove();
  // Becca sent array to localStorage
  var storedStringInput = JSON.stringify(savedCitySearches);
  localStorage.setItem("savedCitiesString", storedStringInput);

  localStorage.setItem("city", selectedCity);
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
      eventCard.setAttribute("class", "card");
      eventCard.style.width = "100%";
      eventsSection.append(eventCard);
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

//https://ridb.recreation.gov/api/v1/campsites?limit=50&offset=0&api_key=751f29a1-ede4-455b-81ff-495611b01b48
//link for the government api that im waiting on

// Function to render any old searches in localstorage as buttons at app startup
function renderSearchHistory() {
  var pulledSearch = JSON.parse(localStorage.getItem("savedCitiesString"));
  console.log(pulledSearch);
  if (pulledSearch !== null) {
    // For each item in the pulledCities array,
    for (var i = pulledSearch.length - 1; i > pulledSearch.length - 6; i--) {
      var savedCity = document.createElement("button");
      savedCity.textContent = pulledSearch[i];
      savedCity.setAttribute("data-city", pulledSearch[i]);
      savedCity.setAttribute("data-index", i);
      savedCity.setAttribute("id", "btn-2");
      savedCitiesDiv.append(savedCity);
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
