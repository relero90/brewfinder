var welcomeImg = document.querySelector("#welcome-image");
var appBody = document.querySelector("#appBody");

document.addEventListener("click", function () {
  appBody.classList.remove("hide");
  welcomeImg.classList.add("hide");
});
