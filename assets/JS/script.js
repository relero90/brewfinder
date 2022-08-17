// /** @format */

//Sarah is taking lines 1-70
//global variables
var requestUrl =
  "https://serpapi.com/search.json?engine=google_events&q=Events+in+Austin&api_key=823f12c05cfad6b99a96790ab94c7a164c5aa774017edccf89027201473d584f";
var cityInput = document.querySelector("#city-input");
var selectedCity = "";
var apiKey = "823f12c05cfad6b99a96790ab94c7a164c5aa774017edccf89027201473d584f";
var eventBtn = document.querySelector(".seeEvents");



eventBtn.addEventListener("click", localSave, showEvents);


function localSave() {
  var selectedCity = JSON.stringify(cityInput); 
  console.log(selectedCity);
  localStorage.setItem("city", JSON.stringify(selectedCity));

}


function showEvents() {
 var retrieveCity = localStorage.getItem("city");
 console.log(retrieveCity);
  var url = "https://serpapi.com/search.json?engine=google_events&q=Events+in+" + retrieveCity + "&api_key=" + apiKey;
  console.log(url);
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
 .then(function (data) {
  console.log(data);
 })
}