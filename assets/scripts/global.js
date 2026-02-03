// Run script when document loads
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", getLinks);
} else {
    getLinks();
}
function getLinks() {
    // Make all external links open in a new tab and apply external class
    Array.from(document.links)
    .filter(link => link.hostname != window.location.hostname)
    .forEach(link => link.target = '_blank' && link.classList.add('external'));
}
