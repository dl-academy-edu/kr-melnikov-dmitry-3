var buttonOpenMenu = document.querySelector(".button-open-menu_js"),
buttonCloseMenu = document.querySelector(".button-close-menu_js"),
html = document.querySelector("html");

buttonOpenMenu.addEventListener("click", function () {
html.classList.add("open-mobile-menu");
});

buttonCloseMenu.addEventListener("click", function () {
html.classList.remove("open-mobile-menu");
});