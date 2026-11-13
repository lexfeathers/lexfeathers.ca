// Theme Selector button handler
// with help from Sage Fennel (https://wavebeem.com)

// Get current theme
if (localStorage.getItem("theme") == null) {
	localStorage.setItem("theme", "system");
	document.documentElement.dataset.theme = "system";
}

const lightFirst = ["light", "dark", "system"];
const darkFirst = ["dark", "light", "system"];

let index = 0;
let chosenArray;

if (localStorage.getItem("theme") == "light") {
	chosenArray = lightFirst;
} else if (localStorage.getItem("theme") == "dark") {
	chosenArray = darkFirst;
} else {
	if (globalThis.matchMedia("(prefers-color-scheme: light)").matches) {
		chosenArray = darkFirst;
	} else {
		chosenArray = lightFirst;
	}
	index = 2;
}

// Set data-theme based on last set theme
document.documentElement.dataset.theme = chosenArray[index];

// Change the theme
function changeTheme() {
	index = (index + 1) % 3;
	theme = chosenArray[index];

	localStorage.setItem("theme", theme);
	document.documentElement.dataset.theme = theme;
}

// Set the theme when the theme selector button's [aria-pressed] changes
for (const button of document.querySelectorAll(".theme-selector-button")) {
	button.addEventListener("click", (event) => {
		const pressedState =
			event.currentTarget.getAttribute("aria-pressed") === "true";
		event.currentTarget.setAttribute("aria-pressed", String(!pressedState));
		changeTheme();
	});
}
