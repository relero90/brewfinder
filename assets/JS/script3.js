var welcomeImg = document.querySelector("#welcome-image");
var appBody = document.querySelector("#appBody");

document.addEventListener("click", function () {
  appBody.classList.remove("hide");
  welcomeImg.classList.add("hide");
});

// add an event listener to display the search history buttons in a mobile view
var showHistoryEl = document.getElementById("showHistory");
var savedCitiesEl = document.getElementById("saved-cities");

showHistoryEl.addEventListener('click', function(){
savedCitiesEl.setAttribute('style', 'display: block;');
})