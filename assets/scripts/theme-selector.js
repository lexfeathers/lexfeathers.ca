// Theme Selector button handler
// with help from Sage Fennel (https://wavebeem.com)

// Get current theme
let theme = localStorage.getItem("theme") || (globalThis.matchMedia("(prefers-color-scheme: dark)").matches
	? "dark"
	: "light");
document.documentElement.dataset.theme = theme;

// Change the theme
function changeTheme() {
	theme = theme === "dark" ? "light" : "dark";
	localStorage.setItem("theme", theme);
	document.documentElement.dataset.theme = theme;
}

// Set the theme when the theme selector button's [aria-pressed] changes
for (const button of document.querySelectorAll(".theme-selector-button",)) {
	button.addEventListener("click", (event) => {
		const pressedState =
			event.currentTarget.getAttribute("aria-pressed") === "true";
			event.currentTarget.setAttribute("aria-pressed", String(!pressedState));
			changeTheme();
	});
};