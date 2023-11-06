const html = document.documentElement.classList;
const btnSun = document.getElementById("sun-btn");
const btnMoon = document.getElementById("moon-btn");
const equalSvg = document.getElementById("equal-svg");

btnMoon.addEventListener("click", () => {
	if (html.contains("light")) {
		html.remove("light");
		equalSvg.querySelector("rect:first-child").setAttribute("fill", "white");
		equalSvg.querySelector("rect:last-child").setAttribute("fill", "white");
	}
});

btnSun.addEventListener("click", () => {
	if (!html.contains("light")) {
		html.add("light");
		equalSvg.querySelector("rect:first-child").setAttribute("fill", "#3D3D3D");
		equalSvg.querySelector("rect:last-child").setAttribute("fill", "#3D3D3D");
	}
});
