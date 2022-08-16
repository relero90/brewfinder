/** @format */

//Sarah is taking lines 1-70
//global variables
var requestUrl =
  "https://serpapi.com/search.json?engine=google_events&q=Events+in+Austin&api_key=823f12c05cfad6b99a96790ab94c7a164c5aa774017edccf89027201473d584f";
var cityInput = document.querySelector("#city-input");

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
 